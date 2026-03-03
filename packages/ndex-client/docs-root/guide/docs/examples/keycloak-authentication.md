# Keycloak OAuth Authentication Example

This example demonstrates how to authenticate users with NDEx using Keycloak OAuth, discover user's networks dynamically, and access detailed network information.

## Overview

NDEx uses Keycloak server for user authentication. This example demonstrates the **recommended OAuth approach for web applications**.

### Authentication Method Guidelines

- **🌐 OAuth (Web Applications)** - **Recommended** for browser-based applications. Provides secure, user-friendly sign-in through Keycloak interface with proper token management.

- **🔧 Basic Auth (Scripts & Automation)** - Use for server-side scripts, automation, and command-line tools where OAuth flow is not practical.

### This Example Demonstrates:

- ✅ **OAuth Authentication** - Complete sign-in flow with error handling
- ✅ **Token Management** - Automatic token refresh and expiration tracking
- ✅ **Dynamic Network Discovery** - Fetch user's actual networks from their account
- ✅ **Modern API Usage** - Uses v3 API through UnifiedNetworkService for network summaries
- ✅ **Email Verification Handling** - Proper handling of unverified accounts
- ✅ **Debug Support** - Comprehensive token and API response inspection

## Live Example

You can run the complete example by opening: [`examples/keycloak-oauth-example.html`](/examples/keycloak-oauth-example.html)

## Key Components

### 1. Keycloak Configuration

```javascript
// Initialize Keycloak with NDEx server settings
const keycloak = new Keycloak({
  url: 'https://dev1.ndexbio.org/auth2',
  realm: 'ndex',
  clientId: 'cytoscapendex'
});

// Initialize with silent check for existing session
keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
});
```

### 2. NDEx Client Authentication

```javascript
import { NDExClient } from '@js4cytoscape/ndex-client';

// Create client with OAuth token
const client = new NDExClient({
  baseURL: 'https://dev1.ndexbio.org',
  auth: {
    type: 'oauth',
    idToken: keycloak.token
  }
});

// Authenticate with NDEx server and get user info
const user = await client.user.authenticate();
console.log('Authenticated as:', user.userName);
console.log('User UUID:', user.externalId);

// Store user info for subsequent API calls
const currentUser = user;
```

### 3. Dynamic Network Discovery & Access

```javascript
// Store authenticated user info for API calls
let currentUser; // Global variable to store user info

// After successful authentication, store user info
const user = await client.user.authenticate();
currentUser = user; // Store for later use in API calls

// Dynamically get user's latest networks from their account
const userNetworks = await client.user.getAccountPageNetworks(
  currentUser.externalId, // Use authenticated user's UUID
  0,                      // offset
  10                      // limit - get latest 10 networks
);

console.log(`Found ${userNetworks.length} networks:`);
userNetworks.forEach((network, index) => {
  console.log(`${index + 1}. ${network.name} (${network.nodeCount} nodes, ${network.edgeCount} edges)`);
  console.log(`   - UUID: ${network.externalId}`);
  console.log(`   - Visibility: ${network.visibility}`);
  console.log(`   - Modified: ${new Date(network.modificationTime).toLocaleDateString()}`);
});

// Get detailed summary of the first network using modern v3 API
if (userNetworks.length > 0) {
  const firstNetwork = userNetworks[0];
  
  // UnifiedNetworkService automatically routes to v3 API for getNetworkSummary
  const summary = await client.networks.getNetworkSummary(firstNetwork.externalId);
  
  console.log('First Network Summary (via v3 API):', summary);
  console.log('- Name:', summary.name);
  console.log('- Owner:', summary.owner);
  console.log('- Visibility:', summary.visibility);
  console.log('- Created:', new Date(summary.creationTime));
  console.log('- Node Count:', summary.nodeCount.toLocaleString());
  console.log('- Edge Count:', summary.edgeCount.toLocaleString());
  
  // Access v3-specific properties if available
  if (summary.properties) {
    console.log('- Custom Properties:', Object.keys(summary.properties).length);
  }
}
```

## Complete Working Example

The complete working example is available in [`examples/keycloak-oauth-example.html`](/examples/keycloak-oauth-example.html). Here's a simplified version highlighting the key concepts:

