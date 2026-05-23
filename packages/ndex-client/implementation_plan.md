# Implementation Plan

Modernize the NDEx JavaScript client library to follow current best practices, add TypeScript support, and provide comprehensive documentation and testing.

The current codebase is a functional REST API client but uses outdated patterns from ~2018-2019 era JavaScript development. This modernization will bring it up to 2024 standards while maintaining the core functionality and API compatibility where possible.

## [Overview]
Transform the legacy JavaScript NDEx client into a modern, type-safe, well-documented library.

This implementation addresses several critical modernization needs:
- **No TypeScript Support**: Currently pure JavaScript with no type definitions
- **Outdated Build System**: Uses Webpack 4-era configuration with babel-loader
- **Legacy Testing**: Mocha-based tests with 53% coverage and server dependency issues  
- **Monolithic Architecture**: Single 1100+ line NDEx.js class handling all functionality
- **Poor Developer Experience**: Limited documentation, no modern tooling, inconsistent code style
- **Missing Modern Features**: No ESM/CJS dual support, no async/await patterns, basic error handling

The modernization will introduce gradual TypeScript migration, Jest testing framework, modern build tools, improved architecture, and comprehensive documentation while maintaining backward compatibility where feasible. All new code will use modern async/await syntax instead of promise chaining for better readability and error handling.

## [Types]
Establish comprehensive TypeScript type definitions for the entire NDEx API surface.

**Core Interface Types:**
```typescript
interface NDExClientConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  auth?: BasicAuth | OAuthAuth;  // Simplified to 2 authentication options
}

interface BasicAuth {
  type: 'basic';
  username: string;
  password: string;
}

interface OAuthAuth {
  type: 'oauth';
  idToken: string;  // ID token from OAuth provider
}

interface CX1NetworkProperty {
  predicateString: string;
  dataType: string;
  value: any;
  subNetworkId?: string;
}

interface CX2NetworkProperties {
  [key: string]: {
    t: string;  // type
    v: any;     // value
  };
}

interface NetworkSummaryV2 {
  externalId: string;
  name: string;
  description?: string;
  nodeCount: number;
  edgeCount: number;
  visibility: 'PUBLIC' | 'PRIVATE';
  owner: string;
  ownerUUID: string;
  creationTime: number;
  modificationTime: number;
  version?: string;
  properties?: CX1NetworkProperty[];  // V2 uses CX1 array format
  isReadOnly: boolean;
  isValid: boolean;
  warnings?: string[];
  hasLayout: boolean;
  hasSample: boolean;
  
  // Additional attributes for both V2 and V3
  updatedBy: string;           // username who modified this network last
  errorMessage?: string;
  cxFormat?: string;
  cxFileSize?: number;         // File size in bytes
  cx2FileSize?: number;        // File size in bytes
  isShowcase?: boolean;
  isCompleted?: boolean;
  doi?: string;
  isCertified?: boolean;
  indexLevel?: NetworkIndexLevel;
  parentDirUUID?: string;
  showInTrash?: boolean;
}

interface NetworkSummaryV3 extends Omit<NetworkSummaryV2, 'properties'> {
  properties?: CX2NetworkProperties;  // V3 uses CX2 object/map format
  // V3-specific additional attributes can be added here as needed
}

enum NetworkIndexLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  FULL = 'FULL'
}

interface CXNetwork extends Array<CXAspect> {}

interface CXAspect {
  [aspectName: string]: any[];
}

interface CX2Network {
  // Core data structures
  attributeDeclarations: CX2AttributeDeclarations;
  networkAttributes: CX2NetworkProperties;
  nodes: Map<number, CX2Node>;
  edges: Map<number, CX2Edge>;
  visualProperties: CX2VisualProperties[];
  nodeBypasses: Map<number, CX2VisualProperties>;
  edgeBypasses: Map<number, CX2VisualProperties>;
  opaqueAspects: CX2OpaqueAspect[];
  status: CX2Status;

  // Network attribute methods
  getNetworkAttributes(): CX2NetworkProperties;
  setNetworkAttributes(attributes: CX2NetworkProperties): void;
  addNetworkAttribute(key: string, value: any, datatype?: string): void;
  removeNetworkAttribute(key: string): void;
  setName(name: string): void;
  getName(): string | undefined;

  // Node methods
  getNodes(): Map<number, CX2Node>;
  addNode(nodeId?: number, attributes?: Record<string, any>, x?: number, y?: number, z?: number): number;
  getNode(nodeId: number): CX2Node | undefined;
  lookupNodeIdByName(name: string): number | undefined;
  removeNode(nodeId: number): void;
  updateNode(nodeId: number, attributes?: Record<string, any>, x?: number, y?: number, z?: number): void;
  addNodeAttribute(nodeId: number, key: string, value: any, datatype?: string): void;
  removeNodeAttribute(nodeId: number, attributeName: string): void;

  // Edge methods
  getEdges(): Map<number, CX2Edge>;
  addEdge(edgeId?: number, source?: number, target?: number, attributes?: Record<string, any>): number;
  getEdge(edgeId: number): CX2Edge | undefined;
  removeEdge(edgeId: number): void;
  updateEdge(edgeId: number, attributes?: Record<string, any>): void;
  addEdgeAttribute(edgeId: number, key: string, value: any, datatype?: string): void;
  removeEdgeAttribute(edgeId: number, attributeName: string): void;

  // Visual properties methods
  getVisualProperties(): CX2VisualProperties[];
  setVisualProperties(value: CX2VisualProperties[]): void;
  getNodeBypasses(): Map<number, CX2VisualProperties>;
  addNodeBypass(nodeId: number, value: CX2VisualProperties): void;
  getEdgeBypasses(): Map<number, CX2VisualProperties>;
  addEdgeBypass(edgeId: number, value: CX2VisualProperties): void;

  // Utility methods
  getAttributeDeclarations(): CX2AttributeDeclarations;
  setAttributeDeclarations(value: CX2AttributeDeclarations): void;
  getDeclaredType(aspectName: string, attributeName: string, attributeValue?: any): string;
  getAlias(aspectName: string, attributeName: string): string | undefined;
  getDefaultValue(aspectName: string, attributeName: string): any;
  renameAttribute(aspect: string, oldKey: string, newKey: string): void;

  // Opaque aspects
  getOpaqueAspects(): CX2OpaqueAspect[];
  setOpaqueAspects(value: CX2OpaqueAspect[]): void;
  getOpaqueAspect(aspectName: string): any;
  setOpaqueAspect(aspectName: string, value: any): void;
  addOpaqueAspect(aspect: CX2OpaqueAspect): void;

  // Status
  getStatus(): CX2Status;
  setStatus(value: CX2Status): void;

  // Serialization
  createFromRawCX2(cx2Data: any[] | string): void;
  writeAsRawCX2(outputPath: string): void;
  toCX2(): any[];
}

interface CX2AttributeDeclarations {
  [aspectName: string]: {
    [attributeName: string]: {
      d: string;  // datatype
      a?: string; // alias
      v?: any;    // default value
    };
  };
}

interface CX2Node {
  id: number;
  v?: Record<string, any>;  // attribute values
  x?: number;               // layout x coordinate
  y?: number;               // layout y coordinate  
  z?: number;               // layout z coordinate
}

interface CX2Edge {
  id: number;
  s: number;                // source node id
  t: number;                // target node id
  v?: Record<string, any>;  // attribute values
}

interface CX2VisualProperties {
  [property: string]: any;
}

interface CX2OpaqueAspect {
  [aspectName: string]: any;
}

interface CX2Status {
  error?: string;
  success?: boolean;
  [key: string]: any;
}

// CX2 Data type constants
enum CX2DataType {
  STRING = 'string',
  INTEGER = 'integer', 
  LONG = 'long',
  DOUBLE = 'double',
  BOOLEAN = 'boolean',
  LIST_OF_STRING = 'list_of_string',
  LIST_OF_INTEGER = 'list_of_integer',
  LIST_OF_LONG = 'list_of_long', 
  LIST_OF_DOUBLE = 'list_of_double',
  LIST_OF_BOOLEAN = 'list_of_boolean'
}

// Factory interfaces for creating CX2Networks
interface CX2NetworkFactory {
  getCX2Network(inputData?: any): CX2Network;
}

interface RawCX2NetworkFactory extends CX2NetworkFactory {
  getCX2Network(inputData: any[] | string): CX2Network;
}

interface CXToCX2NetworkFactory extends CX2NetworkFactory {
  getCX2Network(inputData: CXNetwork | string): CX2Network;
}

interface SearchResult<T> {
  numFound: number;
  resultList?: T[];
  networks?: T[];
  start: number;
  size: number;
}

interface APIResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

interface NDExError {
  message: string;
  errorCode?: string;
  details?: any;
}
```

