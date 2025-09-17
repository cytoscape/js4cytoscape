/* Stream CX2 upload script using the library (NDExClient) and test/testconfig.js */
/* Usage: node examples/upload-cx2.js [path/to/file.cx2] */

const path = require('path');
const fs = require('fs');
const { NDExClient } = require('../dist/index.js');
const { integrationTestConfig, testAccount } = require('../test/testconfig.js');

(async () => {
  try {
    const inputArg = process.argv[2];
    const filePath = inputArg
      ? path.resolve(process.cwd(), inputArg)
      : path.resolve(__dirname, 'test.cx2');
    const baseURL = integrationTestConfig?.server?.baseURL || 'https://dev1.ndexbio.org';
    const timeout = integrationTestConfig?.timeouts?.longRunning || 30000;
    const username = testAccount?.username;
    const password = testAccount?.password;

    if (!username || !password) throw new Error('Missing credentials in test/testconfig.js');

    // Hint: install 'form-data' to enable true streaming under Node
    try { require('form-data'); } catch (_) {
      console.warn("Note: 'form-data' is not installed. The library may fall back to buffering.");
    }

    console.log(`Using server: ${baseURL}`);
    console.log(`Streaming CX2 file: ${filePath}`);

    const client = new NDExClient({ baseURL, timeout });
    client.updateConfig({ auth: { type: 'basic', username, password } });

    // Create a readable stream and pass it to the library (no full file load)
    const stream = fs.createReadStream(path.resolve(filePath));

    const result = await client.v3.networks.uploadCX2Network(stream, {
      visibility: 'PRIVATE',
      // folderId: 'your-folder-uuid',
    });
    console.log('Created network:', result);

    // Verify by fetching summary
    const summary = await client.networks.getNetworkSummary(result.uuid);
    console.log('Summary:', {
      name: summary.name,
      nodeCount: summary.nodeCount,
      edgeCount: summary.edgeCount,
      visibility: summary.visibility,
    });
  } catch (err) {
    console.error('Upload failed:', err?.response?.data || err.message || err);
    process.exit(1);
  }
})();
