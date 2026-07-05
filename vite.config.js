export default {
  base: '/-/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true
  }
};
