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
        path: '/user',
        name: 'user',
        children: [
          {
            path: ':id',
            name: 'user-detail',
            component: () => import('../views/UserDetailView.vue'),
          }
        ],
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
    ],
  },
]