**Service Interface Types:**
```typescript
// Version-specific interfaces
interface NetworkServiceV2 {
  create(cx: CXNetwork, options?: CreateNetworkOptions): Promise<string>;
  get(uuid: string, accessKey?: string): Promise<CXNetwork>;
  getSummary(uuid: string, accessKey?: string): Promise<NetworkSummaryV2>;
  update(uuid: string, cx: CXNetwork): Promise<void>;
  delete(uuid: string): Promise<void>;
  setSystemProperty(uuid: string, properties: SystemProperties): Promise<void>;
  batchGetSummaries(uuids: string[], accessKey?: string): Promise<NetworkSummaryV2[]>;
}

interface NetworkServiceV3 {
  create(cx2: CX2Network, options?: CreateNetworkOptions): Promise<string>;
  get(uuid: string, accessKey?: string): Promise<CX2Network>;
  getSummary(uuid: string, accessKey?: string, format?: SummaryFormat): Promise<NetworkSummaryV3>;
  update(uuid: string, cx2: CX2Network): Promise<void>;
  delete(uuid: string): Promise<void>;
  copy(uuid: string): Promise<string>;
  getAspects(uuid: string): Promise<AspectMetadata[]>;
  getAspectElements(uuid: string, aspectName: string, options?: AspectOptions): Promise<any[]>;
  batchGetSummaries(uuids: string[], accessKey?: string, format?: SummaryFormat): Promise<NetworkSummaryV3[]>;
}

// Unified service with intelligent version routing
interface NetworkService {
  create(data: CXNetwork | CX2Network, options?: CreateNetworkOptions): Promise<string>;
  get(uuid: string, accessKey?: string, format?: 'cx' | 'cx2'): Promise<CXNetwork | CX2Network>;
  getSummary(uuid: string, accessKey?: string, format?: SummaryFormat): Promise<NetworkSummaryV2 | NetworkSummaryV3>;
  update(uuid: string, data: CXNetwork | CX2Network): Promise<void>;
  delete(uuid: string): Promise<void>;
  clone(uuid: string): Promise<string>;
  batchGetSummaries(uuids: string[], options?: BatchSummaryOptions): Promise<(NetworkSummaryV2 | NetworkSummaryV3)[]>;
}

// V3-specific services not available in V2
interface FilesService {
  getFolders(options?: PaginationOptions): Promise<Folder[]>;
  createFolder(name: string, parentId?: string): Promise<string>;
  moveNetworks(networkIds: string[], folderId: string): Promise<void>;
  share(files: ShareableFiles): Promise<void>;
  unshare(files: ShareableFiles): Promise<void>;
}

interface WorkspaceService {
  create(workspace: WorkspaceData): Promise<string>;
  get(workspaceId: string): Promise<Workspace>;
  update(workspaceId: string, workspace: Partial<WorkspaceData>): Promise<void>;
  delete(workspaceId: string): Promise<void>;
  getUserWorkspaces(): Promise<Workspace[]>;
}

interface SearchService {
  networks(query: NetworkSearchQuery): Promise<SearchResult<NetworkSummary>>;
  users(query: UserSearchQuery): Promise<SearchResult<User>>;
  groups(query: GroupSearchQuery): Promise<SearchResult<Group>>;
}

interface UserService {
  getCurrent(): Promise<User>;
  getById(uuid: string): Promise<User>;
  getNetworks(uuid: string, options?: PaginationOptions): Promise<NetworkSummary[]>;
}
```