```html
<!DOCTYPE html>
<html>
<head>
    <title>NDEx Keycloak OAuth Authentication</title>
    <meta charset='utf-8'/>
    <script src="https://dev1.ndexbio.org/auth2/js/keycloak.js"></script>
    <script src="../dist/index.global.js"></script>
</head>
<body>
    <h1>NDEx Keycloak Authentication Example</h1>
    
    <!-- Authentication Controls -->
    <div id="auth-controls">
        <button id="login-btn" style="display: none;">Sign In with NDEx</button>
        <button id="logout-btn" style="display: none;">Sign Out</button>
        <button id="refresh-btn" style="display: none;">Refresh Token</button>
        <button id="get-networks-btn" style="display: none;">Show Recent Networks</button>
        <button id="get-network-btn" style="display: none;">Get First Network Summary</button>
    </div>
    
    <!-- Results Display -->
    <div id="results"></div>
    
    <script>
        let keycloak;
        let ndexClient;
        let currentUser; // Store authenticated user info
        let userNetworks = []; // Store user's networks
        
        // Initialize Keycloak with silent SSO check
        async function initKeycloak() {
            keycloak = new Keycloak({
                url: 'https://dev1.ndexbio.org/auth2',
                realm: 'ndex',
                clientId: 'cytoscapendex'
            });
            
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
                });
                
                if (authenticated) {
                    await handleAuthenticated();
                } else {
                    showLoginButton();
                }
            } catch (error) {
                console.error('Keycloak initialization failed:', error);
                displayError('Authentication initialization failed');
            }
        }
        
        // Handle successful Keycloak authentication
        async function handleAuthenticated() {
            try {
                // Create NDEx client with OAuth token
                const { NDExClient: NDExClientClass } = window.NDExClient;
                ndexClient = new NDExClientClass({
                    baseURL: 'https://dev1.ndexbio.org',
                    auth: {
                        type: 'oauth',
                        idToken: keycloak.token
                    }
                });
                
                // Authenticate with NDEx and get user info
                const user = await ndexClient.user.authenticate();
                currentUser = user; // Store for later API calls
                
                showAuthenticatedUI();
                displayUserInfo(user);
                displayTokenInfo();
                
            } catch (error) {
                console.error('NDEx authentication failed:', error);
                handleNDExAuthError(error);
            }
        }
        
        // Handle NDEx authentication errors (email verification, etc.)
        function handleNDExAuthError(error) {
            // error.errorCode is set by the typed NDExAuthError class;
            // falls back to 'AUTH_ERROR' when the server provides no code.
            if (error.errorCode === 'NDEx_User_Account_Not_Verified') {
                const confirmed = confirm(
                    'Please verify your email address before signing in.\\n' +
                    'Click OK if you already verified your email address.'
                );
                if (confirmed) {
                    window.location.reload();
                } else {
                    keycloak.logout(window.location.href);
                }
            } else if (error.statusCode === 401 || error.statusCode === 403) {
                displayError('NDEx authentication failed: ' + (error.message || 'Unknown error'));
            } else {
                displayError('Unexpected authentication error: ' + error.message);
            }
        }
        
        // Get user's recent networks dynamically
        async function getUserNetworks() {
            try {
                // Get latest 10 networks from user's account
                const networks = await ndexClient.user.getAccountPageNetworks(
                    currentUser.externalId, // Use stored user UUID
                    0,                      // offset
                    10                      // limit
                );
                
                userNetworks = networks; // Store for other operations
                displayUserNetworks(networks);
                
            } catch (error) {
                console.error('Failed to get user networks:', error);
                displayError('Failed to get user networks: ' + error.message);
            }
        }
        
        // Get detailed network summary using v3 API
        async function getFirstNetworkSummary() {
            try {
                if (userNetworks.length === 0) {
                    displayError('No networks available. Please get your networks first.');
                    return;
                }
                
                const firstNetwork = userNetworks[0];
                // UnifiedNetworkService automatically routes to v3 API
                const summary = await ndexClient.networks.getNetworkSummary(firstNetwork.externalId);
                
                displayNetworkSummary(summary);
                
            } catch (error) {
                console.error('Failed to get network summary:', error);
                displayError('Failed to get network summary: ' + error.message);
            }
        }
        
        // UI Helper Functions
        function showLoginButton() {
            document.getElementById('login-btn').style.display = 'block';
        }
        
        function showAuthenticatedUI() {
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('refresh-btn').style.display = 'block';
            document.getElementById('get-networks-btn').style.display = 'block';
            document.getElementById('get-network-btn').style.display = 'block';
        }
        
        function displayUserInfo(user) {
            const results = document.getElementById('results');
            results.innerHTML += \`
                <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px;">
                    <h3>✅ Authentication Successful</h3>
                    <p><strong>Username:</strong> \${user.userName}</p>
                    <p><strong>Name:</strong> \${user.firstName || 'N/A'} \${user.lastName || ''}</p>
                    <p><strong>Email:</strong> \${user.emailAddress}</p>
                    <p><strong>User UUID:</strong> \${user.externalId}</p>
                    <p><strong>Verified:</strong> \${user.isVerified ? 'Yes' : 'No'}</p>
                </div>
            \`;
        }
        
        function displayUserNetworks(networks) {
            const results = document.getElementById('results');
            
            if (networks.length === 0) {
                results.innerHTML += \`
                    <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-radius: 5px;">
                        <h3>📂 Your Networks</h3>
                        <p>No networks found in your account.</p>
                    </div>
                \`;
                return;
            }
            
            const networksList = networks.map((network, index) => \`
                <tr>
                    <td style="padding: 8px;">\${index + 1}</td>
                    <td style="padding: 8px;">\${network.name}</td>
                    <td style="padding: 8px;">\${network.nodeCount.toLocaleString()}</td>
                    <td style="padding: 8px;">\${network.edgeCount.toLocaleString()}</td>
                    <td style="padding: 8px;">\${network.visibility}</td>
                </tr>
            \`).join('');
            
            results.innerHTML += \`
                <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px;">
                    <h3>📂 Your Recent Networks (\${networks.length} shown)</h3>
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                        <thead>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 10px; text-align: left;">#</th>
                                <th style="padding: 10px; text-align: left;">Name</th>
                                <th style="padding: 10px; text-align: center;">Nodes</th>
                                <th style="padding: 10px; text-align: center;">Edges</th>
                                <th style="padding: 10px; text-align: center;">Visibility</th>
                            </tr>
                        </thead>
                        <tbody>\${networksList}</tbody>
                    </table>
                </div>
            \`;
        }
        
        function displayNetworkSummary(summary) {
            const results = document.getElementById('results');
            results.innerHTML += \`
                <div style="margin: 20px 0; padding: 15px; background: #fff5e6; border-radius: 5px;">
                    <h3>📊 Network Summary (via v3 API)</h3>
                    <p><strong>Name:</strong> \${summary.name}</p>
                    <p><strong>UUID:</strong> \${summary.externalId}</p>
                    <p><strong>Nodes:</strong> \${(summary.nodeCount || 0).toLocaleString()}</p>
                    <p><strong>Edges:</strong> \${(summary.edgeCount || 0).toLocaleString()}</p>
                    <p><strong>Owner:</strong> \${summary.owner}</p>
                    <p><strong>Visibility:</strong> \${summary.visibility}</p>
                    <p><strong>Created:</strong> \${new Date(summary.creationTime).toLocaleString()}</p>
                    <details>
                        <summary>Full JSON Response</summary>
                        <pre>\${JSON.stringify(summary, null, 2)}</pre>
                    </details>
                </div>
            \`;
        }
        
        function displayTokenInfo() {
            const results = document.getElementById('results');
            const expirationDate = new Date(keycloak.tokenParsed.exp * 1000);
            const timeUntilExpiry = Math.floor((expirationDate - new Date()) / 1000 / 60);
            
            results.innerHTML += \`
                <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 5px;">
                    <h4>🔑 Token Information (for debugging)</h4>
                    <p><strong>Access Token:</strong></p>
                    <textarea readonly style="width: 100%; height: 60px;">\${keycloak.token}</textarea>
                    <p><strong>Expires:</strong> \${expirationDate.toLocaleString()} (\${timeUntilExpiry} minutes remaining)</p>
                </div>
            \`;
        }
        
        function displayError(message) {
            const results = document.getElementById('results');
            results.innerHTML += \`
                <div style="margin: 20px 0; padding: 15px; background: #ffe6e6; border-radius: 5px; color: red;">
                    <h3>❌ Error</h3>
                    <p>\${message}</p>
                </div>
            \`;
        }
        
        // Event Handlers
        document.getElementById('login-btn').onclick = () => keycloak.login();
        document.getElementById('logout-btn').onclick = () => keycloak.logout(window.location.href);
        document.getElementById('refresh-btn').onclick = () => {
            keycloak.updateToken(-1).then(() => displayTokenInfo());
        };
        document.getElementById('get-networks-btn').onclick = getUserNetworks;
        document.getElementById('get-network-btn').onclick = getFirstNetworkSummary;
        
        // Initialize when page loads
        window.onload = initKeycloak;
    </script>
</body>
</html>
```

