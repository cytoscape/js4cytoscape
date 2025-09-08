---
title: Get Started
slug: /
---

# Getting Started with NDEx JavaScript Client

A comprehensive guide to installing, configuring, and using the **TypeScript/JavaScript client library** for the [NDEx (Network Data Exchange)](https://www.ndexbio.org) API.

## Quick Start

Get started with the NDEx client in just a few steps:

```bash
npm install @js4cytoscape/ndex-client
```

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

// Create client
const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  timeout: 30000
});

// Get server status (no auth required)
const status = await client.getServerStatus('full');
console.log('NDEx server:', status.message);
console.log('Networks:', status.networkCount);
console.log('Users:', status.userCount);

// Access detailed server info when using 'full' format
if (status.properties) {
  console.log('Server version:', status.properties.ServerVersion);
  console.log('Build:', status.properties.Build);
}
```

## Installation

### Requirements

- **Node.js 16+** (18+ recommended)
- **npm**, **yarn**, or **pnpm**

### Package Installation

```bash npm2yarn
npm install @js4cytoscape/ndex-client
```

### Import Styles

#### ES Modules (Recommended)

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org'
});
```

#### CommonJS

```javascript
const { NDExClient } = require('@js4cytoscape/ndex-client');

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org'
});
```

#### UMD (Browser)

```html
<script src="https://unpkg.com/@js4cytoscape/ndex-client/dist/index.global.js"></script>
<script>
  const client = new NDExClient.NDExClient({
    baseURL: 'https://www.ndexbio.org'
  });
</script>
```

### TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import { NDExClient, NDExUser, CyWebWorkspace } from '@js4cytoscape/ndex-client';

// Full IntelliSense and type checking
const client: NDExClient = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  timeout: 30000
});

// Type-safe API calls
const user: NDExUser = await client.user.getCurrentUser();
const workspaces: CyWebWorkspace[] = await client.workspace.getUserCyWebWorkspaces();
```

### Build Output

The package includes multiple build formats:

- **`dist/index.js`** - CommonJS build
- **`dist/index.mjs`** - ES Module build  
- **`dist/index.global.js`** - UMD build for browsers
- **`dist/index.d.ts`** - TypeScript declarations

### Verification

Test your installation:

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

async function testInstallation() {
  const client = new NDExClient();
  
  try {
    const status = await client.getServerStatus('full');
    console.log('✅ NDEx client installed successfully!');
    console.log('Server:', status.message);
    console.log('Networks:', status.networkCount);
    if (status.properties) {
      console.log('Server version:', status.properties.ServerVersion);
    }
  } catch (error) {
    console.error('❌ Installation test failed:', error.message);
  }
}

testInstallation();
```

## Authentication

The NDEx client supports two authentication methods: **Basic Authentication** and **OAuth**.

### 🎯 Which Authentication Method to Use?

- **🌐 OAuth (Recommended for Web Applications)** - Use for browser-based applications where users sign in through the Keycloak interface. Provides secure, user-friendly authentication with proper token management.

- **🔧 Basic Authentication (Scripts & Automation)** - Use for server-side scripts, automation, and command-line tools where OAuth flow is not practical.

### Basic Authentication

Most straightforward for server-side applications and scripts.

#### Setup

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
```

#### Runtime Configuration

You can also configure authentication after creating the client:

```typescript
const client = new NDExClient();

client.updateConfig({
  auth: {
    type: 'basic',
    username: 'your-username', 
    password: 'your-password'
  }
});

