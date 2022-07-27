import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint插件
import viteEslint from 'vite-plugin-eslint';
// stylelint插件
import viteStylelint from '@amatlash/vite-plugin-stylelint';

export default defineConfig({
  plugins: [
    vue(),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
