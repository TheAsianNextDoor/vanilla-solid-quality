/// <reference types="vitest" />
// needed to merge vite and vitest types

import path from 'path';

import suidPlugin from '@suid/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import EnvironmentPlugin from 'vite-plugin-environment';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    outDir: path.join(__dirname, 'dist'),
  },
  optimizeDeps: { extensions: ['jsx'], exclude: ['@suid/material', '@suid/icons-material'] },
  plugins: [
    suidPlugin(),
    solid(),
    visualizer(),
    tsconfigPaths(),
    EnvironmentPlugin('all', { prefix: 'WEB_' }),
    checker({
      eslint: {
        lintCommand: 'eslint --ignore-pattern "**/*.test.*"  --cache --ext ts,tsx "./src/"',
      },
      typescript: true,
    }),
  ],
  server: {
    hmr: true,
    port: 3000,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**', '**/mocks/**'],
    globals: true,
    include: ['src/**/?(*.)(test).[jt]s?(x)'],
    outputFile: {
      html: './reports/index.html',
    },
    setupFiles: ['./configs/test/setupTests.js'],
  },
});
