# Working with Networks

Advanced network operations and management techniques.

## Network Formats

### CX2 Format (Recommended)

CX2 is the modern network format used by NDEx v3 API:

```typescript
// Upload CX2 network
const cx2Network = [
  {
    "CXVersion": "2.0",
    "hasFragments": false
  },
  {
    "metaData": [
      {"name": "nodes", "elementCount": 3},
      {"name": "edges", "elementCount": 2},
      {"name": "networkAttributes", "elementCount": 1}
    ]
  },
  {
    "networkAttributes": [
      {"n": "name", "v": "My Pathway Network"}
    ]
  },
  {
    "nodes": [
      {"id": 0, "v": {"n": "EGFR", "r": "protein"}},
      {"id": 1, "v": {"n": "TP53", "r": "protein"}},
      {"id": 2, "v": {"n": "KRAS", "r": "protein"}}
    ]
  },
  {
    "edges": [
      {"id": 0, "s": 0, "t": 1, "v": {"i": "phosphorylates"}},
      {"id": 1, "s": 1, "t": 2, "v": {"i": "regulates"}}
    ]
  },
  {
    "status": [
      {"success": true}
    ]
  }
];

import { Visibility } from '@js4cytoscape/ndex-client';

const result = await client.createNetworkFromRawCX2(cx2Network, { visibility: Visibility.PUBLIC });
```

### Legacy CX Format

For compatibility with older systems:

```typescript
// Upload CX1 network
const cxNetwork = [
  {"numberVerification": [{"longNumber": 283213721732712}]},
  {"metaData": [
    {"name": "nodes", "elementCount": 2},
    {"name": "edges", "elementCount": 1}
  ]},
  {"nodes": [
    {"@id": 0, "n": "Node1", "r": "protein"},
    {"@id": 1, "n": "Node2", "r": "protein"}
  ]},
  {"edges": [
    {"@id": 0, "s": 0, "t": 1, "i": "interacts"}
  ]},
  {"status": [
    {"success": true}
  ]}
];

const networkUUID = await client.createNetworkFromRawCX(cxNetwork);
```

## Network Metadata

### Get Network Aspects

```typescript
const networkUUID = 'your-network-uuid';

// Get CX2 metadata
const cx2Meta = await client.getCX2MetaData(networkUUID);
console.log('Available aspects:', cx2Meta.map(m => m.name));

// Get specific aspect data
const nodes = await client.getAspectElements(networkUUID, 'nodes', 100);
const edges = await client.getAspectElements(networkUUID, 'edges', 100);
```

### Network Attributes

```typescript
// Get network attributes
const attributes = await client.getAspectElements(networkUUID, 'networkAttributes');
console.log('Network attributes:', attributes);

// Common network attributes
attributes.forEach(attr => {
  switch(attr.n) {
    case 'name':
      console.log('Network name:', attr.v);
      break;
    case 'description':
      console.log('Description:', attr.v);
      break;
    case 'version':
      console.log('Version:', attr.v);
      break;
  }
});
```

## Network Queries

### Neighborhood Queries

Find nodes and their neighbors:

```typescript
const networkUUID = 'your-network-uuid';

// Find neighbors of specific proteins
const neighborhoodResult = await client.neighborhoodQuery(
  networkUUID,
  'EGFR TP53',  // search terms
  false,        // don't save result
  {
    searchDepth: 2,      // 2 hops from search terms
    edgeLimit: 100,      // max edges to return
    directOnly: false    // include indirect connections
  },
  true  // return CX2 format
);

console.log('Neighborhood network:', neighborhoodResult);
```

### Interconnect Queries

Find paths between specific nodes:

```typescript
// Find connections between proteins
const interconnectResult = await client.interConnectQuery(
  networkUUID,
  'EGFR KRAS',  // find paths between these
  false,        // don't save result
  {
    edgeLimit: 50,
    nodeIds: [0, 2]  // specific node IDs if known
  },
  true  // return CX2 format
);
```

### Node Attribute Queries

Query nodes by attributes:

```typescript
// Find nodes with specific attributes
const nodeResults = await client.getAttributesOfSelectedNodes(
  networkUUID,
  {
    ids: [0, 1, 2],  // node IDs
    attributeNames: ['name', 'type', 'expression']
  }
);

console.log('Node attributes:', nodeResults);
```

### Edge Filtering

Filter edges by attributes:

```typescript
// Get edges with specific interaction types
const filteredEdges = await client.getFilteredEdges(
  networkUUID,
  'interaction',        // column name
  'phosphorylates',     // value to search for
  'EQUAL',             // operator
  50,                  // limit
  'ASC',              // order
  'CX2'               // format
);
```

