import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useUserStore from './modules/useUserStore'
import useLayoutStore from './modules/useLayoutStore'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 这里统一导出使用
export { useUserStore, useLayoutStore }
export default pinia