## Configuration Details

### Keycloak Settings

The example uses these hard-coded Keycloak settings for NDEx:

- **URL:** `https://dev1.ndexbio.org/auth2`
- **Realm:** `ndex`
- **Client ID:** `cytoscapendex`

### Key Improvements in Current Example

The current implementation includes several improvements over basic OAuth examples:

1. **Dynamic Network Discovery** - No hard-coded network UUIDs; fetches user's actual networks
2. **Modern API Usage** - Uses v3 API via UnifiedNetworkService for better performance
3. **Comprehensive Error Handling** - Handles email verification, token expiration, and API errors
4. **Silent SSO Support** - Checks for existing authentication on page load
5. **Token Management** - Real-time token expiration monitoring and refresh
6. **User-Friendly UI** - Step-by-step workflow with clear status updates

## Features

### Dynamic Network Discovery
- Fetches user's actual networks from their account
- No hard-coded network UUIDs required
- Shows recent networks with full metadata (nodes, edges, visibility)
- Handles empty network lists gracefully

### Modern API Integration
- Uses UnifiedNetworkService for automatic v2/v3 API routing
- Leverages v3 API for network summaries (better performance)
- Proper type handling for network counts and properties

### Comprehensive Error Handling
- **Email Verification** - Detects unverified accounts and guides users
- **Token Expiration** - Monitors and displays token expiration times
- **API Errors** - Shows detailed error messages from NDEx server
- **Network Errors** - Handles authentication and network access issues