## Batch Operations

### Multiple Network Summaries

```typescript
const networkUUIDs = [
  'uuid1',
  'uuid2', 
  'uuid3'
];

// Get summaries in batch (more efficient)
const summaries = await client.getNetworkSummariesV3ByUUIDs(
  networkUUIDs,
  null,    // no access key
  'FULL'   // full format
);

summaries.forEach(summary => {
  console.log(`${summary.name}: ${summary.nodeCount} nodes, ${summary.edgeCount} edges`);
});
```

### Bulk Network Operations

```typescript
// Move multiple networks to a folder
const networkIds = ['uuid1', 'uuid2', 'uuid3'];
const folderId = 'target-folder-uuid';

await client.moveNetworks(networkIds, folderId);

// Set visibility for multiple networks
const files = {
  'uuid1': 'NETWORK',
  'uuid2': 'NETWORK',
  'uuid3': 'NETWORK'
};

// Visibility options: Visibility.PUBLIC, Visibility.PRIVATE, or Visibility.UNLISTED
await client.setNetworksVisibility(files, Visibility.PUBLIC);
```

## Network Visibility

Networks can have three visibility levels:

- **PUBLIC**: Anyone can discover and view the network
- **PRIVATE**: Only the owner and specifically invited users can access
- **UNLISTED**: Anyone with the direct link can view, but not discoverable in search

```typescript
// Example: Create network with specific visibility
const result = await client.createNetworkFromRawCX2(cx2Data, {
  visibility: Visibility.UNLISTED,  // or Visibility.PUBLIC or Visibility.PRIVATE
  folderId: 'optional-folder-uuid'
});
```

## Network Permissions

### Check Permissions

Permission levels available:
- **READ**: View and download network content
- **WRITE**: All READ permissions + modify network content and metadata  
- **ADMIN**: All WRITE permissions + delete network and manage user permissions

```typescript
const networkUUIDs = ['uuid1', 'uuid2'];

const permissions = await client.getNetworkPermissionsByUUIDs(networkUUIDs);
permissions.forEach(perm => {
  console.log(`Network ${perm.networkUUID}: ${perm.permission}`); // 'READ', 'WRITE', or 'ADMIN'
});
```

### Access Keys

```typescript
const networkUUID = 'your-network-uuid';

// Get current access key
const accessKey = await client.getAccessKey(networkUUID);
console.log('Access key:', accessKey);

// Generate new access key
await client.updateAccessKey(networkUUID, 'generate');

// Disable access key
await client.updateAccessKey(networkUUID, 'delete');
```

## Advanced Features

### DOI Management

```typescript
// Request DOI for network
const doiResult = await client.getNetworkDOI(
  networkUUID,
  'your-key',
  'your-email@example.com'
);

// Cancel DOI request
await client.cancelDOIRequest(networkUUID);
```

### Layout Updates

```typescript
// Update node positions
const nodePositions = [
  { node: 0, x: 100.5, y: 200.0 },
  { node: 1, x: 150.0, y: 250.5 },
  { node: 2, x: 200.5, y: 300.0 }
];

await client.updateCartesianLayoutAspect(networkUUID, nodePositions);
```

### Random Sampling

```typescript
// Get random edges for large network analysis
const randomEdges = await client.getRandomEdges(
  networkUUID,
  100,      // sample size
  accessKey // optional access key
);

console.log('Random edge sample:', randomEdges);
```

## Error Handling Best Practices

```typescript
async function robustNetworkOperation(networkUUID: string) {
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      const result = await client.getCX2Network(networkUUID);
      return result;
    } catch (error) {
      retryCount++;
      
      if (error.response?.status === 429) {
        // Rate limit - wait and retry
        console.log(`Rate limited, waiting... (attempt ${retryCount})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      } else if (error.response?.status === 503) {
        // Server unavailable - wait longer
        console.log(`Server unavailable, waiting... (attempt ${retryCount})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        // Other errors - don't retry
        throw error;
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} retries`);
}
```

## Performance Tips

1. **Use Batch Operations**: When working with multiple networks, use batch APIs
2. **Limit Result Sets**: Always specify limits for large queries
3. **Cache Network Summaries**: Summary data changes infrequently
4. **Use Appropriate Formats**: CX2 for modern apps, CX1 for legacy compatibility
5. **Implement Retry Logic**: Handle rate limiting and temporary failures

## Next Steps

- **[File Operations →](/docs/guides/file-operations)** - Manage network files and folders
- **[Workspace Workflows →](/docs/guides/workspace-workflows)** - Organize networks in workspaces
- **[Advanced Patterns →](/docs/examples/advanced-patterns)** - Complex integration patterns