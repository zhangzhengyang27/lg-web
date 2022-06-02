import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './Vue-Router.js'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  // vue cli的服务器会默认支持history模式
  // mode: 'history',
  routes
})

export default router
