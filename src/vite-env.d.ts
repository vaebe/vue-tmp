/// <reference types="vite/client" />
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
  const zhCn: any
  export default zhCn
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_AXIOS_TIMEOUT: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_WS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
