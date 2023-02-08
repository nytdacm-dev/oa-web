import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from "@/stores/userStore";

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout'),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/HomeView.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/member",
        name: "member",
        component: () => import("../views/MemberView.vue"),
        meta: {
          title: "队员列表"
        }
      },
      {
        path: "/user",
        name: "user",
        children: [
          {
            path: ":username",
            name: "user-detail",
            component: () => import("../views/UserDetailView.vue"),
            meta: {
              title: "个人中心"
            }
          }
        ]
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
            component: () => import('../views/admin/AdminUserListView.vue'),
            meta: {
              title: '用户管理',
            },
          },
          {
            path: 'group',
            name: 'admin-group',
            component: () => import('../views/admin/AdminGroupListView.vue'),
            meta: {
              title: '群组管理',
            },
          },
          {
            path: 'submission',
            name: 'admin-submission',
            component: () => import('../views/admin/AdminSubmissionListView.vue'),
            meta: {
              title: '提交记录',
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
    ],
  },
  {
    path: '/404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '404',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
