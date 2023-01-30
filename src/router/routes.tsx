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
        meta: {
          title: '首页',
        },
      },
      {
        path: '/user',
        name: 'user',
        children: [
          {
            path: ':username',
            name: 'user-detail',
            component: () => import('../views/UserDetailView.vue'),
            meta: {
              title: '个人中心',
            },
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
            component: () => import('../views/admin/AdminUserView.vue'),
            meta: {
              title: '用户管理',
            },
          },
        ],
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: {
          title: '用户登录',
        },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: '关于',
        },
      },
    ],
  },
]
