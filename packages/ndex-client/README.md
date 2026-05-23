# NDEx JavaScript Client

A TypeScript/JavaScript client library for the NDEx (Network Data Exchange) API.

## Features

- 🚀 **Multiple Formats** - ESM, CJS, and UMD builds
- 🔒 **Authentication** - Basic auth and OAuth support
- 🌐 **Version Support** - Compatible with NDEx API v2 and v3
- 📦 **Lightweight** - Optimized bundle sizes

## Installation

```bash
npm install @js4cytoscape/ndex-client
```

## Quick Start

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

// Create client
const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org',
  timeout: 30000
});

// Authenticate (optional for public operations)
import { AuthType } from 'ndex-client';

client.updateConfig({
  auth: {
    type: AuthType.BASIC,
    username: 'your-username',
    password: 'your-password'
  }
});

// Get server status
const status = await client.getServerStatus();
console.log('Server status:', status.data);

// Get current user (requires authentication)
const user = await client.user.getCurrentUser();
console.log('User:', user.data);
```

## Error Handling

All API errors are thrown as typed subclasses of `NDExError`:

| Class | Status codes | Default `errorCode` |
|---|---|---|
| `NDExAuthError` | 401, 403 | `'AUTH_ERROR'` |
| `NDExValidationError` | 400 | `'VALIDATION_ERROR'` |
| `NDExNotFoundError` | 404 | `'NOT_FOUND'` |
| `NDExServerError` | 500–504 | `'SERVER_ERROR'` |
| `NDExNetworkError` | — (no response) | `'NETWORK_ERROR'` |

The `errorCode` property always reflects the **server-supplied error code** from the
response body when one is present. This lets you distinguish NDEx-specific error
conditions without parsing the human-readable `message` string:

```typescript
} catch (error) {
  if (error instanceof NDExAuthError) {
    switch (error.errorCode) {
      case 'NDEx_User_Account_Not_Verified':
        // guide user to verify email
        break;
      case 'NDEx_Object_Not_Found_Exception':
        // no NDEx account for this identity
        break;
      default:
        // generic auth failure
    }
  }
}
```

When the server does not supply an error code, the class-specific fallback value
(`'AUTH_ERROR'`, `'NOT_FOUND'`, etc.) is used.

## Documentation

### Documentation Architecture

This project uses a **hybrid documentation architecture** that separates concerns for optimal user experience:

```
docs-root/
├── index.html                   # Main landing page with navigation
├── api/                         # TypeDoc HTML output (standalone)
│   ├── index.html               # API reference home
│   ├── classes/                 # Class documentation
│   ├── interfaces/              # Interface documentation
│   └── enums/                   # Enum documentation
├── guide/                       # Docusaurus site (user guides)
│   ├── docs/                    # Narrative documentation source
│   ├── build/                   # Built Docusaurus site
│   └── docusaurus.config.js    # Docusaurus configuration
└── assets/                      # Shared resources
```

**Key Benefits:**
- 🎯 **No MDX Escaping Issues** - TypeDoc generates clean HTML directly
- 🔧 **Independent Tools** - Each tool works in its optimal format
- 🚀 **Better Performance** - Static HTML for API docs, optimized React for guides
- 🛠️ **Easier Maintenance** - Tool updates don't break each other

### Local Development

#### Building Documentation

```bash
# Build complete documentation (API + user guides)
npm run docs:build

# Build only API reference (clean TypeDoc HTML)
npm run docs:api

# Build only user guides (Docusaurus)
npm run docs:site

# Clean all documentation build artifacts
npm run docs:clean
```

#### Serving Locally

```bash
# Option 1: Serve complete documentation site (recommended for testing)
cd docs-root && python3 -m http.server 8000
# Visit: http://localhost:8000/

# Option 2: Serve only Docusaurus in development mode
npm run docs:serve
# Visit: http://localhost:3000/ (Docusaurus dev server)
```

**Local Documentation URLs:**
- **Main Landing Page**: `http://localhost:8000/`
- **User Guides**: `http://localhost:8000/guide/build/` 
- **API Reference**: `http://localhost:8000/api/`

#### Development Workflow

```bash
# 1. Clean previous builds
npm run docs:clean

# 2. Generate API documentation
npm run docs:api

# 3. Build user guides with local API links
cd docs-root/guide && npm run build:local

# 4. Serve complete site for testing
cd .. && python3 -m http.server 8000
```

