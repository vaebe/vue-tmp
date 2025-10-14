import { acceptHMRUpdate, defineStore } from 'pinia'

const useLayoutStore = defineStore(
  'useLayoutStore',
  () => {
    const menuDropWidth = ref('44px')

    // 是否折叠菜单
    const menuCollapse = ref(false)

    const setMenuCollapse = (type: boolean) => {
      menuCollapse.value = type

      document.documentElement.style.setProperty('--layout-menu-width', type ? menuDropWidth.value : '160px')
    }

    // 监听容器大小设置菜单是否收起
    useResizeObserver(document.body, (entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      const { width } = entry.contentRect
      if (width < 1280) {
        setMenuCollapse(true)
      }
      else {
        setMenuCollapse(false)
      }
    })

    return {
      menuCollapse,
      setMenuCollapse,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

// 导出 store
export { useLayoutStore }

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
