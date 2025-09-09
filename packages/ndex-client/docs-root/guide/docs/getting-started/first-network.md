# Your First Network

Learn how to upload, retrieve, and manage networks using the NDEx client.

## Upload a Network

### From CX2 Data

```typescript
import { NDExClient, AuthType } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  auth: {
    type: AuthType.BASIC,
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
  const result = await client.networks.createNetworkFromRawCX2(cx2Network, { visibility: 'PRIVATE' });
  console.log('✅ Network uploaded successfully!');
  console.log('Network UUID:', result.uuid);
} catch (error) {
  console.error('❌ Upload failed:', error.message);
}
```

### From File

```typescript
import fs from 'fs';

// Load CX2 file
const cx2Data = JSON.parse(fs.readFileSync('my-network.cx2', 'utf8'));

const result = await client.networks.createNetworkFromRawCX2(cx2Data, { visibility: 'PRIVATE' });
console.log('Network ID:', result.uuid);
```

## Retrieve a Network

### Get Network Data

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

### Get Network Summary

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

## Search Networks

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

## Update a Network

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

## Copy a Network

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

## Delete a Network

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

## Working with Access Keys

Some networks require access keys for public access:

```typescript
const networkUUID = 'protected-network-uuid';
const accessKey = 'network-access-key';

// Retrieve with access key
const network = await client.networks.getRawCX2Network(networkUUID, accessKey);
const summary = await client.networks.getNetworkSummary(networkUUID, { accessKey, format: 'FULL' });
```

## Error Handling

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

## Complete Example

```typescript
import { NDExClient, AuthType } from '@js4cytoscape/ndex-client';

async function networkWorkflow() {
  const client = new NDExClient({
    baseURL: 'https://www.ndexbio.org',
    auth: {
      type: AuthType.BASIC,
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

## Next Steps

- **[Working with Networks →](/docs/guides/working-with-networks)** - Advanced network operations
- **[Workspace Workflows →](/docs/guides/workspace-workflows)** - Organize networks in workspaces
- **[File Operations →](/docs/guides/file-operations)** - Manage files and folders