# Installation

## Requirements

- **Node.js 16+** (18+ recommended)
- **npm**, **yarn**, or **pnpm**

## Package Installation

```bash npm2yarn
npm install @js4cytoscape/ndex-client
```

## Import Styles

### ES Modules (Recommended)

```typescript
import { NDExClient } from '@js4cytoscape/ndex-client';

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org'
});
```

### CommonJS

```javascript
const { NDExClient } = require('@js4cytoscape/ndex-client');

const client = new NDExClient({
  baseURL: 'https://www.ndexbio.org'
});
```

### UMD (Browser)

```html
<script src="https://unpkg.com/@js4cytoscape/ndex-client/dist/index.global.js"></script>
<script>
  const client = new NDExClient.NDExClient({
    baseURL: 'https://www.ndexbio.org'
  });
</script>
```

## TypeScript Support

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

## Build Output

The package includes multiple build formats:

- **`dist/index.js`** - CommonJS build
- **`dist/index.mjs`** - ES Module build  
- **`dist/index.global.js`** - UMD build for browsers
- **`dist/index.d.ts`** - TypeScript declarations

## Verification

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

## Next Steps

- **[Authentication →](/docs/getting-started/authentication)** - Set up authentication
- **[Your First Network →](/docs/getting-started/first-network)** - Start working with networks