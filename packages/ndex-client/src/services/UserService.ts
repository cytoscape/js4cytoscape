import { HTTPService } from './HTTPService';
import { 
  NDExUser,
  PaginationParams,
  NetworkSummaryV2
} from '../types';
import { AuthType } from '../constants';

/**
 * UserService - NDEx user-related operations
 * Handles authentication, user management, and user workspace operations
 */
export class UserService {
  constructor(private http: HTTPService) {}

  // ============================================================================
  // Authentication Methods
  // ============================================================================

  /**
   * Get authenticated user (equivalent to getSignedInUser from legacy client)
   * Returns the current signed-in user object from NDEx server
   * 
   * For basic authentication: Gets the current user using the /user endpoint
   * For OAuth authentication: Uses the /users/signin endpoint with ID token
   * 
   * @returns The authenticated user object
   * @note When authenticating with OAuth ID token, if a user with matching email 
   *       doesn't exist on the server, this function will automatically create 
   *       that user and return the newly created user object.
   */
  async authenticate(): Promise<NDExUser> {
    const authType = this.http.getAuthType();
    if (!authType) {
      throw new Error('Authentication parameters are missing in NDEx client.');
    }
    
    if (authType === AuthType.BASIC) {
      // For basic auth, use the standard user endpoint with valid parameter
      const endpoint = 'user';
      const params = { valid: true };
      return this.http.get<NDExUser>(endpoint, { params });
    } else if (authType === AuthType.OAUTH) {
      // For OAuth, use the signin endpoint with ID token (v3 API)
      const idToken = this.http.getIdToken();
      if (!idToken) {
        throw new Error('OAuth ID token is missing.');
      }
      
      const endpoint = 'users/signin';
      const data = { idToken };
      return this.http.post<NDExUser>(endpoint, data, { version: 'v3' });
    }
    
    throw new Error(`Unsupported authentication type: ${authType}`);
  }

  /**
   * Get current user profile (equivalent to getSignedInUser from legacy client)
   * Returns the current signed-in user object from NDEx server
   * 
   * Uses the /user endpoint with {valid: true} parameter for both basic and OAuth authentication.
   * Unlike authenticate(), this function will NOT automatically create a user account for OAuth.
   * If the OAuth ID token doesn't match an existing user, it will return an unauthorized error.
   * 
   * @returns The current user object
   * @note This function requires existing authentication and will not create new users
   */
  async getCurrentUser(): Promise<NDExUser> {
    const authType = this.http.getAuthType();
    if (!authType) {
      throw new Error('Authentication parameters are missing in NDEx client.');
    }
    
    const endpoint = 'user';
    const params = { valid: true };
    return this.http.get<NDExUser>(endpoint, { params });
  }

  /**
   * Update current user profile
   * Uses the UUID from the userUpdate object and server validates against authenticated user
   */
  async updateCurrentUser(userUpdate: Partial<NDExUser>): Promise<void> {
    if (!userUpdate.externalId) {
      throw new Error('User uuid is required in userUpdate object');
    }

    const endpoint = `user/${userUpdate.externalId}`;
    return this.http.put<void>(endpoint, userUpdate);
  }


  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    const endpoint = 'user/forgot-password';
    return this.http.post<void>(endpoint, { email });
  }

  /**
   * Reset password with user UUID (server validates UUID matches authenticated user)
   * @param userUUID - User UUID (must match authenticated user)
   * @param newPassword - New password as plain text
   */
  async resetPassword(userUUID: string, newPassword: string): Promise<void> {
    const endpoint = `user/${userUUID}/password`;
    const config: any = {
      headers: {
        'Content-Type': 'text/plain'  // Send password as plain text
      }
    };
    
    return this.http.put<void>(endpoint, newPassword, config);
  }

  // ============================================================================
  // User Management Methods
  // ============================================================================

  /**
   * Get user by UUID
   */
  async getUser(userUUID: string): Promise<NDExUser> {
    const endpoint = `user/${userUUID}`;
    return this.http.get<NDExUser>(endpoint);
  }

  /**
   * Get user by account name or email (matches server getUserByAccountNameOrAuthenticatUser)
   * @param searchBy - Search criteria - either by username OR by email, but not both
   * @returns User object matching the search criteria
   * @note If both username and email are provided, only username will be used
   */
  async getUserByNameOrEmail(searchBy: 
    | { username: string }
    | { email: string }
  ): Promise<NDExUser> {
    const params = new URLSearchParams();
    
    if ('username' in searchBy) {
      params.append('username', searchBy.username);
    } else if ('email' in searchBy) {
      params.append('email', searchBy.email);
    }

    const endpoint = `user?${params.toString()}`;
    return this.http.get<NDExUser>(endpoint);
  }

  /**
   * Get multiple users by their UUIDs (batch operation)
   * @param uuidList - Array of user UUIDs to fetch
   * @returns Array of user objects corresponding to the provided UUIDs
   */
  async getUsersByUUIDs(uuidList: string[]): Promise<NDExUser[]> {
    const endpoint = 'batch/user';
    return this.http.post<NDExUser[]>(endpoint, uuidList);
  }

  /**
   * Search users (equivalent to searchUsers from legacy client)
   * @param searchTerms - Search string to find users
   * @param start - Starting offset for pagination (optional)
   * @param size - Maximum number of results to return (optional)
   * @returns Array of users matching the search criteria
   */
  async searchUsers(
    searchTerms: string, 
    start?: number, 
    size?: number
  ): Promise<NDExUser[]> {
    const params: Record<string, string> = {};
    
    if (start !== undefined) {
      params.start = start.toString();
    }
    if (size !== undefined) {
      params.limit = size.toString();
    }

    const data = { searchString: searchTerms };
    const endpoint = 'search/user';
    
    return this.http.post<NDExUser[]>(endpoint, data, { params });
  }


  // ============================================================================
  // User Network Methods
  // ============================================================================

  /**
   * Get networks for a user's account page (equivalent to getAccountPageNetworks from legacy client)
   * 
   * @param userUUID - User UUID to get networks for
   * @param offset - Starting offset for pagination (optional)
   * @param limit - Maximum number of networks to return (optional)
   * @returns Array of V2 network summaries for the specified user
   * @note This function requires authentication. The auth attribute must be set in the client configuration.
   */
  async getAccountPageNetworks(
    userUUID: string,
    offset?: number, 
    limit?: number
  ): Promise<NetworkSummaryV2[]> {
    // Build parameters for the network summary request
    const params: Record<string, string> = {};
    if (offset !== undefined) {
      params.offset = offset.toString();
    }
    if (limit !== undefined) {
      params.limit = limit.toString();
    }

    // Get network summaries for the user
    const endpoint = `user/${userUUID}/networksummary`;
    return this.http.get<NetworkSummaryV2[]>(endpoint, { params });
  }



  /**
   * Delete user account (server validates userid matches authenticated user)
   * @param userUUID - User UUID to delete (must match authenticated user)
   * @note This function requires authentication. The auth attribute must be set in the client configuration.
   * @note The userUUID parameter must be the UUID of the currently authenticated user. The server will validate this.
   */
  async deleteUserAccount(userUUID: string): Promise<void> {
    const endpoint = `user/${userUUID}`;
    return this.http.delete<void>(endpoint);
  }
}
