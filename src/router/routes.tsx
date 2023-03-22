import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getToken } from '@/shared/token'

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
        path: '/member',
        name: 'member',
        component: () => import('../views/MemberView.vue'),
        meta: {
          title: '队员列表',
        },
      },
      {
        path: '/article',
        name: 'article',
        children: [
          {
            path: '',
            name: 'article-list',
            component: () => import('../views/ArticleListView.vue'),
            meta: {
              title: '文章列表',
            },
          },
          {
            path: 'new',
            name: 'write-article',
            component: () => import('../views/NewArticleView.vue'),
            meta: {
              title: '写文章',
            },
          },
          {
            path: ':articleId',
            name: 'article-detail',
            component: () => import('../views/ArticleView.vue'),
            meta: {
              title: '文章详情',
            },
          },
        ],
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
          },
        ],
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../layouts/AdminLayout.vue'),
        beforeEnter: () => {
          const userStore = useUserStore()
          if (!getToken())
            return '/login'

          if (!userStore.admin && !userStore.superAdmin)
            return '/403'
        },
        children: [
          {
            path: '',
            name: 'admin-home',
            redirect: '/admin/user',
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
          {
            path: 'article',
            name: 'admin-article',
            component: () => import('../views/admin/AdminArticleListView.vue'),
            meta: {
              title: '文章列表',
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
    path: '/403',
    component: () => import('../views/error-page/403.vue'),
    meta: {
      title: '403',
    },
  },
  {
    path: '/404',
    component: () => import('../views/error-page/404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/500',
    component: () => import('../views/error-page/500.vue'),
    meta: {
      title: '500',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
