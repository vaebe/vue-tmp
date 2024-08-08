import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'

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
    ],
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

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
