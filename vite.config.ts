import type { UserConfig } from 'vite'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import gzipPlugin from 'rollup-plugin-gzip'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { version } from './package.json'

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    base: mode === 'development' ? '/' : '/vue-tmp/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia',
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw', 'RouteLocationNormalized', 'RouteRecordRaw', 'RouteLocation'],
            type: true,
          },
          {
            from: 'useEcharts',
            imports: ['ECOption'],
            type: true,
          },
        ],
        dirs: [
          './src/composables',
          './src/stores/modules',
        ],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      visualizer(),
      tailwindcss(),
      gzipPlugin({ minSize: 1024 }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-core': ['vue', 'vue-router'],
            '@vueuse/core': ['@vueuse/core'],
            'axios': ['axios'],
            'msw': ['msw'],
            'crypto-js': ['crypto-js'],
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
  }

  return config
})
