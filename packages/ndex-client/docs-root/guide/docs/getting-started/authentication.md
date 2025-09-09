# Authentication

The NDEx client supports two authentication methods: **Basic Authentication** and **OAuth**.

## 🎯 Which Authentication Method to Use?

- **🌐 OAuth (Recommended for Web Applications)** - Use for browser-based applications where users sign in through the Keycloak interface. Provides secure, user-friendly authentication with proper token management.

- **🔧 Basic Authentication (Scripts & Automation)** - Use for server-side scripts, automation, and command-line tools where OAuth flow is not practical.

## Basic Authentication

Most straightforward for server-side applications and scripts.

### Setup

```typescript
import { NDExClient, AuthType } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: AuthType.BASIC,
    username: 'your-username',
    password: 'your-password'
  }
});
```

### Runtime Configuration

You can also configure authentication after creating the client:

```typescript
import { AuthType } from '@js4cytoscape/ndex-client';

const client = new NDExClient();

client.updateConfig({
  auth: {
    type: AuthType.BASIC,
    username: 'your-username', 
    password: 'your-password'
  }
});

// Verify authentication
const user = await client.user.getCurrentUser();
console.log('Authenticated as:', user.userName);
```

## OAuth Authentication

Recommended for browser applications with Google Sign-In.

### Setup

```typescript
import { NDExClient, AuthType } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: AuthType.OAUTH,
    idToken: 'your-google-id-token'
  }
});
```

### OAuth Integration with Keycloak

After successful Keycloak authentication, pass the ID token to the NDEx client:

```typescript
// After Keycloak authentication success
async function handleAuthenticated() {
  // Create NDEx client with OAuth token
  const client = new NDExClient({
    baseURL: 'https://www.ndexbio.org',
    auth: {
      type: AuthType.OAUTH,
      idToken: keycloak.token  // Use the Keycloak token
    }
  });
  
  // Authenticate with NDEx
  const user = await client.user.authenticate();
  console.log('Authenticated as:', user.userName);
}
```

You can also update an existing client:

```typescript
// Update existing client with OAuth token
client.updateConfig({
  auth: {
    type: AuthType.OAUTH,
    idToken: keycloak.token
  }
});
```

## Authentication Status

### Check Authentication

```typescript
// Check if authentication is configured
if (client.hasAuthInfo()) {
  console.log('✅ Authentication configured');
  
  // Get authentication type
  const authType = client.getAuthType();
  console.log('Auth type:', authType); // AuthType.BASIC or AuthType.OAUTH
} else {
  console.log('❌ No authentication configured');
}
```

### Test Authentication

```typescript
async function testAuth() {
  try {
    const user = await client.user.authenticate();
    console.log('✅ Authentication successful');
    console.log('User:', user.userName);
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    return false;
  }
}

await testAuth();
```

## Environment Variables

For server-side applications, use environment variables:

```bash
# .env file
NDEX_USERNAME=your-username
NDEX_PASSWORD=your-password
NDEX_BASE_URL=https://www.ndexbio.org
```

```typescript
// Load from environment
import { NDExClient, AuthType } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: process.env.NDEX_BASE_URL,
  auth: {
    type: AuthType.BASIC,
    username: process.env.NDEX_USERNAME!,
    password: process.env.NDEX_PASSWORD!
  }
});
```

## Security Best Practices

:::warning Security Note
Never commit credentials to version control. Always use environment variables or secure configuration management for production applications.
:::

### For Development

```typescript
// ✅ Good - Use environment variables
const client = new NDExClient({
  auth: {
    type: AuthType.BASIC,
    username: process.env.NDEX_USERNAME!,
    password: process.env.NDEX_PASSWORD!
  }
});
```

```typescript
// ❌ Bad - Hardcoded credentials
const client = new NDExClient({
  auth: {
    type: AuthType.BASIC,
    username: 'myusername',
    password: 'mypassword'  // Never do this!
  }
});
```

### For Production

- Use secure configuration management (AWS Secrets Manager, Azure Key Vault, etc.)
- Rotate credentials regularly
- Use OAuth when possible for browser applications
- Implement proper error handling for authentication failures

## Error Handling

```typescript
try {
  await client.user.getCurrentUser();
} catch (error) {
  if (error.message.includes('Authentication')) {
    console.error('Authentication failed - check credentials');
    // Prompt user to re-authenticate
  } else {
    console.error('Other error:', error.message);
  }
}
```

## Next Steps

- **[Your First Network →](/docs/getting-started/first-network)** - Start working with networks
- **[User Management Guide →](/docs/guides/user-management)** - Manage user accounts and profiles