# Test Structure Documentation

This directory contains the modern test structure for the NDEx Client library, fully updated to match the current TypeScript implementation.

## Directory Structure

```
__tests__/
├── unit/                     # Fast mock-based unit tests
│   ├── services/            # Service layer tests
│   │   ├── HTTPService.test.ts      # Core HTTP service tests
│   │   └── UserService.test.ts      # User authentication and management tests
│   └── NDExClient.test.ts   # Main NDExClient class tests
├── integration/             # Slower end-to-end integration tests
│   ├── api/                # API integration tests
│   │   ├── NDExClient.test.ts
│   │   └── UserService.test.ts
│   ├── config/             # Test configuration
│   │   └── testConfig.ts   # Centralized test config
│   ├── setup/              # Integration test setup
│   │   ├── env.js          # Environment variables
│   │   └── integrationSetup.ts
│   └── workflows/          # Workflow tests
│       └── NetworkLifecycle.test.ts
└── shared/                  # Shared test utilities
    ├── testHelpers.ts      # Mock data generators and utilities
    └── unitSetup.ts        # Unit test setup
```

## Test Commands

### Unit Tests (Default)
```bash
npm test                    # Default: run fast unit tests
npm run test:unit          # Explicit unit test command
npm run test:watch         # Watch mode for unit tests
npm run test:coverage      # Unit tests with coverage
```

### Integration Tests
```bash
npm run test:integration   # Run integration tests
npm run test:all          # Run both unit and integration tests
npm run test:ci           # CI command with full coverage
```

## Configuration Files

### Jest Configurations
- `jest.config.js` - Main config (defaults to unit tests)
- `jest.unit.config.js` - Unit test configuration
- `jest.integration.config.js` - Integration test configuration

### Test Settings
- **Unit Tests**: 10 second timeout, 70% coverage threshold
- **Integration Tests**: 30 second timeout, 60% coverage threshold, max 3 concurrent tests
- **Fast Development Loop**: `npm test` runs only unit tests for immediate feedback

## Test Categories

### Unit Tests (__tests__/unit/)
- **Fast execution** (~0.5 seconds total)
- **Mock-based** - All external dependencies (HTTP, axios) mocked
- **High coverage requirements** (70%)
- **Focus**: 
  - Service logic and method behavior
  - Error handling and exception throwing
  - Parameter validation and type safety
  - Authentication configuration validation

### Integration Tests (__tests__/integration/)
- **Real API calls** to test server (configured in testconfig.js)
- **Slower execution** (~1-2 seconds total)  
- **Lower coverage requirements** (60%)
- **Focus**: 
  - End-to-end NDEx API workflows
  - V2/V3 API compatibility testing
  - Authentication flows (Basic Auth and OAuth)
  - Network CRUD operations

## Test Configuration

### Integration Test Config
Integration tests use configuration from `/test/testconfig.js`:
- **Server**: https://dev1.ndexbio.org
- **Credentials**: Basic auth with test account
- **Network IDs**: Public and private test networks

### Shared Utilities
- **testHelpers.ts**: Mock data generators, test client factory
- **testConfig.ts**: Centralized integration test configuration
- **unitSetup.ts**: Common unit test setup and mocking

## Development Workflow

1. **Development**: Run `npm test` for fast unit test feedback
2. **Pre-commit**: Run `npm run test:all` for comprehensive validation
3. **CI/CD**: Use `npm run test:ci` for coverage reports
4. **Debugging**: Use `npm run test:watch` for continuous testing

## Test Coverage

### Current Coverage  
- **Unit Tests**: 68 tests passing, comprehensive service coverage
  - NDExClient: 22 tests (constructor, configuration, auth validation, service accessors)
  - HTTPService: 28 tests (HTTP methods, file uploads, error handling, auth headers)
  - UserService: 18 tests (authentication, user management, error scenarios)
- **Integration Tests**: Available but not currently maintained
- **Total**: 68 unit tests providing robust validation of core functionality

### Coverage Goals
- **Unit**: 70% line coverage achieved - comprehensive testing of all service methods
- **Integration**: Available for future expansion when needed

## Adding New Tests

### Unit Tests
1. Create test file in appropriate `__tests__/unit/` subdirectory
2. Import from `../../../src/` paths
3. Mock all external dependencies using Jest mocks
4. **Key Testing Patterns**:
   - Mock HTTPService for service tests
   - Expect direct data returns (not wrapper objects)
   - Expect thrown errors for error cases (not returned error objects)
   - Test authentication configuration validation
   - Test version routing (v2/v3 API selection)

### Integration Tests
1. Create test file in appropriate `__tests__/integration/` subdirectory  
2. Use `createIntegrationTestClient()` and `authenticateTestClient()`
3. Make real API calls with flexible assertions
4. Handle varying server response formats gracefully

## Recent Updates (2024)

### Test Implementation Updates
- **Updated all tests** to match the current TypeScript implementation
- **Fixed error handling patterns**: Tests now expect thrown errors instead of returned error objects
- **Updated response expectations**: Tests expect direct data returns instead of success/error wrapper objects
- **Removed deprecated methods**: Removed tests for `getAPICapabilities()` method that was removed from implementation
- **Fixed TypeScript compilation**: All tests now pass TypeScript strict mode validation

### Current Implementation Status
- ✅ **NDExClient**: Full implementation with service orchestration and configuration management
- ✅ **HTTPService**: Complete HTTP client with v2/v3 routing, authentication, and error handling
- ✅ **UserService**: Full user authentication and management functionality
- 🔨 **NetworkServices**: V2/V3 services implemented but with limited methods
- 🔨 **FilesService**: Placeholder implementation ready for expansion
- 🔨 **AdminService**: Placeholder implementation ready for expansion
- 🔨 **WorkspaceService**: Placeholder implementation (deprecated functionality)

### Architecture Highlights
- **Intelligent Version Routing**: Automatic V2/V3 API endpoint routing
- **Type-Safe Design**: Full TypeScript implementation with comprehensive type definitions
- **Error Handling**: Structured error types (NDExError, NDExNetworkError, NDExAuthError, etc.)
- **Authentication Support**: Both Basic Auth and OAuth/JWT authentication
- **Modern HTTP Client**: Axios-based with retry logic, timeout handling, and progress tracking