// Verify authentication
const user = await client.user.getCurrentUser();
console.log('Authenticated as:', user.userName);
```

### OAuth Authentication

Recommended for browser applications with Google Sign-In.

#### Setup

```typescript
const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: 'oauth',
    idToken: 'your-google-id-token'
  }
});
```

#### OAuth Integration with Keycloak

After successful Keycloak authentication, pass the ID token to the NDEx client:

```typescript
// After Keycloak authentication success
async function handleAuthenticated() {
  // Create NDEx client with OAuth token
  const client = new NDExClient({
    baseURL: 'https://www.ndexbio.org',
    auth: {
      type: 'oauth',
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
    type: 'oauth',
    idToken: keycloak.token
  }
});
```

### Authentication Status

#### Check Authentication

```typescript
// Check if authentication is configured
if (client.hasAuthInfo()) {
  console.log('✅ Authentication configured');
  
  // Get authentication type
  const authType = client.getAuthType();
  console.log('Auth type:', authType); // 'basic' or 'oauth'
} else {
  console.log('❌ No authentication configured');
}
```

#### Test Authentication

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

### Environment Variables

For server-side applications, use environment variables:

```bash
# .env file
NDEX_USERNAME=your-username
NDEX_PASSWORD=your-password
NDEX_BASE_URL=https://www.ndexbio.org
```

```typescript
// Load from environment
const client = new NDExClient({
  baseURL: process.env.NDEX_BASE_URL,
  auth: {
    type: 'basic',
    username: process.env.NDEX_USERNAME!,
    password: process.env.NDEX_PASSWORD!
  }
});
```

### Security Best Practices

:::warning Security Note
Never commit credentials to version control. Always use environment variables or secure configuration management for production applications.
:::

#### For Development

```typescript
// ✅ Good - Use environment variables
const client = new NDExClient({
  auth: {
    type: 'basic',
    username: process.env.NDEX_USERNAME!,
    password: process.env.NDEX_PASSWORD!
  }
});
```

```typescript
// ❌ Bad - Hardcoded credentials
const client = new NDExClient({
  auth: {
    type: 'basic',
    username: 'myusername',
    password: 'mypassword'  // Never do this!
  }
});
```

#### For Production

- Use secure configuration management (AWS Secrets Manager, Azure Key Vault, etc.)
- Rotate credentials regularly
- Use OAuth when possible for browser applications
- Implement proper error handling for authentication failures

### Error Handling

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

## Your First Network

Learn how to upload, retrieve, and manage networks using the NDEx client.

### Upload a Network

#### From CX2 Data

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: 'basic',
    username: process.env.NDEX_USERNAME!,
    password: process.env.NDEX_PASSWORD!
  }
});

// CX2 network data
const cx2Network = [
  {
    "CXVersion": "2.0",
    "hasFragments": false
  },
  {
    "metaData": [
      {"name": "nodes", "elementCount": 2},
      {"name": "edges", "elementCount": 1}
    ]
  },
  {
    "nodes": [
      {"id": 0, "v": {"n": "Node1", "r": "protein"}},
      {"id": 1, "v": {"n": "Node2", "r": "protein"}}
    ]
  },
  {
    "edges": [
      {"id": 0, "s": 0, "t": 1, "v": {"i": "interacts"}}
    ]
  },
  {
    "status": [
      {"success": true}
    ]
  }
];

// Upload network
try {
  const result = await client.networks.createNetworkFromRawCX2(cx2Network, { visibility: 'PUBLIC' });
  console.log('✅ Network uploaded successfully!');
  console.log('Network UUID:', result.uuid);
} catch (error) {
  console.error('❌ Upload failed:', error.message);
}
```

#### From File

```typescript
import fs from 'fs';

// Load CX2 file
const cx2Data = JSON.parse(fs.readFileSync('my-network.cx2', 'utf8'));

const result = await client.networks.createNetworkFromRawCX2(cx2Data, { visibility: 'PRIVATE' });
console.log('Network ID:', result.uuid);
```

### Retrieve a Network

#### Get Network Data

```typescript
const networkUUID = 'your-network-uuid';

try {
  // Get CX2 format using unified service (v3 API)
  const cx2Network = await client.networks.getRawCX2Network(networkUUID);
  console.log('CX2 Network data:', cx2Network);
  
  // Get classic CX format using unified service (v2 API)  
  const cxNetwork = await client.networks.getRawCX1Network(networkUUID);
  console.log('CX1 Network data:', cxNetwork);
  
  // Or access version-specific services directly
  const v3Network = await client.v3.networks.getNetworkAsCX2(networkUUID);
  const v2Network = await client.v2.networks.getNetwork(networkUUID);
} catch (error) {
  console.error('Failed to retrieve network:', error.message);
}
```

#### Get Network Summary

```typescript
const networkUUID = 'your-network-uuid';

// Get summary using unified service (automatically routes to v3 API for best performance)
const summary = await client.networks.getNetworkSummary(networkUUID);
console.log('Network name:', summary.name);
console.log('Node count:', summary.nodeCount);
console.log('Edge count:', summary.edgeCount);
console.log('Owner:', summary.owner);
console.log('Creation time:', new Date(summary.creationTime));

// Or access v2/v3 APIs directly if needed
// V3 API (modern, recommended)
const v3Summary = await client.v3.networks.getNetworkSummary(networkUUID);

// V2 API (legacy)  
const v2Summary = await client.v2.networks.getNetworkSummary(networkUUID);
```

### Search Networks

```typescript
// Search public networks
const searchResults = await client.networks.searchNetworks({
  searchString: 'cancer pathway',
  start: 0,
  size: 10
});

console.log(`Found ${searchResults.networks.length} networks`);
searchResults.networks.forEach(network => {
  console.log(`- ${network.name} (${network.nodeCount} nodes)`);
});
```

### Update a Network

```typescript
const networkUUID = 'your-network-uuid';

// Update network data
const updatedCX2 = [
  // ... your updated CX2 data
];

try {
  await client.networks.updateNetworkFromRawCX2(networkUUID, updatedCX2);
  console.log('✅ Network updated successfully');
} catch (error) {
  console.error('❌ Update failed:', error.message);
}
```

### Copy a Network

```typescript
const originalNetworkUUID = 'source-network-uuid';

try {
  const copyResult = await client.networks.copyNetwork(originalNetworkUUID);
  console.log('✅ Network copied successfully');
  console.log('New network UUID:', copyResult.uuid);
} catch (error) {
  console.error('❌ Copy failed:', error.message);
}
```

### Delete a Network

:::warning Be Careful
Network deletion is permanent and cannot be undone.
:::

```typescript
const networkUUID = 'network-to-delete';

try {
  await client.networks.deleteNetwork(networkUUID);
  console.log('✅ Network deleted successfully');
} catch (error) {
  console.error('❌ Delete failed:', error.message);
}
```

### Working with Access Keys

Some networks require access keys for public access:

```typescript
const networkUUID = 'protected-network-uuid';
const accessKey = 'network-access-key';

// Retrieve with access key
const network = await client.networks.getRawCX2Network(networkUUID, accessKey);
const summary = await client.networks.getNetworkSummary(networkUUID, { accessKey, format: 'FULL' });
```

### Error Handling

```typescript
async function safeNetworkOperation(networkUUID: string) {
  try {
    const network = await client.networks.getRawCX2Network(networkUUID);
    return network;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Network not found or no permission');
    } else if (error.response?.status === 401) {
      console.error('Authentication required');
    } else if (error.response?.status === 403) {
      console.error('Access forbidden - check permissions');
    } else {
      console.error('Unexpected error:', error.message);
    }
    throw error;
  }
}
```

### Complete Example

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

async function networkWorkflow() {
  const client = new NDExClient({
    baseURL: 'https://www.ndexbio.org',
    auth: {
      type: 'basic',
      username: process.env.NDEX_USERNAME!,
      password: process.env.NDEX_PASSWORD!
    }
  });

  try {
    // 1. Upload a network
    const cx2Data = [
      { "CXVersion": "2.0", "hasFragments": false },
      { "metaData": [{"name": "nodes", "elementCount": 2}, {"name": "edges", "elementCount": 1}] },
      { "nodes": [{"id": 0, "v": {"n": "Protein A"}}, {"id": 1, "v": {"n": "Protein B"}}] },
      { "edges": [{"id": 0, "s": 0, "t": 1, "v": {"i": "binds"}}] },
      { "status": [{"success": true}] }
    ];
    const uploadResult = await client.networks.createNetworkFromRawCX2(cx2Data, { visibility: 'PRIVATE' });
    const networkUUID = uploadResult.uuid;
    console.log('📤 Uploaded network:', networkUUID);

    // 2. Get network summary
    const summary = await client.networks.getNetworkSummary(networkUUID);
    console.log('📊 Network summary:', summary.name);

    // 3. Copy the network
    const copyResult = await client.networks.copyNetwork(networkUUID);
    console.log('📋 Copied network:', copyResult.uuid);

    // 4. Clean up - delete the copy
    await client.networks.deleteNetwork(copyResult.uuid);
    console.log('🗑️ Cleaned up copy');

    return networkUUID;
  } catch (error) {
    console.error('❌ Workflow failed:', error.message);
    throw error;
  }
}

networkWorkflow()
  .then(uuid => console.log('✅ Workflow completed, main network:', uuid))
  .catch(error => console.error('💥 Workflow error:', error));
```

## NDEx Resources

- **[NDEx Website](https://www.ndexbio.org)** - The NDEx platform
- **[NDEx API Docs](https://home.ndexbio.org/using-the-ndex-server-api/)** - Official API documentation
- **[NDEx OpenAPI](http://openapi.ndextools.org/)** - Interactive API explorer

## Next Steps

- **[API Reference](/docs/api)** - Complete API documentation
- **[Working with Networks →](/docs/guides/working-with-networks)** - Advanced network operations
- **[Workspace Workflows →](/docs/guides/workspace-workflows)** - Organize networks in workspaces
- **[File Operations →](/docs/guides/file-operations)** - Manage files and folders