## [Files]
Implement modern project structure with TypeScript support and updated tooling.

**New Files to Create:**
- `tsconfig.json` - TypeScript configuration with strict mode
- `jest.config.js` - Jest testing framework configuration  
- `tsup.config.ts` - Modern build system replacing Webpack
- `src/types/` - Directory for TypeScript type definitions
  - `src/types/api.ts` - API response types
  - `src/types/client.ts` - Client configuration types
  - `src/types/cx.ts` - CX1 network format types
  - `src/types/cx2.ts` - CX2 network format types
- `src/services/` - Directory for service abstractions
  - `src/services/base/` - Base service classes
    - `src/services/base/BaseService.ts` - Common service functionality
  - `src/services/v2/` - V2 API services
    - `src/services/v2/NetworkServiceV2.ts` - V2 network operations
    - `src/services/v2/SearchServiceV2.ts` - V2 search functionality
    - `src/services/v2/UserServiceV2.ts` - V2 user operations
  - `src/services/v3/` - V3 API services
    - `src/services/v3/NetworkServiceV3.ts` - V3 network operations  
    - `src/services/v3/FilesService.ts` - V3 files and folders
    - `src/services/v3/WorkspaceService.ts` - V3 workspace management
  - `src/services/unified/` - Version-agnostic services
    - `src/services/unified/NetworkService.ts` - Intelligent version routing
    - `src/services/unified/SearchService.ts` - Unified search interface
    - `src/services/unified/UserService.ts` - Unified user interface
- `src/cx2/` - Directory for CX2 network format support
  - `src/cx2/CX2Network.ts` - Main CX2Network class implementation
  - `src/cx2/CX2NetworkFactory.ts` - Base factory for creating CX2Networks
  - `src/cx2/RawCX2NetworkFactory.ts` - Factory for creating from raw CX2 data
  - `src/cx2/CXToCX2NetworkFactory.ts` - Factory for converting CX1 to CX2
  - `src/cx2/utils.ts` - CX2 utility functions and validation
- `src/utils/` - Directory for utility functions
  - `src/utils/http.ts` - HTTP client utilities
  - `src/utils/auth.ts` - Authentication helpers
  - `src/utils/errors.ts` - Error handling utilities
- `src/index.ts` - New TypeScript entry point
- `docs/` - Directory for Docusaurus documentation site
  - `docs/intro.md` - Getting started guide
  - `docs/installation.md` - Installation instructions
  - `docs/authentication.md` - Authentication examples
  - `docs/api/` - TypeDoc generated API reference
  - `docs/examples/` - Usage examples and tutorials
  - `docs/migration-guide.md` - Breaking changes guide
- `docusaurus.config.js` - Docusaurus configuration
- `sidebars.js` - Documentation navigation structure
- `.changeset/` - Directory for changeset management
- `examples/typescript/` - TypeScript usage examples

**Files to Modify:**
- `package.json` - Update dependencies, scripts, and package configuration
- `.eslintrc` → `.eslintrc.js` - Modernize ESLint configuration for TypeScript
- `babel.config.json` - Update Babel configuration for TypeScript
- `README.md` - Complete rewrite with modern usage examples
- `src/NDEx.js` → gradual migration to `src/NDEx.ts`
- `src/CyNDEx.js` → `src/CyNDEx.ts`

**Files to Delete:**
- `webpack.config.js` - Replace with tsup
- `jsdoc.json` - Replace with Docusaurus
- `dist/` - Remove build artifacts from version control
- `.travis.yml` - Replace with GitHub Actions

**Configuration Updates:**
- `.gitignore` - Add TypeScript build outputs, modern IDE files
- `.nvmrc` - Update to Node 16+
- Add `.prettierignore`, `.vscode/settings.json`

## [Functions]
Refactor monolithic class into service-oriented architecture with modern patterns.

**New Functions by Version:**

**NetworkServiceV2:**
- `async createFromCX(cx: CXNetwork, options?: CreateOptions): Promise<string>`
- `async getRawNetwork(uuid: string, accessKey?: string): Promise<CXNetwork>`
- `async getNetworkSummary(uuid: string, accessKey?: string): Promise<NetworkSummaryV2>`
- `async updateNetworkProfile(uuid: string, profile: NetworkProfile): Promise<void>`
- `async setNetworkSystemProperty(uuid: string, properties: SystemProperties): Promise<void>`
- `async batchGetNetworkSummaries(uuids: string[], accessKey?: string): Promise<NetworkSummaryV2[]>`

**NetworkServiceV3:**
- `async createFromCX2(cx2: CX2Network, options?: CreateOptions): Promise<string>`
- `async getCX2Network(uuid: string, accessKey?: string): Promise<CX2Network>`
- `async getNetworkV3Summary(uuid: string, accessKey?: string, format?: SummaryFormat): Promise<NetworkSummaryV3>`
- `async copyNetwork(uuid: string): Promise<string>`
- `async getCX2MetaData(uuid: string, accessKey?: string): Promise<AspectMetadata[]>`
- `async getAspectElements(uuid: string, aspectName: string, options?: AspectOptions): Promise<any[]>`
- `async batchGetNetworkSummaries(uuids: string[], accessKey?: string, format?: SummaryFormat): Promise<NetworkSummaryV3[]>`

