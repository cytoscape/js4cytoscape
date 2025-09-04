import { defineConfig } from 'tsup'

export default defineConfig([
  // Browser build (IIFE) - bundle everything including axios
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    dts: false,
    sourcemap: true,
    clean: true,
    minify: true,
    treeshake: true,
    splitting: false,
    target: 'es2020',
    outDir: 'dist',
    outExtension: () => ({ js: '.global.js' }),
    globalName: 'NDExClient',
    platform: 'browser',
    esbuildOptions(options) {
      options.banner = {
        js: '/* NDEx Client Library - Browser Build with Axios */',
      }
      options.define = {
        global: 'globalThis',
        'process.env.NODE_ENV': '"production"'
      }
    },
  },
  // Node.js builds (ESM/CJS) - external axios
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    minify: true,
    treeshake: true,
    splitting: false,
    target: 'es2020',
    outDir: 'dist',
    external: ['axios'],
    esbuildOptions(options) {
      options.banner = {
        js: '/* NDEx Client Library - Modern TypeScript implementation */',
      }
    },
    onSuccess: async () => {
      console.log('✅ Build completed successfully')
    }
  }
])
