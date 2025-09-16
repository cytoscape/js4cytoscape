# NDEx Client Library Migration Guide

## Overview

This guide helps migrate applications from the legacy JavaScript NDEx client library to the new modern TypeScript implementation. The library has been completely refactored with the following key changes:

- **Language**: Migrated from JavaScript to TypeScript with full type safety
- **Architecture**: Modular service-based architecture replacing monolithic classes
- **API Support**: Intelligent routing between NDEx v2 and v3 APIs
- **Format Support**: Native CX2 format support alongside legacy CX1
- **Authentication**: Improved authentication handling with OAuth support
- **Removed Features**: NetworkSet and Group operations (deprecated by NDEx server)

## Quick Start

### Old (NDEx.js)
```javascript
import NDEx from './NDEx.js';

const client = new NDEx('https://www.ndexbio.org');
client.setBasicAuth('username', 'password');
const user = await client.getSignedInUser();
```

### New (TypeScript)
```typescript
import { NDExClient } from 'ndex-client';

const client = new NDExClient({ baseURL: 'https://www.ndexbio.org' });
// Authentication is handled through user service
await client.user.authenticate({ username: 'username', password: 'password' });
const user = await client.user.getCurrentUser();
```

## Class Migration Mapping

### NDEx.js → New Architecture

The monolithic `NDEx` class has been split into focused services:

| Old NDEx.js Class | New Service | Access Pattern |
|------------------|-------------|----------------|
| `NDEx` | `NDExClient` | Main client class |
| - | `client.user` | User operations |
| - | `client.networks` | Network operations |
| - | `client.admin` | Admin operations |
| - | `client.files` | File operations (V3) |
| - | `client.workspace` | Workspace operations (V3) |

### CyNDEx.js → CyNDExService

| Old CyNDEx.js | New CyNDExService | Notes |
|---------------|-------------------|--------|
| `CyNDEx` class | `CyNDExService` class | Direct 1:1 migration with improved typing |
| All methods | All methods preserved | Same method signatures, better error handling |

## Constructor Changes

### NDEx Class
```javascript
// Old
const client = new NDEx('https://www.ndexbio.org/v2');

// New
const client = new NDExClient({ 
  baseURL: 'https://www.ndexbio.org',
  debug: true,
  timeout: 30000
});
```

### CyNDEx Class
```javascript
// Old
const cyNDEx = new CyNDEx(1234);

// New  
const cyNDEx = new CyNDExService(1234, {
  ndexBaseURL: 'https://www.ndexbio.org',
  cyRestBaseURL: 'http://127.0.0.1'
});
```

## Authentication Migration

### Basic Authentication
```javascript
// Old
client.setBasicAuth('username', 'password');

// New
client.user.authenticate({ username: 'username', password: 'password' });
// or set directly on client
import { AuthType } from 'ndex-client';

client.updateConfig({ 
  auth: { type: AuthType.BASIC, username: 'username', password: 'password' }
});
```

### OAuth Authentication  
```javascript
// Old
client.SetGoogleAuth(googleAuthObj);
client.setAuthToken(idToken);

// New
client.updateConfig({ 
  auth: { type: AuthType.OAUTH, idToken: 'your-id-token' }
});
// or
client.setIdToken('your-id-token');
```

## Function Migration Reference

### User Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getSignedInUser()` | `client.user.getCurrentUser()` | Returns authenticated user |
| `getUser(uuid)` | `client.user.getUser(uuid)` | Get user by UUID |
| `getAccountPageNetworks(offset, limit)` | `client.user.getAccountPageNetworks(userUUID, offset, limit)` | Now requires userUUID parameter |
| `getAccountPageNetworksByUUID(uuid, offset, limit)` | `client.user.getAccountPageNetworks(uuid, offset, limit)` | Direct mapping |
| `getUsersByUUIDs(uuidList)` | `client.user.getUsersByUUIDs(uuidList)` | Batch user operations |
| `searchUsers(terms, start, size)` | `client.user.searchUsers(terms, start, size)` | User search |

