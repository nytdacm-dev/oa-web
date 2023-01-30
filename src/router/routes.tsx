import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from "@/stores/userStore";

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
            path: ':username',
            name: 'user-detail',
            component: () => import('../views/UserDetailView.vue'),
          }
        ],
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../layouts/AdminLayout.vue'),
        beforeEnter: () => {
          const userStore = useUserStore()
          return userStore.admin || userStore.superAdmin
        },
        children: [
          {
            path: '',
            name: 'admin-home',
            redirect: '/admin/user'
          },
          {
            path: 'user',
            name: 'admin-user',
            component: () => import('../views/admin/AdminUserView.vue')
          },
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
