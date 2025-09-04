# NDEx JavaScript Client

A modern TypeScript/JavaScript client library for the NDEx (Network Data Exchange) API.

## Features

- 🎯 **Modern TypeScript** - Full type safety and IntelliSense support
- 🚀 **Multiple Formats** - ESM, CJS, and UMD builds
- 🔒 **Authentication** - Basic auth and OAuth support
- 🌐 **Version Support** - Compatible with NDEx API v2 and v3
- 📦 **Lightweight** - Optimized bundle sizes
- 🧪 **Well Tested** - Comprehensive unit and integration tests

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
client.updateConfig({
  auth: {
    type: 'basic',
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

## Documentation

### Client Documentation

This project uses a hybrid documentation approach combining:
- **Narrative Documentation** - Guides, tutorials, and examples built with [Docusaurus](https://docusaurus.io/)
- **API Reference** - Auto-generated from TypeScript source code using [TypeDoc](https://typedoc.org/)

#### Building Documentation

```bash
# Build complete documentation site (API + narrative)
npm run docs:build

# Build only API reference (TypeDoc)
npm run docs:api

# Serve documentation locally for development
npm run docs:serve

# Clean documentation files
npm run docs:clean
```

The documentation site will be available at `http://localhost:3000` when served locally.

**Documentation Structure:**
- **Getting Started** - Installation, authentication, first network
- **User Guides** - Working with networks, user management, file operations  
- **Examples** - Code examples and integration patterns
- **API Reference** - Complete TypeScript API documentation

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
   # Edit test/testconfig.js with your NDEx credentials
   # This is only needed if you want to run integration tests
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

#### Integration Tests (Real API)
```bash
# Run integration tests (~1-2s)
npm run test:integration

# Run all tests (unit + integration)  
npm run test:all

# CI command with full coverage
npm run test:ci
```

**Integration tests:**
- ✅ Real API calls to NDEx servers
- ✅ Uses credentials from `test/testconfig.js`
- ✅ Validates end-to-end functionality
- ✅ 60% coverage requirement

#### Test Configuration

Integration tests use the configuration in `test/testconfig.js`:

```javascript
const integrationTestConfig = {
  server: {
    baseURL: 'https://dev1.ndexbio.org',  // Test server
  },
  testAccount: {
    username: 'your-test-username',       // Update with your credentials
    password: 'your-test-password'
  }
};
```

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

docs-site/                  # Documentation site (Docusaurus)
├── docs/                   # Narrative documentation
│   ├── getting-started/    # Installation, auth, first network
│   ├── guides/            # User guides and workflows
│   ├── examples/          # Code examples
│   └── api/               # API reference (generated)
├── docusaurus.config.js   # Docusaurus configuration
└── package.json           # Documentation dependencies

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
