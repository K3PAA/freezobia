import { defineConfig } from 'vite'

export default defineConfig({
  base: '/freezobia/',
  build: {
    outDir: 'dist',
    assetsDir: '',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {},
    target: ['es2020'],
    modulePreload: {
      polyfill: false,
    },
  },
})