### Network Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getRawNetwork(uuid, accessKey)` | `client.networks.getRawCX1Network(uuid, { accesskey })` | Returns CX1 format |
| `getCX2Network(uuid, accessKey)` | `client.networks.getRawCX2Network(uuid, { accesskey })` | Returns CX2 format |
| `getNetworkSummary(uuid, accessKey)` | `client.networks.getNetworkSummary(uuid, { accesskey })` | Uses V3 API by default |
| `getNetworkV3Summary(uuid, accessKey, fmt)` | `client.networks.v3.getNetworkSummary(uuid, { accesskey })` | V3-specific access |
| `createNetworkFromRawCX(rawCX, params)` | `client.networks.v2.createNetworkFromRawCX1(rawCX, params)` | CX1 creation |
| `createNetworkFromRawCX2(rawCX2, makePublic)` | `client.networks.createNetworkFromRawCX2(rawCX2, makePublic)` | CX2 creation |
| `updateNetworkFromRawCX(uuid, rawcx)` | `client.networks.v2.updateNetworkFromRawCX1(uuid, rawcx)` | CX1 update |
| `updateNetworkFromRawCX2(uuid, rawCX2)` | `client.networks.updateNetworkFromRawCX2(uuid, rawCX2)` | CX2 update |
| `deleteNetwork(uuid)` | `client.networks.deleteNetwork(uuid)` | Direct mapping |
| `copyNetwork(uuid)` | `client.networks.v2.copyNetwork(uuid)` | Network copying |

### Search Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `searchNetworks(terms, start, size, params)` | `client.networks.v2.searchNetworks(terms, start, size, params)` | V2 search API |
| `neighborhoodQuery(uuid, terms, save, params, outputCX2)` | `client.networks.neighborhoodQuery(uuid, terms, save, params, outputCX2)` | Subnetwork search |
| `interConnectQuery(uuid, terms, save, params, outputCX2)` | `client.networks.interConnectQuery(uuid, terms, save, params, outputCX2)` | Interconnect search |

### Batch Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getNetworkSummariesByUUIDs(uuidList, accessKey)` | `client.networks.v2.getNetworkSummariesByUUIDs(uuidList, accessKey)` | V2 batch summaries |
| `getNetworkSummariesV3ByUUIDs(uuidList, accessKey, fmt)` | `client.networks.v3.getNetworkSummariesV3ByUUIDs(uuidList, accessKey, fmt)` | V3 batch summaries |
| `getNetworkPermissionsByUUIDs(uuidList)` | `client.networks.getNetworkPermissionsByUUIDs(uuidList)` | Batch permissions |
| `exportNetworks(exportJob)` | `client.networks.exportNetworks(exportJob)` | Network export |
| `moveNetworks(networkIds, folderId)` | `client.networks.moveNetworks(networkIds, folderId)` | Move to folder |

### DOI Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getNetworkDOI(uuid, key, email)` | `client.networks.createNetworkDOI(uuid, key, email)` | Create DOI |
| `cancelDOIRequest(uuid)` | **REMOVED** | Use admin service if available |

### Access Key Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getAccessKey(uuid)` | `client.networks.v2.getAccessKey(uuid)` | Get network access key |
| `updateAccessKey(uuid, action)` | `client.networks.v2.updateAccessKey(uuid, action)` | Enable/disable access key |

### Aspect Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getRandomEdges(uuid, limit, accessKey)` | `client.networks.getRandomEdges(uuid, limit, accessKey)` | Random edge sampling |
| `getMetaData(uuid, accessKey)` | `client.networks.v2.getMetaData(uuid, accessKey)` | CX1 metadata |
| `getCX2MetaData(uuid, accessKey)` | `client.networks.getCX2MetaData(uuid, accessKey)` | CX2 metadata |
| `getAspectElements(uuid, aspectName, limit, accessKey)` | `client.networks.getAspectElements(uuid, aspectName, limit, accessKey)` | Aspect elements |
| `getFilteredEdges(uuid, column, value, op, limit, order, format, accessKey)` | `client.networks.getFilteredEdges(uuid, column, value, op, limit, order, format, accessKey)` | Filtered edges |
| `getAttributesOfSelectedNodes(uuid, {ids, attributeNames}, accessKey)` | `client.networks.getAttributesOfSelectedNodes(uuid, {ids, attributeNames}, {accesskey})` | Node attributes |

### Layout Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `updateCartesianLayoutAspect(uuid, nodePositions)` | **REMOVED** | Layout updates not supported in new client |

