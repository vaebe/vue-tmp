import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import checker from 'vite-plugin-checker';
// 对某些文件排除检查
// exclude: /windicss|node_modules/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,vue}"'
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{css,scss,vue}'
      },
      typescript: true
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  }
});
