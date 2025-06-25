import type { LoginResData } from '@/api/login'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const useUserStore = defineStore(
  'useUserStore',
  () => {
    const [loginResData, resetLoginResData] = useResetReactive({
      token: '',
      expired_at: 0,
      userInfo: {
        avatar: '',
        createdAt: '',
        gender: '',
        id: '',
        nickName: '',
        password: '',
        phoneNumber: '',
        role: '',
        updatedAt: '',
        email: '',
        accountType: '',
      },
    })

    const userInfo = computed(() => loginResData.userInfo)

    // 是否是管理员
    const isAdmin = computed(() => userInfo.value.role === '00')

    // 保存进入登录页面的路径实现从哪来回哪里去
    const enterTheLoginPagePath = ref('/')
    function setEnterTheLoginPagePath(path: string) {
      enterTheLoginPagePath.value = path
    }

    const router = useRouter()

    // 设置登录返回数据
    function setLoginResData(data: LoginResData) {
      Object.assign(loginResData, data)
      router.push('/user')
    }

    const isLogin = computed(() => !!loginResData.userInfo.id)

    // 获取 token
    function getToken() {
      return loginResData.token
    }

    function loginOut() {
      resetLoginResData()

      // 清除缓存的数据
      localStorage.clear()
      sessionStorage.clear()

      router.push('/login')
    }

    return {
      userInfo,
      loginResData,
      setLoginResData,
      getToken,
      loginOut,
      isLogin,
      isAdmin,
      setEnterTheLoginPagePath,
    }
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
)

// 导出 store
export { useUserStore }

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
