import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: 'dist2',
        assetsDir: '',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {

        },
        target: ['es2020'],
        modulePreload: {
            polyfill: false
        }
      }
})