### Workspace Operations (V3)

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `createCyWebWorkspace(workspace)` | `client.workspace.createCyWebWorkspace(workspace)` | Create workspace |
| `getCyWebWorkspace(workspaceId)` | `client.workspace.getCyWebWorkspace(workspaceId)` | Get workspace |
| `deleteCyWebWorkspace(workspaceId)` | `client.workspace.deleteCyWebWorkspace(workspaceId)` | Delete workspace |
| `updateCyWebWorkspace(workspaceId, workspaceObj)` | `client.workspace.updateCyWebWorkspace(workspaceId, workspaceObj)` | Update workspace |
| `updateCyWebWorkspaceName(workspaceId, newName)` | `client.workspace.updateCyWebWorkspaceName(workspaceId, newName)` | Update name |
| `updateCyWebWorkspaceNetworks(workspaceId, networkIds)` | `client.workspace.updateCyWebWorkspaceNetworks(workspaceId, networkIds)` | Update networks |
| `getUserCyWebWorkspaces()` | `client.workspace.getUserCyWebWorkspaces()` | Get user workspaces |
| `signInFromIdToken(idToken)` | `client.user.authenticate()` with OAuth config | Sign in with token |

### Files Operations (V3)

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `copyFile(fromUuid, toPath, type, accessKey)` | `client.files.copyFile(fromUuid, toPath, type, accessKey)` | Copy file |
| `getCount()` | `client.files.getCount()` | File counts |
| `getTrash()` | `client.files.getTrash()` | Trash contents |
| `emptyTrash()` | `client.files.emptyTrash()` | Empty trash |
| `permanentlyDeleteFile(fileId)` | `client.files.permanentlyDeleteFile(fileId)` | Permanent delete |
| `restoreFile(networkIds, folderIds, shortcutIds)` | `client.files.restoreFile(networkIds, folderIds, shortcutIds)` | Restore files |

### Sharing Operations (V3)

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `updateMember(files, members)` | `client.files.updateMember(files, members)` | Update sharing permissions |
| `listMembers(files)` | `client.files.listMembers(files)` | List shared members |
| `transferOwnership(files, newOwner)` | `client.files.transferOwnership(files, newOwner)` | Transfer ownership |
| `listShares(limit)` | `client.files.listShares(limit)` | List shares |
| `share(files)` | `client.files.share(files)` | Share files |
| `unshare(files)` | `client.files.unshare(files)` | Unshare files |
| `setNetworksVisibility(files, visibility)` | `client.networks.setNetworksVisibility(files, visibility)` | Set visibility |

### Folder Operations (V3)

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getFolders(limit)` | `client.files.getFolders(limit)` | Get folders |
| `createFolder(name, parentFolderId)` | `client.files.createFolder(name, parentFolderId)` | Create folder |
| `getFolder(folderId, accessKey)` | `client.files.getFolder(folderId, accessKey)` | Get folder |
| `updateFolder(folderId, name, parentFolderId)` | `client.files.updateFolder(folderId, name, parentFolderId)` | Update folder |
| `deleteFolder(folderId)` | `client.files.deleteFolder(folderId)` | Delete folder |
| `getFolderCount(folderId, accessKey)` | `client.files.getFolderCount(folderId, accessKey)` | Get folder count |
| `getFolderList(folderId, accessKey, format, type)` | `client.files.getFolderList(folderId, accessKey, format, type)` | List folder contents |

### Shortcut Operations (V3)

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getShortcuts(limit)` | `client.files.getShortcuts(limit)` | Get shortcuts |
| `createShortcut(name, parentFolderId, targetId, targetType)` | `client.files.createShortcut(name, parentFolderId, targetId, targetType)` | Create shortcut |
| `getShortcut(shortcutId, accessKey)` | `client.files.getShortcut(shortcutId, accessKey)` | Get shortcut |
| `updateShortcut(shortcutId, name, parentFolderId, targetId, targetType)` | `client.files.updateShortcut(shortcutId, name, parentFolderId, targetId, targetType)` | Update shortcut |
| `delteShortcut(shortcutId)` | `client.files.deleteShortcut(shortcutId)` | Delete shortcut (typo fixed) |

### Admin Operations

