import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';
import demoRouter from './demo';

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: (to: RouteLocationNormalized) => {
      return `${to.path}login`;
    },
    component: () => import('@/views/layout/base-layout.vue'),
    children: [demoRouter]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/refreshThePage',
    name: 'refreshThePage',
    component: () => import('@/views/refresh-the-page.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/error-404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error-page/error-404.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