**Unified NetworkService (Smart Routing):**
- `async create(data: CXNetwork | CX2Network, options?: CreateOptions): Promise<string>` - Routes to appropriate version
- `async get(uuid: string, format?: 'cx' | 'cx2'): Promise<CXNetwork | CX2Network>` - Returns requested format
- `async getSummary(uuid: string, options?: SummaryOptions): Promise<NetworkSummaryV2 | NetworkSummaryV3>` - Returns version-specific summary
- `async batchGetSummaries(uuids: string[], options?: BatchSummaryOptions): Promise<(NetworkSummaryV2 | NetworkSummaryV3)[]>` - Intelligent version routing
- `async validateNetwork(data: CXNetwork | CX2Network): Promise<ValidationResult>` - Format-aware validation

**New Functions in SearchService:**
- `async searchNetworks(query: NetworkSearchQuery): Promise<SearchResult<NetworkSummary>>`
- `async neighborhoodQuery(networkId: string, params: NeighborhoodParams): Promise<CXNetwork>`
- `async interconnectQuery(networkId: string, params: InterconnectParams): Promise<CXNetwork>`

**Modified Functions in NDEx class:**
- `constructor(config: NDExClientConfig)` - Accept typed configuration object
- `async authenticate(auth: AuthConfig): Promise<void>` - Unified authentication
- `setRequestInterceptor(interceptor: RequestInterceptor): void` - Add request middleware
- `setResponseInterceptor(interceptor: ResponseInterceptor): void` - Add response middleware

**New Utility Functions:**
- `createHTTPClient(config: ClientConfig): AxiosInstance`
- `handleAPIError(error: AxiosError): NDExError`
- `validateNetworkId(uuid: string): boolean`
- `formatSearchQuery(query: string): string`
- `retryWithBackoff<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T>`

**Deprecated Functions (maintain with warnings):**
- All existing functions in NDEx.js will be maintained but marked as deprecated
- Add `@deprecated` JSDoc tags with migration guidance
- Provide wrapper implementations that delegate to new service methods

## [Classes]
Modernize class architecture with proper separation of concerns and TypeScript.

**New Classes:**

`NDExClient` - Main client class with version namespace organization:
```typescript
class NDExClient {
  private http: HTTPService;
  private auth: AuthService;
  
  // Version-specific namespaces
  public readonly v2: {
    networks: NetworkServiceV2;
    search: SearchServiceV2;
    users: UserServiceV2;
  };
  
  public readonly v3: {
    networks: NetworkServiceV3;
    files: FilesService;
    workspaces: WorkspaceService;
  };
  
  // Default/preferred version (v3 where available, v2 fallback)
  public readonly networks: NetworkService; // Intelligent routing
  public readonly search: SearchService;
  public readonly users: UserService;
  
  constructor(config: NDExClientConfig);
  async authenticate(auth: AuthConfig): Promise<void>;
}
```

`HTTPService` - Centralized HTTP handling with version support:
```typescript
class HTTPService {
  private clientV2: AxiosInstance;
  private clientV3: AxiosInstance;
  
  constructor(config: HTTPConfig);
  async get<T>(url: string, params?: any, version?: 'v2' | 'v3'): Promise<APIResponse<T>>;
  async post<T>(url: string, data?: any, version?: 'v2' | 'v3'): Promise<APIResponse<T>>;
  setInterceptors(interceptors: InterceptorConfig): void;
  private getClient(version: 'v2' | 'v3'): AxiosInstance;
}
```

`AuthService` - Authentication management:
```typescript
class AuthService {
  private currentAuth?: AuthConfig;
  
  setBasicAuth(username: string, password: string): void;
  setOAuthAuth(idToken: string): void;
  getAuthHeaders(): Record<string, string>;
  getCurrentAuth(): BasicAuth | OAuthAuth | undefined;
}
```

**Modified Classes:**

`NDEx` class - Gradual TypeScript migration:
- Add TypeScript types for all method parameters and return values
- Maintain existing method signatures for backward compatibility
- Add deprecation warnings for methods being moved to services
- Implement wrapper methods that delegate to new service classes

`CyNDEx` class - Convert to TypeScript:
- Add proper typing for Cytoscape integration
- Improve error handling with typed exceptions
- Add validation for Cytoscape REST API responses

## [Dependencies]
Update to modern, actively maintained dependencies with security improvements.

**Add Dependencies:**
```json
{
  "typescript": "^5.3.0",
  "@types/node": "^20.10.0"
}
```

**Add DevDependencies:**
```json
{
  "tsup": "^8.0.0",
  "terser": "^5.24.0",
  "jest": "^29.7.0",
  "@types/jest": "^29.5.0",
  "ts-jest": "^29.1.0",
  "@typescript-eslint/eslint-plugin": "^6.13.0",
  "@typescript-eslint/parser": "^6.13.0",
  "prettier": "^3.1.0",
  "@docusaurus/core": "^3.0.0",
  "@docusaurus/preset-classic": "^3.0.0",
  "typedoc": "^0.25.0",
  "typedoc-plugin-markdown": "^3.17.0",
  "@changesets/cli": "^2.27.0",
  "lint-staged": "^15.2.0",
  "husky": "^8.0.0"
}
```

**Update Dependencies:**
- `axios`: Update to latest version (^1.6.8 → ^1.11.0) with migration considerations addressed
- Remove `babel-eslint` (deprecated)  
- Remove `nyc` (replace with Jest coverage)

**Build System Modernization:**
- **Replace Webpack with tsup** for optimal library bundling and simplicity
- **Bundle Optimization**: Achieve ~40-45% smaller bundles while keeping axios as dependency
- **Multiple Output Formats**: ESM, CJS, and UMD builds with TypeScript declarations
- **Fast Build Times**: 5x faster builds compared to current Webpack setup