| Old NDEx.js Method | New Method | Notes |
|-------------------|------------|--------|
| `getStatus()` | `client.getServerStatus()` | Server status (no auth required) |
| `getStatus()` | `client.admin.getSystemStats()` | Admin-level stats |

## CyNDEx Migration (Cytoscape Integration)

The `CyNDEx` class has been migrated to `CyNDExService` with **identical method signatures** for perfect backward compatibility:

| Old CyNDEx.js Method | New CyNDExService Method | Notes |
|---------------------|-------------------------|--------|
| `constructor(port)` | `constructor(port, config)` | Additional optional config parameter |
| `setNDExServer(url)` | `setNDExBaseURL(url)` | Method renamed for clarity |
| `getNDExServer()` | `getNDExBaseURL()` | Method renamed for clarity |
| `setGoogleAuth(googleAuthObj)` | **REMOVED** | Use `setAuthToken(idToken)` instead |
| `setAuthToken(authToken)` | `setAuthToken(authToken)` | Direct mapping |
| `setBasicAuth(username, password)` | `setBasicAuth(username, password)` | Direct mapping |
| `cyRestURL()` | `cyRestURL()` | Direct mapping |
| `getCyNDExStatus()` | `getCyNDExStatus()` | Direct mapping |
| `getCytoscapeNetworkSummary(suid)` | `getCytoscapeNetworkSummary(suid)` | Direct mapping |
| `postNDExNetworkToCytoscape(uuid, accessKey, createView)` | `postNDExNetworkToCytoscape(uuid, accessKey, createView)` | Direct mapping |
| `postCXNetworkToCytoscape(cx)` | `postCXNetworkToCytoscape(cx)` | Direct mapping |
| `postCX2NetworkToCytoscape(cx2_string, title, collection_name)` | `postCX2NetworkToCytoscape(cx2_string, title, collection_name)` | Direct mapping |
| `postCytoscapeNetworkToNDEx(suid)` | `postCytoscapeNetworkToNDEx(suid)` | Direct mapping |
| `putCytoscapeNetworkInNDEx(suid, uuid)` | `putCytoscapeNetworkInNDEx(suid, uuid)` | Direct mapping |

### CyNDEx Migration Example

```javascript
// Old
import CyNDEx from './CyNDEx.js';
const cyNDEx = new CyNDEx(1234);
cyNDEx.setNDExServer('https://www.ndexbio.org');

// New
import { CyNDExService } from 'ndex-client';
const cyNDEx = new CyNDExService(1234);
cyNDEx.setNDExBaseURL('https://www.ndexbio.org');
```

## Removed/Deprecated Functions

### NetworkSet Operations (Removed - Server No Longer Supports)
- `createNetworkSet({name, description})`
- `updateNetworkSet(uuid, {name, description})`
- `deleteNetworkSet(uuid)`
- `getNetworkSet(uuid, accessKey)`
- `addToNetworkSet(networkSetUUID, networkUUIDs)`
- `deleteFromNetworkSet(networkSetUUID, networkUUIDS)`
- `updateNetworkSetSystemProperty(networksetUUID, data)`

### Group Operations (Removed - Server No Longer Supports)
- `createGroup(group)`
- `getGroup(uuid)`
- `updateGroup(group)`
- `deleteGroup(uuid)`
- `getGroupsByUUIDs(uuidList)`
- `searchGroups(searchTerms, start, size)`

### Other Removed Functions
- `updateCartesianLayoutAspect(uuid, nodePositions)` - Layout updates not supported
- `cancelDOIRequest(uuid)` - Use admin service equivalents

## Error Handling

### Old Error Handling
```javascript
try {
  const result = await client.getRawNetwork(uuid);
} catch (error) {
  console.error('Request failed:', error.response?.data || error.message);
}
```

### New Error Handling
```typescript
import { NDExError, NDExAuthError, NDExNotFoundError } from 'ndex-client';

try {
  const result = await client.networks.getRawCX1Network(uuid);
} catch (error) {
  if (error instanceof NDExAuthError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof NDExNotFoundError) {
    console.error('Network not found:', error.message);
  } else if (error instanceof NDExError) {
    console.error('NDEx error:', error.message, 'Status:', error.statusCode);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Benefits

The new client provides full TypeScript support:

```typescript
import { NDExClient, NetworkSummaryV3, CX2Network } from 'ndex-client';

