import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/context-menu.ts'),
      name: 'ContextMenu',
      fileName: (format) => `context-menu.${format}.js`,
    },
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
});