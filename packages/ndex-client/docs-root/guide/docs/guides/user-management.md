# User Management

Manage user accounts, authentication, and user-related operations.

## User Authentication

### Authenticate and Get Current User

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: 'basic',
    username: 'your-username',
    password: 'your-password'
  }
});

// Authenticate and get user info
const user = await client.user.authenticate();
console.log('Authenticated as:', user.userName);
console.log('User ID:', user.externalId);
```

### Get User Profile

```typescript
// Get current user profile
const currentUser = await client.user.getCurrentUser();
console.log('Profile:', {
  name: `${currentUser.firstName} ${currentUser.lastName}`,
  email: currentUser.emailAddress,
  verified: currentUser.isVerified,
  diskUsage: `${currentUser.diskUsed} / ${currentUser.diskQuota} bytes`
});
```

## User Search and Lookup

### Search Users

```typescript
// Search users by name or email
const searchResults = await client.user.searchUsers(
  { searchString: 'john smith' },
  0,    // start index
  10    // limit
);

searchResults.forEach(user => {
  console.log(`${user.firstName} ${user.lastName} (${user.userName})`);
});
```

### Get User by UUID

```typescript
const userUUID = 'user-uuid-here';
const user = await client.user.getUser(userUUID);
console.log('User details:', user);
```

### Batch User Lookup

```typescript
const userUUIDs = ['uuid1', 'uuid2', 'uuid3'];
const users = await client.user.getUsersByUUIDs(userUUIDs);

users.forEach(user => {
  console.log(`${user.userName}: ${user.emailAddress}`);
});
```

## User Networks

### Get User's Networks

```typescript
// Get networks for the authenticated user
const userNetworks = await client.user.getAccountPageNetworks(
  undefined, // userUUID (undefined = current user)
  0,         // offset
  25         // limit
);

console.log(`Found ${userNetworks.length} networks:`);
userNetworks.forEach(network => {
  console.log(`- ${network.name} (${network.nodeCount} nodes)`);
});
```

### Get Networks by User UUID

```typescript
const userUUID = 'target-user-uuid';
const userNetworks = await client.user.getAccountPageNetworks(
  userUUID,
  0,    // offset
  50    // limit
);
```

### Get User's Home Content

```typescript
// Get complete home folder content including networks, folders, and shortcuts
const userUUID = 'user-uuid-here';
const homeContent = await client.user.getUserHomeContent(userUUID);

console.log('Home content summary:');
console.log(`- Networks: ${homeContent.networks.length}`);
console.log(`- Folders: ${homeContent.folders.length}`);
console.log(`- Shortcuts: ${homeContent.shortcuts.length}`);

// Access individual components
homeContent.networks.forEach(network => {
  console.log(`Network: ${network.name} (${network.nodeCount} nodes)`);
});

homeContent.folders.forEach(folder => {
  console.log(`Folder: ${folder.name}`);
});

homeContent.shortcuts.forEach(shortcut => {
  console.log(`Shortcut: ${shortcut.name} -> ${shortcut.targetNetworkUUID}`);
});
```

### Get Home Content with Format Parameter

```typescript
// Get home content with specific format
const homeContent = await client.user.getUserHomeContent(
  userUUID,
  'minimal'  // Custom format parameter
);

// Default format is 'update' if not specified
const defaultHomeContent = await client.user.getUserHomeContent(userUUID);
```

## User Profile Management

### Update User Profile

```typescript
// Update current user profile
const userUpdate = {
  externalId: currentUser.externalId, // Required
  firstName: 'Updated First Name',
  lastName: 'Updated Last Name',
  emailAddress: 'new-email@example.com'
};

await client.user.updateCurrentUser(userUpdate);
console.log('✅ Profile updated successfully');
```

## Password Management

### Request Password Reset

```typescript
// Send password reset email
await client.user.requestPasswordReset('user@example.com');
console.log('✅ Password reset email sent');
```

### Reset Password

```typescript
// Reset password (requires user UUID from reset flow)
const userUUID = 'user-uuid-from-reset-process';
const newPassword = 'new-secure-password';

await client.user.resetPassword(userUUID, newPassword);
console.log('✅ Password reset successfully');
```

## Account Management

### Delete User Account

:::warning Destructive Operation
Account deletion is permanent and cannot be undone. This will delete all user data including networks, groups, and settings.
:::

```typescript
const userUUID = 'user-to-delete';

