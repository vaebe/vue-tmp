import type { RouteLocationNormalized } from 'vue-router';

export default {
  path: 'demo',
  name: 'demo',
  meta: {
    name: '示例列表'
  },
  redirect: (to: RouteLocationNormalized) => {
    return `${to.path}/list`;
  },
  component: () => import('@/components/ViewComponent.vue'),
  children: [
    {
      path: 'list',
      name: 'demo-list',
      meta: {
        name: '台账管理列表'
      },
      component: () => import('@/views/demo/list.vue')
    }
  ]
};
