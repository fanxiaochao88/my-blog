import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/list/homeList.vue')
      }
    ],
    meta: {
      title: '首页'
    }
  },
  {
    path: '/edit',
    component: () => import('@/views/edit/editPage.vue'),
    meta: {
      title: '编辑'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: () => import('@/views/regisster/register.vue'),
    meta: {
      title: '注册'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
