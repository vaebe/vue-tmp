import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'development' ? '/' : '/vueTmp/',
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
          './src/stores',
        ],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      visualizer(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
  }
})
