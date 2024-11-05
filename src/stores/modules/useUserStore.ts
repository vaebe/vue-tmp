import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginResData, UserInfo } from '@/api/login'
import { resetObjToPrimitiveType } from '@/utils/tool'

const useUserStore = defineStore(
  'useUserStore',
  () => {
    const userInfo = reactive({
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
    })

    const loginResData = reactive({
      token: '',
      expired_at: 0,
      userInfo,
    })

    // 是否是管理员
    const isAdmin = computed(() => userInfo.role === '00')

    // 保存进入登录页面的路径实现从哪来回哪里去
    const enterTheLoginPagePath = ref('/')
    const setEnterTheLoginPagePath = (path: string): void => {
      enterTheLoginPagePath.value = path
    }

    const router = useRouter()

    // 设置登录返回数据
    const setLoginResData = (data: LoginResData): void => {
      Object.assign(loginResData, data)
      Object.assign(userInfo, data.userInfo)
      router.push('/user')
    }

    // 获取用户信息
    const getUserInfo = (): UserInfo => {
      return loginResData.userInfo
    }

    // 刷新用户信息
    const refreshUserInfo = (): void => {

    }

    const isLogin = computed(() => !!loginResData.userInfo.id)

    // 获取 token
    const getToken = (): string => {
      return loginResData.token
    }

    // 退出登录
    const loginOut = async (): Promise<void> => {
      // 重置登录信息
      Object.assign(loginResData, resetObjToPrimitiveType(loginResData))
      Object.assign(userInfo, resetObjToPrimitiveType(userInfo))

      // 清除缓存的数据
      localStorage.clear()
      sessionStorage.clear()

      await router.push('/login')
    }

    return {
      userInfo,
      loginResData,
      setLoginResData,
      getUserInfo,
      getToken,
      loginOut,
      isLogin,
      isAdmin,
      refreshUserInfo,
      setEnterTheLoginPagePath,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['loginResData'],
    },
  },
)

// 导出 store
export { useUserStore }
export default useUserStore

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
