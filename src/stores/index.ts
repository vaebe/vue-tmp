import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useLayoutStore from './modules/useLayoutStore'
import useUserStore from './modules/useUserStore'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 这里统一导出使用
export { useLayoutStore, useUserStore }
export default pinia