try {
  await client.user.deleteUserAccount(userUUID);
  console.log('✅ Account deleted successfully');
} catch (error) {
  console.error('❌ Account deletion failed:', error.message);
}
```

## User Lookup Utilities

### Find User by Name or Email

```typescript
// Search for specific user
async function findUser(nameOrEmail: string) {
  try {
    // Try direct lookup by username
    const userByName = await client.user.getUserByNameOrEmail({
      searchBy: 'username',
      searchString: nameOrEmail
    });
    return userByName;
  } catch (error) {
    try {
      // Try lookup by email
      const userByEmail = await client.user.getUserByNameOrEmail({
        searchBy: 'email', 
        searchString: nameOrEmail
      });
      return userByEmail;
    } catch (emailError) {
      console.log('User not found');
      return null;
    }
  }
}

const user = await findUser('john.doe@example.com');
if (user) {
  console.log('Found user:', user.userName);
}
```

## Error Handling

### Common User Operation Errors

```typescript
async function safeUserOperation() {
  try {
    const user = await client.user.getCurrentUser();
    return user;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('❌ Authentication failed - check credentials');
      // Redirect to login
    } else if (error.response?.status === 403) {
      console.error('❌ Access forbidden - insufficient permissions');
    } else if (error.response?.status === 404) {
      console.error('❌ User not found');
    } else {
      console.error('❌ Unexpected error:', error.message);
    }
    throw error;
  }
}
```

### Validation Errors

```typescript
async function updateUserWithValidation(userUpdate: any) {
  try {
    await client.user.updateCurrentUser(userUpdate);
    return true;
  } catch (error) {
    if (error.response?.status === 400) {
      console.error('❌ Validation failed:', error.response.data);
      // Handle specific validation errors
      if (error.response.data.message?.includes('email')) {
        console.error('Invalid email format');
      } else if (error.response.data.message?.includes('externalId')) {
        console.error('Missing or invalid user ID');
      }
    }
    return false;
  }
}
```

## Complete User Management Example

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

class UserManager {
  private client: NDExClient;

  constructor(baseURL: string, username: string, password: string) {
    this.client = new NDExClient({
      baseURL,
      auth: { type: 'basic', username, password }
    });
  }

  async initialize() {
    try {
      const user = await this.client.user.authenticate();
      console.log('✅ Authenticated as:', user.userName);
      return user;
    } catch (error) {
      console.error('❌ Authentication failed');
      throw error;
    }
  }

  async getUserProfile() {
    const user = await this.client.user.getCurrentUser();
    return {
      id: user.externalId,
      name: `${user.firstName} ${user.lastName}`,
      username: user.userName,
      email: user.emailAddress,
      verified: user.isVerified,
      created: new Date(user.creationTime),
      storage: {
        used: user.diskUsed,
        quota: user.diskQuota,
        percentage: Math.round((user.diskUsed / user.diskQuota) * 100)
      }
    };
  }

  async getUserNetworks(limit = 25) {
    const networks = await this.client.user.getAccountPageNetworks(
      undefined, 0, limit
    );
    
    return networks.map(network => ({
      id: network.externalId,
      name: network.name,
      nodes: network.nodeCount,
      edges: network.edgeCount,
      modified: new Date(network.modificationTime)
    }));
  }

  async searchUsers(query: string) {
    const results = await this.client.user.searchUsers(
      { searchString: query },
      0, 20
    );
    
    return results.map(user => ({
      id: user.externalId,
      name: `${user.firstName} ${user.lastName}`,
      username: user.userName,
      verified: user.isVerified
    }));
  }
}

// Usage
const userManager = new UserManager(
  'https://www.ndexbio.org',
  process.env.NDEX_USERNAME!,
  process.env.NDEX_PASSWORD!
);

await userManager.initialize();
const profile = await userManager.getUserProfile();
const networks = await userManager.getUserNetworks();

console.log('User Profile:', profile);
console.log('User Networks:', networks.length);
```

## Next Steps

- **[Working with Networks →](/docs/guides/working-with-networks)** - Network operations
- **[File Operations →](/docs/guides/file-operations)** - Manage files and permissions
- **[Advanced Patterns →](/docs/examples/advanced-patterns)** - Complex user workflows