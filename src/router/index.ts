import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: (to: RouteLocation) => {
      return `${to.path}login`
    },
    component: () => import('@/views/layout/baseLayout.vue'),
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'tdesign:institution-checked',
        },
        component: () => import('@/views/user/index.vue'),
      },
      {
        path: 'genBg',
        name: 'generateBackground',
        meta: {
          title: '生成背景',
          icon: 'mingcute:background-fill',
        },
        component: () => import('@/views/genBg.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: '',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      icon: '',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404',
      icon: '',
    },
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path)
    NProgress.start()

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
