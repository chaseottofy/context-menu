import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/context-menu-js.ts'),
      name: 'context-menu-js',
      formats: ['es', 'umd'],
      fileName: (format) => `context-menu-js.${format}.js`,
    },

  },
});