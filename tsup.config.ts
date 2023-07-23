import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/context-menu.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  splitting: true,
  clean: true,
  minify: true,
  target: 'es2018',
  tsconfig: 'tsconfig.json',
  "external": ["./context-menu.css"],
  "define": {
    "process.env.NODE_ENV": '"production"'
  },
})