import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
    ],
  },
]