**Expected Bundle Sizes with tsup:**
- **ESM build**: ~23-25KB gzipped (modern bundlers, tree-shakable)
- **CJS build**: ~25-27KB gzipped (Node.js compatibility)  
- **UMD build**: ~27-30KB gzipped (browser standalone with axios)
- **vs Current Webpack**: 40-45% smaller bundles overall

**Build Configuration:**
```typescript
// tsup.config.ts
export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    minify: 'terser',
    clean: true,
    outDir: 'dist'
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'NDExClient',
    minify: 'terser',
    outDir: 'dist',
    outExtension: () => ({ js: '.umd.js' })
  }
])
```

**Axios Migration Considerations (1.6.8 → 1.11.0):**

The upgrade from axios 1.6.8 to 1.11.0 introduces one potentially breaking change that affects this codebase:

**Breaking Change in v1.8.0: `allowAbsoluteUrls` Configuration**
- **Issue**: When both `baseURL` and absolute URLs are used, axios now combines them instead of preferring the absolute URL
- **NDEx Impact**: The current codebase pattern sets `baseURL` to full URLs (e.g., `https://ndexbio.org/v2`) and uses relative paths, which should work correctly
- **Mitigation**: Add explicit `allowAbsoluteUrls: false` to axios configuration to maintain current behavior
- **Testing**: Verify all URL construction patterns work correctly with the new axios version

**Other Notable Changes:**
- **v1.9.0**: Improved error handling and header management (beneficial)
- **v1.10.0**: Enhanced React Native support and fetch options (neutral impact)
- **v1.11.0**: Fixed TypeScript declaration files and large buffer handling (beneficial)

**Migration Actions Required:**
```typescript
// Add to HTTP client configuration
const axiosConfig = {
  baseURL: this._host,
  allowAbsoluteUrls: false,  // Maintain legacy URL handling behavior
  timeout: this.timeout,
  // ... other config
};
```

**Testing Priority:**
1. **URL Construction**: Verify all API endpoints resolve correctly
2. **Authentication Headers**: Ensure auth headers are properly set
3. **Error Handling**: Test error response transformation
4. **File Uploads**: Verify FormData handling (improved in 1.11.0)
5. **TypeScript Integration**: Validate type declarations work correctly

**HTTP Client Library Recommendation:**
We recommend staying with **axios** for the following reasons:
- **Lower Migration Risk**: Existing codebase already uses axios with established patterns
- **Feature Completeness**: NDEx requires request/response interceptors, retry logic, timeout handling, and error transformation - axios provides all these out-of-the-box
- **Universal Compatibility**: Works consistently in both Node.js and browser environments
- **Excellent TypeScript Support**: Comprehensive type definitions and generic support
- **Production Proven**: Mature, stable, and widely adopted in enterprise environments
- **Rich Ecosystem**: Extensive middleware and plugin ecosystem

**Alternative Considerations:**
If bundle size becomes a critical concern, **ky** (~3kb vs axios ~13kb) could be considered as it offers:
- Modern fetch-based API with similar feature set
- Excellent TypeScript support
- Universal Node.js/browser compatibility
- However, would require significant migration effort and testing

For this modernization, the benefits of staying with axios (stability, feature completeness, lower risk) outweigh the bundle size savings of switching to a different library.

**Modern Async/Await Syntax Adoption:**
All new code will use async/await syntax instead of promise chaining (.then/.catch) for several key advantages:

**Benefits of async/await over Promises:**
- **Better Readability**: Code reads more like synchronous code, making it easier to understand
- **Improved Error Handling**: Single try/catch block handles all errors in the async function
- **Easier Debugging**: Stack traces are cleaner and more meaningful
- **Reduced Callback Hell**: No more deeply nested .then() chains
- **Better IDE Support**: Enhanced autocomplete and refactoring capabilities
- **Consistent Error Propagation**: Errors naturally bubble up through the call stack

**Example Comparison:**
```typescript
// Old Promise-based approach
function getNetworkData(uuid: string): Promise<NetworkSummary> {
  return this.http.get(`/networks/${uuid}`)
    .then(response => response.data)
    .then(network => this.transformNetwork(network))
    .then(transformed => this.validateNetwork(transformed))
    .catch(error => {
      if (error.response?.status === 404) {
        throw new NDExError('Network not found');
      }
      throw this.handleAPIError(error);
    });
}

// Modern async/await approach
async getNetworkData(uuid: string): Promise<NetworkSummary> {
  try {
    const response = await this.http.get(`/networks/${uuid}`);
    const network = await this.transformNetwork(response.data);
    const validated = await this.validateNetwork(network);
    return validated;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new NDExError('Network not found');
    }
    throw this.handleAPIError(error);
  }
}
```

The async/await version is more readable, has cleaner error handling, and is easier to maintain. All unit tests and examples will follow this modern pattern.

**Remove Dependencies:**
- `webpack` and related packages
- `mocha` and `chai`
- `babel-plugin-istanbul`

## [Testing]
Migrate to Jest framework with comprehensive test coverage and modern patterns. Tests are separated into fast-running mock-based unit tests and slower integration tests for optimal development workflow.

**Test Structure Separation:**
```
__tests__/
├── unit/                     # Fast mock-based unit tests
│   ├── services/
│   ├── utils/
│   ├── cx2/
│   └── mocks/               # Shared mock utilities
├── integration/             # Slower end-to-end integration tests
│   ├── api/
│   ├── workflows/
│   └── setup/               # Integration test setup
└── shared/                  # Shared test utilities
    └── testHelpers.ts
```

**Separate Test Commands:**
```json
{
  "scripts": {
    "test": "npm run test:unit",              // Default: run fast unit tests
    "test:unit": "jest --config jest.unit.config.js",
    "test:integration": "jest --config jest.integration.config.js", 
    "test:all": "npm run test:unit && npm run test:integration",
    "test:watch": "npm run test:unit -- --watch",
    "test:ci": "npm run test:all -- --coverage"
  }
}
```

