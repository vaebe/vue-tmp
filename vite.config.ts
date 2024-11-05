import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import gzipPlugin from 'rollup-plugin-gzip'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
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
          './src/stores',
        ],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      visualizer(),
      gzipPlugin({ minSize: 1024 }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          msw: ['msw'],
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              // pnpm兼容
              const pnpmName = id.includes('.pnpm') ? '.pnpm/' : ''
              const fileName = `node_modules/${pnpmName}`

              const result = id
                .split(fileName)[1]
                .split('/')[0]
                .toString()

              return result
            }
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
  }
})
