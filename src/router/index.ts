import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: (to: RouteLocation) => {
      return `${to.path}login`
    },
    component: () => import('@/components/ViewComponent.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      name: '404',
    },
    component: () => import('@/views/errorPage/error404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path)
    NProgress.start()

  const userStore = useUserStore()

  // 进入后台管理页面 是管理员直接方形，否则提示并导航到首页
  if (to.fullPath.includes('backstage')) {
    if (userStore.isAdmin) {
      next()
    }
    else {
      ElMessage.warning('您没有权限进入！')
      next('/')
    }
  }
  else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