**Migration Strategy:**
- Convert `test/*.spec.js` → `__tests__/unit/*.test.ts` (mock-based)
- Create `__tests__/integration/*.test.ts` (real API calls)
- Replace Mocha/Chai syntax with Jest
- Add comprehensive mocking utilities for unit tests
- Use MSW for realistic HTTP mocking in integration tests

**Pragmatic Unit Test Coverage (First Release):**
Focus on essential test coverage with emphasis on success paths:
- **Success Path Priority**: Comprehensive testing of normal operation flows
- **Core Error Scenarios**: Critical error handling (network failures, authentication errors)
- **API Contract Validation**: Ensure proper API calls with correct parameters
- **Type Safety**: Basic parameter validation and response structure verification
- **Coverage Target**: 70% line coverage focused on critical functionality

**Service-Specific Test Files:**
```typescript
// __tests__/services/v2/NetworkServiceV2.test.ts
describe('NetworkServiceV2', () => {
  describe('createFromCX', () => {
    it('should create network successfully with valid CX data', async () => {
      // Test happy path
    });
    
    it('should handle API errors gracefully', async () => {
      // Test error scenarios
    });
    
    it('should validate CX network format', async () => {
      // Test input validation
    });
  });
  
  describe('getRawNetwork', () => {
    it('should fetch network by UUID', async () => {
      // Test retrieval
    });
    
    it('should handle access key authentication', async () => {
      // Test auth scenarios
    });
  });
  
  // Additional tests for each method...
});

// __tests__/services/v3/NetworkServiceV3.test.ts
describe('NetworkServiceV3', () => {
  describe('createFromCX2', () => {
    it('should create network with CX2 format', async () => {
      // Test CX2 creation
    });
    
    it('should validate CX2 network structure', async () => {
      // Test validation
    });
  });
  
  describe('copyNetwork', () => {
    it('should copy existing network successfully', async () => {
      // Test network copying
    });
    
    it('should handle permissions errors', async () => {
      // Test error handling
    });
  });
  
  // Additional tests for V3-specific methods...
});

// __tests__/services/v3/FilesService.test.ts
describe('FilesService', () => {
  describe('getFolders', () => {
    it('should retrieve folders with pagination', async () => {
      // Test folder retrieval
    });
  });
  
  describe('createFolder', () => {
    it('should create folder with valid name', async () => {
      // Test folder creation
    });
    
    it('should validate folder name requirements', async () => {
      // Test validation
    });
  });
  
  // Tests for all FilesService methods...
});

// __tests__/services/v3/WorkspaceService.test.ts
describe('WorkspaceService', () => {
  describe('create', () => {
    it('should create workspace with valid data', async () => {
      // Test workspace creation
    });
  });
  
  describe('getUserWorkspaces', () => {
    it('should retrieve user workspaces', async () => {
      // Test workspace retrieval
    });
  });
  
  // Tests for all WorkspaceService methods...
});

// __tests__/services/unified/NetworkService.test.ts
describe('NetworkService (Unified)', () => {
  describe('create', () => {
    it('should route CX data to V2 service', async () => {
      // Test V2 routing
    });
    
    it('should route CX2 data to V3 service', async () => {
      // Test V3 routing
    });
  });
  
  describe('get', () => {
    it('should return CX format when requested', async () => {
      // Test format-specific retrieval
    });
    
    it('should return CX2 format when requested', async () => {
      // Test format-specific retrieval
    });
  });
  
  // Tests for intelligent routing logic...
});
```

**Utility Function Tests:**
```typescript
// __tests__/utils/http.test.ts
describe('HTTP Utilities', () => {
  describe('createHTTPClient', () => {
    it('should create axios instance with correct config', () => {
      // Test client creation
    });
  });
  
  describe('handleAPIError', () => {
    it('should transform axios errors to NDEx errors', () => {
      // Test error transformation
    });
  });
});

// __tests__/utils/auth.test.ts
describe('Auth Utilities', () => {
  describe('AuthService', () => {
    it('should set basic auth headers correctly', () => {
      // Test basic auth
    });
    
    it('should set OAuth headers correctly', () => {
      // Test OAuth
    });
  });
});

// __tests__/utils/errors.test.ts
describe('Error Utilities', () => {
  describe('validateNetworkId', () => {
    it('should validate UUID format', () => {
      // Test UUID validation
    });
  });
  
  describe('retryWithBackoff', () => {
    it('should retry failed requests with backoff', async () => {
      // Test retry logic
    });
  });
});
```

**CX2 Network Tests:**
```typescript
// __tests__/cx2/CX2Network.test.ts
describe('CX2Network', () => {
  describe('addNode', () => {
    it('should add node with attributes', () => {
      // Test node addition
    });
    
    it('should generate unique node IDs', () => {
      // Test ID generation
    });
  });
  
  describe('addEdge', () => {
    it('should add edge between existing nodes', () => {
      // Test edge creation
    });
    
    it('should validate source/target nodes exist', () => {
      // Test validation
    });
  });
  
  // Tests for all CX2Network methods...
});

// __tests__/cx2/factories/RawCX2NetworkFactory.test.ts
describe('RawCX2NetworkFactory', () => {
  describe('getCX2Network', () => {
    it('should create CX2Network from raw data', () => {
      // Test factory creation
    });
    
    it('should handle malformed CX2 data', () => {
      // Test error handling
    });
  });
});
```

**Integration Test Skeleton:**
Create basic integration test structure for essential workflows that can be expanded in future releases. Focus on framework setup and key success paths rather than comprehensive testing.