const client = new NDExClient({ baseURL: 'https://www.ndexbio.org' });

// Type-safe network operations
const summary: NetworkSummaryV3 = await client.networks.getNetworkSummary('uuid');
const network: CX2Network = await client.networks.getRawCX2Network('uuid');

// Autocomplete and type checking
const userProfile = await client.user.getCurrentUser();
console.log(userProfile.userName); // TypeScript knows this property exists
```

## Migration Examples

### Complete Migration Example

```javascript
// OLD CODE (NDEx.js)
import NDEx from './src/NDEx.js';
import CyNDEx from './src/CyNDEx.js';

const ndexClient = new NDEx('https://www.ndexbio.org/v2');
ndexClient.setBasicAuth('username', 'password');

const cyNDEx = new CyNDEx(1234);
cyNDEx.setNDExServer('https://www.ndexbio.org');
cyNDEx.setBasicAuth('username', 'password');

async function example() {
  const user = await ndexClient.getSignedInUser();
  const networks = await ndexClient.getAccountPageNetworks(0, 10);
  const network = await ndexClient.getRawNetwork(networks[0].externalId);
  
  await cyNDEx.postNDExNetworkToCytoscape(networks[0].externalId);
}
```

```typescript
// NEW CODE (TypeScript)
import { NDExClient, CyNDExService } from 'ndex-client';

const ndexClient = new NDExClient({ 
  baseURL: 'https://www.ndexbio.org',
  auth: { type: 'basic', username: 'username', password: 'password' }
});

const cyNDEx = new CyNDExService(1234);
cyNDEx.setNDExBaseURL('https://www.ndexbio.org');
cyNDEx.setBasicAuth('username', 'password');

async function example() {
  const user = await ndexClient.user.getCurrentUser();
  const networks = await ndexClient.user.getAccountPageNetworks(user.externalId, 0, 10);
  const network = await ndexClient.networks.getRawCX1Network(networks[0].externalId);
  
  await cyNDEx.postNDExNetworkToCytoscape(networks[0].externalId);
}
```

## Testing Improvements

The new implementation features a comprehensive dual-environment testing architecture:

### Old Testing (Legacy)
```bash
# Mocha-based testing with 53% coverage
npm test  # Limited unit tests, no environment separation
```

### New Testing (Modern)
```bash
# Jest-based testing with dual-environment support

# Fast unit tests (70% coverage)
npm test                    # Default: unit tests only
npm run test:unit          # Explicit unit tests
npm run test:watch         # Watch mode for development

# Dual-environment integration tests (60% coverage each)
npm run test:integration           # Both Node.js and browser environments
npm run test:integration:node      # Node.js environment only
npm run test:integration:browser   # Browser/jsdom environment only

# Watch modes for development
npm run test:watch:integration:node     # Watch Node.js integration tests
npm run test:watch:integration:browser  # Watch browser integration tests

# Comprehensive testing
npm run test:all           # All tests (unit + integration)
npm run test:ci           # CI with full coverage reports
```

### Testing Benefits
- ✅ **Cross-Platform Validation** - Tests run in both Node.js and browser environments
- ✅ **Real API Testing** - Integration tests make actual API calls
- ✅ **Environment-Specific Validation** - Tests User-Agent headers, window objects, etc.
- ✅ **Fast Development Loop** - Unit tests provide immediate feedback
- ✅ **Comprehensive Coverage** - 102 total tests across all environments

## Best Practices

1. **Use Appropriate API Version**: Prefer V3 APIs for new features, use V2 for legacy compatibility
2. **Leverage TypeScript**: Use TypeScript interfaces for better development experience
3. **Handle Errors Properly**: Use specific error types for better error handling
4. **Choose Appropriate Format**: Use CX2 for new applications, CX1 for legacy compatibility
5. **Batch Operations**: Use batch methods for better performance when working with multiple items

## Performance Improvements

- **Connection Reuse**: Single HTTP client instance with connection pooling
- **Smart Caching**: Intelligent caching of authentication tokens
- **Batch Operations**: Improved batch operation support
- **Streaming**: Better support for large file uploads with progress tracking

This migration guide covers all major changes and provides the necessary mappings to successfully migrate from the legacy JavaScript implementation to the new TypeScript architecture.