### Debug Support
- **Token Inspection** - Displays parsed token claims and expiration
- **API Response Logging** - Shows full JSON responses for debugging
- **Real-time Status Updates** - Live status feedback during operations
- **Token Refresh** - Manual and automatic token refresh capabilities

## Authentication Best Practices

### For Web Applications (Recommended: OAuth)

```javascript
// ✅ Correct: Use OAuth for web applications
const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: 'oauth',
    idToken: keycloak.token // From Keycloak authentication
  }
});

// Always call authenticate() after creating the client
const user = await client.user.authenticate();

// Store user info for subsequent API calls
const currentUser = user;

// Use stored user UUID in API calls
const networks = await client.user.getAccountPageNetworks(
  currentUser.externalId, // Explicit user UUID
  0, 10                   // Get latest 10 networks
);

// Use v3 API for modern network operations
const summary = await client.networks.getNetworkSummary(networks[0].externalId);
```

### For Scripts and Automation (Basic Auth)

```javascript
// ✅ Correct: Use Basic Auth for server-side scripts
const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: 'basic',
    username: process.env.NDEX_USERNAME,
    password: process.env.NDEX_PASSWORD
  }
});

// For basic auth, you can use undefined for current user
const networks = await client.user.getAccountPageNetworks(
  undefined, // undefined = current authenticated user
  0, 25
);
```

### Key Differences

| Aspect | OAuth (Web Apps) | Basic Auth (Scripts) |
|--------|------------------|---------------------|
| **User Experience** | Interactive sign-in | Programmatic |
| **Token Management** | Automatic refresh | Manual credentials |
| **Security** | Short-lived tokens | Long-lived credentials |
| **Use Case** | Browser applications | Server automation |
| **User UUID** | Must specify explicitly | Can use `undefined` |

## Next Steps

- **[User Management →](/docs/guides/user-management)** - Learn about user operations
- **[Working with Networks →](/docs/guides/working-with-networks)** - Network operations guide
- **[Authentication Guide →](/docs/getting-started/authentication)** - Basic and OAuth setup