**Integration Testing Strategy (Skeleton Approach):**
```typescript
// __tests__/integration/NDExClient.test.ts
describe('NDExClient Integration Tests', () => {
  beforeAll(async () => {
    // Set up test server or mock service worker
  });

  describe('Authentication Flow', () => {
    it('should authenticate with basic auth and make API calls', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      await client.authenticate({ type: 'basic', username: 'test', password: 'test' });
      
      // Test actual API call
      const networks = await client.networks.batchGetSummaries(['uuid1', 'uuid2']);
      expect(networks).toBeDefined();
    });

    it('should handle OAuth authentication flow', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      await client.authenticate({ type: 'oauth', idToken: 'test-token' });
      
      // Test authenticated requests
      const userInfo = await client.users.getCurrent();
      expect(userInfo).toBeDefined();
    });
  });

  describe('Full Workflow Integration', () => {
    it('should perform complete network lifecycle', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      
      // Authenticate
      await client.authenticate({ type: 'basic', username: 'test', password: 'test' });
      
      // Create network
      const networkId = await client.networks.create(mockCXNetwork());
      expect(networkId).toBeDefined();
      
      // Get network
      const retrievedNetwork = await client.networks.get(networkId);
      expect(retrievedNetwork).toBeDefined();
      
      // Update network
      await client.networks.update(networkId, mockCXNetwork());
      
      // Delete network
      await client.networks.delete(networkId);
    });

    it('should handle version fallbacks correctly', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      
      // Test V3 -> V2 fallback when V3 is unavailable
      const summary = await client.networks.getSummary('test-uuid');
      expect(summary).toBeDefined();
    });
  });

  describe('Service Integration', () => {
    it('should test V2/V3 service integration', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      
      // Test V2 specific functionality
      const v2Summary = await client.v2.networks.getSummary('test-uuid');
      expect(v2Summary.properties).toBeInstanceOf(Array); // CX1 format
      
      // Test V3 specific functionality  
      const v3Summary = await client.v3.networks.getSummary('test-uuid');
      expect(v3Summary.properties).toBeInstanceOf(Object); // CX2 format
    });

    it('should test Files service integration', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      await client.authenticate({ type: 'basic', username: 'test', password: 'test' });
      
      // Test folder operations
      const folderId = await client.files.createFolder('Test Folder');
      const folders = await client.files.getFolders();
      expect(folders).toContainEqual(expect.objectContaining({ id: folderId }));
      
      // Test network organization
      await client.files.moveNetworks(['network-uuid'], folderId);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle network timeouts gracefully', async () => {
      const client = new NDExClient({ 
        host: 'https://test.ndexbio.org',
        timeout: 100 // Very short timeout
      });
      
      await expect(client.networks.get('test-uuid')).rejects.toThrow('timeout');
    });

    it('should handle API rate limiting', async () => {
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      
      // Make rapid requests to trigger rate limiting
      const requests = Array(10).fill(null).map(() => 
        client.networks.getSummary('test-uuid')
      );
      
      // Some should succeed, others should handle rate limiting
      const results = await Promise.allSettled(requests);
      expect(results.some(r => r.status === 'fulfilled')).toBe(true);
    });
  });

  describe('Data Format Integration', () => {
    it('should handle CX1 to CX2 conversion', async () => {
      const factory = new CXToCX2NetworkFactory();
      const cx1Network = mockCXNetwork();
      const cx2Network = await factory.getCX2Network(cx1Network);
      
      expect(cx2Network.nodes).toBeInstanceOf(Map);
      expect(cx2Network.edges).toBeInstanceOf(Map);
    });

    it('should validate large network processing', async () => {
      const largeNetwork = createLargeTestNetwork(1000, 2000); // 1k nodes, 2k edges
      const client = new NDExClient({ host: 'https://test.ndexbio.org' });
      
      await client.authenticate({ type: 'basic', username: 'test', password: 'test' });
      const networkId = await client.networks.create(largeNetwork);
      
      expect(networkId).toBeDefined();
      
      // Clean up
      await client.networks.delete(networkId);
    });
  });
});
```

**Integration Testing Tools & Libraries:**

**Core Framework (Already Using Jest):**
- **Jest**: Primary test runner - handles both unit and integration tests perfectly
- **@types/jest**: TypeScript support for Jest

**HTTP Testing Libraries:**
```json
{
  "msw": "^2.0.0",              // Mock Service Worker for API mocking
  "@types/supertest": "^2.0.0", // HTTP assertion library types
  "nock": "^13.4.0"             // HTTP request mocking (alternative to MSW)
}
```

**Centralized Integration Test Configuration:**
```typescript
// __tests__/integration/config/testConfig.ts
export interface IntegrationTestConfig {
  baseURL: string;
  credentials: {
    username: string;
    password: string;
  };
  oauth?: {
    idToken: string;
  };
  timeout: number;
}

// Centralized test configuration - single place to manage test environment settings
export const integrationConfig: IntegrationTestConfig = {
  baseURL: process.env.NDEX_TEST_BASE_URL || 'https://test.ndexbio.org',
  credentials: {
    username: process.env.NDEX_TEST_USERNAME || 'test-user',
    password: process.env.NDEX_TEST_PASSWORD || 'test-password'
  },
  oauth: {
    idToken: process.env.NDEX_TEST_ID_TOKEN || 'mock-test-token'
  },
  timeout: parseInt(process.env.NDEX_TEST_TIMEOUT || '30000', 10)
};

// Helper function to create test client with consistent configuration
export const createIntegrationTestClient = (overrides?: Partial<NDExClientConfig>) => {
  return new NDExClient({
    baseURL: integrationConfig.baseURL,
    timeout: integrationConfig.timeout,
    ...overrides
  });
};

// Helper function to authenticate test client
export const authenticateTestClient = async (
  client: NDExClient, 
  authType: 'basic' | 'oauth' = 'basic'
) => {
  if (authType === 'basic') {
    await client.authenticate({
      type: 'basic',
      username: integrationConfig.credentials.username,
      password: integrationConfig.credentials.password
    });
  } else {
    await client.authenticate({
      type: 'oauth',
      idToken: integrationConfig.oauth!.idToken
    });
  }
};
```