### GitHub Pages Deployment

Documentation is automatically deployed via GitHub Actions on pushes to `main` or `ndex3-major-refactor` branches.

**Live Documentation**: [https://cytoscape.org/js4cytoscape/ndex-client/](https://cytoscape.org/js4cytoscape/ndex-client/)

#### Deployment Workflow

1. **Package Detection** - Auto-detects packages with `docs-root/` directories
2. **API Documentation** - Generates clean TypeDoc HTML (no MDX processing needed)
3. **User Guides** - Builds Docusaurus with production API links
4. **Site Assembly** - Combines both into unified documentation site
5. **GitHub Pages** - Deploys to `gh-pages` branch

#### Environment-Aware Configuration

The system automatically uses the correct API reference URLs:
- **Local**: `http://localhost:8000/api/` 
- **Production**: `https://cytoscape.org/js4cytoscape/ndex-client/api/`

```javascript
// docs-root/guide/docusaurus.config.js
const isLocal = process.env.DOCUSAURUS_LOCAL === 'true';
const siteUrl = isLocal ? 'http://localhost:8000' : 'https://cytoscape.org';
const basePath = isLocal ? '' : '/js4cytoscape/ndex-client';
const apiUrl = `${siteUrl}${basePath}/api/`;
```

### Documentation Content Structure

- **Landing Page** (`docs-root/index.html`) - Professional overview with navigation
- **Getting Started** - Installation, authentication, first network (serves as Docusaurus home)
- **User Guides** - Working with networks, user management
- **Examples** - Code examples and integration patterns  
- **API Reference** - Complete TypeScript API documentation (TypeDoc HTML)

#### Online Documentation

- See the full [NDEx API documentation](https://home.ndexbio.org/using-the-ndex-server-api/)
- Try out the [NDEx API](http://openapi.ndextools.org/)

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure integration tests** (optional)
   ```bash
   # Create test/testconfig.js and set the NDEX_TEST_* environment variables
   # This is only needed if you want to run integration tests
   # Do not commit real credentials to GitHub
   ```

### Building

The library uses [tsup](https://tsup.egoist.dev/) for fast, modern bundling:

```bash
# Build for production
npm run build

# Build in watch mode during development  
npm run dev
```

**Build outputs:**
- `dist/index.js` - CommonJS build
- `dist/index.mjs` - ES Module build
- `dist/index.global.js` - UMD build for browsers
- `dist/index.d.ts` - TypeScript declarations

### Testing

The project uses a modern two-tier testing approach:

#### Unit Tests (Fast - Default)
```bash
# Run unit tests (default, ~0.5s)
npm test
# or
npm run test:unit

# Watch mode for development
npm run test:watch

# Unit tests with coverage
npm run test:coverage
```

**Unit tests:**
- ✅ Mock-based, isolated testing
- ✅ Fast execution for development feedback
- ✅ 70% coverage requirement
- ✅ Focus on business logic and error handling

#### Integration Tests (Dual Environment)
```bash
# Run integration tests in both environments (~2-3s)
npm run test:integration

# Run specific environments
npm run test:integration:node      # Node.js environment only
npm run test:integration:browser   # Browser/jsdom environment only

# Development with watch mode
npm run test:watch:integration:node     # Watch Node.js tests
npm run test:watch:integration:browser  # Watch browser tests

# Coverage for both environments
npm run test:coverage:integration

# Run all tests (unit + integration)
npm run test:all

# CI command with full coverage
npm run test:ci
```

**Integration tests:**
- ✅ **Dual Environment Testing** - Node.js and browser (jsdom) environments
- ✅ Real API calls to NDEx servers in both environments
- ✅ Uses credentials from `test/testconfig.js`
- ✅ Validates end-to-end functionality across environments
- ✅ 60% coverage requirement for each environment
- ✅ Environment-specific behavior validation (User-Agent headers, window object, etc.)

#### Test Configuration

Integration tests read their settings from `test/testconfig.js`. Keep real
credentials out of source control by loading them from environment variables.

Create `test/testconfig.js` with this structure:

```javascript
/**
 * Integration Test Configuration
 *
 * This file stores server connection details and credentials for integration
 * tests. Values are read from environment variables so credentials do not need
 * to be committed to GitHub.
 */
const integrationTestConfig = {
  // NDEx Server Configuration
  server: {
    baseURL: process.env.NDEX_TEST_BASE_URL || '',
    apiVersion: process.env.NDEX_TEST_API_VERSION || 'v2'
  },

  // Test Account Credentials
  testAccount: {
    username: process.env.NDEX_TEST_USERNAME || '',
    password: process.env.NDEX_TEST_PASSWORD || ''
  },

  // Test Timeouts and Limits
  timeouts: {
    default: 10000,
    longRunning: 30000
  },

  // Test Data Identifiers (for consistent test data across integration tests)
  testData: {
    publicNetworkId: process.env.NDEX_TEST_PUBLIC_NETWORK_ID || '',
    privateNetworkId: process.env.NDEX_TEST_PRIVATE_NETWORK_ID || ''
  }
};

// Legacy export for backward compatibility
const testAccount = integrationTestConfig.testAccount;

module.exports = {
  integrationTestConfig,
  testAccount  // Keep for backward compatibility
};
```

Before running integration tests, set the required environment variables:

```bash
export NDEX_TEST_BASE_URL="https://dev1.ndexbio.org"
export NDEX_TEST_USERNAME="your-test-username"
export NDEX_TEST_PASSWORD="your-test-password"
export NDEX_TEST_PUBLIC_NETWORK_ID="your-public-test-network-uuid"
export NDEX_TEST_PRIVATE_NETWORK_ID="your-private-test-network-uuid"

# Optional; defaults to v2
export NDEX_TEST_API_VERSION="v2"
```

The integration test helper in `__tests__/integration/config/testConfig.ts`
expects `integrationTestConfig.server.baseURL`,
`integrationTestConfig.testAccount`, `integrationTestConfig.timeouts.longRunning`,
and `integrationTestConfig.testData.publicNetworkId/privateNetworkId` to be
defined.

### Other Scripts

```bash
# Linting and formatting
npm run lint          # ESLint with auto-fix
npm run format        # Prettier formatting
npm run type-check    # TypeScript checking

# Documentation  
npm run docs:build    # Build complete documentation (API + narrative)
npm run docs:api      # Generate API reference only
npm run docs:serve    # Serve documentation locally
npm run docs:clean    # Clean documentation files

# Cleanup
npm run clean         # Remove dist and coverage folders
```

### Development Workflow

1. **Fast development loop:**
   ```bash
   npm run dev          # Build in watch mode
   npm run test:watch   # Tests in watch mode
   ```

2. **Pre-commit checks:**
   ```bash
   npm run test:all     # Full test suite
   npm run lint         # Code quality
   npm run type-check   # TypeScript validation
   ```

3. **Release preparation:**
   ```bash
   npm run clean
   npm run build
   npm run test:ci
   ```

## Project Structure

```
src/
├── index.ts                 # Main exports
├── services/               # Service layer
│   ├── HTTPService.ts      # HTTP client
│   ├── UserService.ts      # User operations
│   └── ...
├── types/                  # TypeScript definitions
└── models/                 # Data models

docs-root/                  # New hybrid documentation architecture
├── index.html             # Main landing page with navigation
├── api/                   # TypeDoc HTML output (generated)
│   ├── index.html         # API reference home
│   ├── classes/           # Class documentation
│   ├── interfaces/        # Interface documentation
│   └── enums/             # Enum documentation
├── guide/                 # Docusaurus site for user guides
│   ├── docs/              # Narrative documentation source
│   │   ├── getting-started.md    # Installation, auth (serves as home)
│   │   ├── getting-started/      # Authentication, first network
│   │   ├── guides/               # User guides and workflows  
│   │   └── examples/             # Code examples
│   ├── build/             # Built Docusaurus site (generated)
│   ├── docusaurus.config.js     # Docusaurus configuration
│   └── package.json       # Documentation dependencies
└── assets/                # Shared documentation resources

docs-site/                  # Legacy documentation (to be removed)

__tests__/
├── unit/                   # Fast unit tests
├── integration/            # Real API tests  
└── shared/                 # Test utilities

dist/                       # Built library (generated)
typedoc.json               # TypeDoc configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run the full test suite: `npm run test:all`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
