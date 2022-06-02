import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载组件
import Layout from '@/components/Layout.vue'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  // 嵌套路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        // 默认展示的是Index组件
        name: 'index',
        path: '',
        component: Index
      },
      {
        name: 'detail',
        path: 'detail/:id', // 相对path   --zi
        // path: '/detail/:id', // 绝对path,添加父组件的path路径   --/fu/zi
        props: true,
        component: () => import('@/views/Detail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