**Test Environment Setup:**
```typescript
// __tests__/integration/setup/integrationSetup.ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { integrationConfig } from '../config/testConfig';

// Mock server for integration tests using centralized config
export const server = setupServer(
  // Mock NDEx API endpoints using config baseURL
  http.get(`${integrationConfig.baseURL}/v2/networks/:uuid`, () => {
    return HttpResponse.json(mockNetworkSummaryV2());
  }),
  
  http.post(`${integrationConfig.baseURL}/v3/networks`, () => {
    return HttpResponse.json({ uuid: 'test-network-id' });
  }),
  
  http.get(`${integrationConfig.baseURL}/v3/user/current`, () => {
    return HttpResponse.json(mockUserProfile());
  })
);

// Setup and teardown
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Global test timeout using centralized config
jest.setTimeout(integrationConfig.timeout);
```

**Environment Variables Configuration:**
Create `.env.test` file for local development:
```bash
# Integration Test Configuration
NDEX_TEST_BASE_URL=https://test.ndexbio.org
NDEX_TEST_USERNAME=your-test-username
NDEX_TEST_PASSWORD=your-test-password
NDEX_TEST_ID_TOKEN=your-test-oauth-token
NDEX_TEST_TIMEOUT=30000
```

**Separate Test Configurations:**

**Unit Test Configuration (jest.unit.config.js):**
```typescript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/unit/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/shared/unitSetup.ts'],
  testTimeout: 10000, // Shorter timeout for unit tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

**Integration Test Configuration (jest.integration.config.js):**
```typescript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/integration/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/integration/setup/integrationSetup.ts'],
  testTimeout: 30000, // Longer timeout for integration tests
  maxConcurrency: 3,  // Limit concurrent integration tests to avoid API rate limits
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  coverageReporters: ['text-summary'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60, 
      lines: 60,
      statements: 60
    }
  }
};
```

**Development Workflow Benefits:**
- **Fast Development Loop**: `npm test` runs only unit tests (~2-5 seconds)
- **Quick Feedback**: Unit tests provide immediate feedback during development
- **Comprehensive Validation**: `npm run test:integration` for thorough end-to-end testing
- **CI/CD Optimization**: Run unit tests on every commit, integration tests on PR/merge
- **Watch Mode**: `npm run test:watch` for continuous unit test feedback during development

**Test Categories:**
1. **API Integration**: Test actual HTTP calls with mock server responses
2. **Service Integration**: Test interaction between multiple service classes
3. **Authentication Flow**: Test complete auth workflows including token refresh
4. **Data Pipeline**: Test data transformation from API response to client objects
5. **Error Scenarios**: Test network failures, timeouts, and API errors
6. **Performance**: Test with large datasets and concurrent operations

**Test Configuration:**
- Configure Jest with TypeScript support for both unit and integration tests
- Set up pragmatic test coverage thresholds (70% unit tests, 60% integration tests)
- **Integration Test Strategy**: Create skeleton tests for essential workflows to be expanded in future releases
- Use MSW (Mock Service Worker) for realistic HTTP mocking in integration tests
- Parallel test execution for faster CI/CD (with concurrency limits for integration tests)

**Mock Utilities:**
```typescript
// __tests__/utils/testHelpers.ts
export const mockNDExServer = {
  networks: mockNetworkEndpoints,
  users: mockUserEndpoints,
  search: mockSearchEndpoints,
  files: mockFilesEndpoints,
  workspaces: mockWorkspaceEndpoints
};

export const createTestClient = (config?: Partial<NDExClientConfig>) => {
  return new NDExClient({ host: 'test-server', ...config });
};

export const mockCXNetwork = (): CXNetwork => [
  { nodes: [{ id: 1, n: 'Node1' }] },
  { edges: [{ id: 1, s: 1, t: 2 }] }
];

export const mockCX2Network = (): CX2Network => {
  // Return mock CX2Network implementation
};
```

**Test Coverage Requirements (Pragmatic First Release):**
- **70% line coverage** for unit tests focusing on success paths
- **60% line coverage** for integration tests (skeleton implementation)
- **Success path priority** over comprehensive edge case testing
- **Essential error handling** coverage for critical scenarios
- **Integration test skeletons** for future expansion

## [Implementation Order]
Sequential steps to minimize disruption and ensure successful integration.

**Phase 1: Foundation Setup (Week 1)**
1. Add TypeScript configuration and build system
2. Update package.json with new dependencies
3. Configure ESLint, Prettier, and development tools
4. Set up Jest testing framework
5. Create basic type definitions for core interfaces

**Phase 2: Service Architecture (Week 2)**  
6. Create HTTPService with v2/v3 endpoint support and AuthService base classes
7. Implement CX2Network class and factory system for handling CX2 format
8. Implement version-specific services (NetworkServiceV2, NetworkServiceV3, FilesService, WorkspaceService)
9. Create unified services with intelligent version routing and feature detection
10. Add comprehensive error handling, retry logic, and version compatibility checks
11. Write unit tests for all service classes including CX2Network and version-specific behavior

**Phase 3: Client Integration (Week 3)**
11. Create new NDExClient class with service composition
12. Implement backward compatibility layer in existing NDEx class
13. Add request/response interceptors and middleware support
14. Migrate CyNDEx class to TypeScript
15. Update all existing tests to use Jest

**Phase 4: Documentation and Examples (Week 4)**
16. Set up Docusaurus documentation site with GitHub Pages deployment
17. Generate TypeScript API documentation with TypeDoc integration
18. Create comprehensive guides (installation, authentication, examples)
19. Add TypeScript example projects and tutorials
20. Set up changeset management for version control

**Phase 5: Publishing and Migration (Week 5)**
21. Publish beta version for testing
22. Create migration guide for existing users
23. Add deprecation warnings to old methods
24. Final security audit and dependency updates
25. Release stable version with breaking change documentation
