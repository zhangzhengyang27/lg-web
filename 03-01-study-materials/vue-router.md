## Vue Router

### Vue Router 基础回顾

#### 使用步骤

1.创建 router 对象，router/index.js

```js
import Vue from 'vue' 
import VueRouter from 'vue-router' 
// 路由组件 
import index from '@/views/index' 
// 注册插件 
Vue.use(VueRouter) 
// 路由规则 
const routes = [
  { name: 'index', 
   path: '/', 
   component: index 
  } 
]
// 路由对象
const router = new VueRouter({ 
  routes 
})
export default router
```

2.注册router对象，main.js

```js
import router from './router' 

new Vue({ 
  render: h => h(App), 
  router 
}).$mount('#app')
```

3.创建路由组建的占位，App.vue

```js
<router-view></router-view>
```

4.创建链接

```js
<router-link to="./">首页</router-link> 
<router-link :to="{name: 'index'}">首页</router-link>
```

### 动态路由传参

```js
const routes = [ 
  { 
   name: 'detail', 
   // 路径中携带参数 
   path: '/detail/:id', 
   component: detail,
   props: true
  } 
]


// detail 组件中接收路由参数 
const detail = { 
  props: ['id'], 
  template: '<div>Detail ID： {{ id }}</div>' 
}
```

```vue
<template>
  <div>
    <!-- 方式1： 通过当前路由规则，获取数据 -->
    通过当前路由规则获取：{{ $route.params.id }}

    <br>
    <!-- 方式2：路由规则中开启 props 传参 -->
    通过开启 props 获取：{{ id }}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id']
}
</script>

<style>

</style>
```

### 嵌套路由

index 组件和 details 组件 嵌套 layout 组件

<img src="https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601205534351.png" alt="image-20220601205534351" style="zoom:50%;" />

```js
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
```

嵌套路由分相对路径和绝对路径

- path: 'detail/:id'   相对路径  detail前面什么都不用加
- path: '/detail/:id'   绝对路径  detail前面加父组件的路径

### 编程时导航

```js
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    props: true,
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  }
]
```

```js
// 跳转到指定路径 
router.push('/login')

// 命名的路由 
replace () {
   this.$router.replace('/login')
},
goDetail () {
   this.$router.push({ name: 'Detail', params: { id: 1 } })
}
```

### Hash 模式 和 History 模式的区别

#### 表现形式的区别

- Hash 模式

  https://music.163.com/#/playlist?id=3102961863

- History 模式

  https://music.163.com/playlist/3102961863

#### 原理的区别

- hash 模式

  Vue Router 默认使用的是 hash 模式，使用 hash 来模拟一个完整的 URL，通过onhashchange 监听路径的变化

- History 模式

  基于 History API

  通过 history.pushState() 方法改变地址栏

  监听 popstate 事件

  根据当前路由地址找到对应组件重新渲染

```js
history.pushState() 
history.replaceState() 
history.go()
```

#### 开启 History 模式

```js
const router = new VueRouter({ 
  // mode: 'hash', 
  mode: 'history', 
  routes 
})
```

### HTML5 History 模式的使用

History 需要服务器的支持

单页应用中，服务端不存在 http://www.testurl.com/login 这样的地址会返回找不到该页面

在服务端应该除了静态资源外都返回单页应用的 index.html

#### Node.js 环境

```js
const path = require('path')
// 导入处理 history 模式的模块
const history = require('connect-history-api-fallback')
// 导入 express
const express = require('express')

const app = express()
// 注册处理 history 模式的中间件
app.use(history())
// 处理静态资源的中间件，网站根目录 ../web
app.use(express.static(path.join(__dirname, '../web')))

// 开启服务器，端口是 3000
app.listen(3000, () => {
  console.log('服务器开启，端口：3000')
})
```

```json
"dependencies": {
   "connect-history-api-fallback": "^1.6.0",
   "express": "^4.17.1"
}
```

### nginx 环境配置

查看其他文档

### Vue Router 模拟实现

复习完了 Vue-Router 的基本使用接下来我们来自己模拟一个 Vue Router，通过模拟 Vue Router 了解它的实现原理。

前置的知识：插件、slot 插槽、混入、render 函数、运行时和完整版的 Vue回顾 Vue Router 的核心代码

```js
// 注册插件 
// Vue.use() 内部调用传入对象的 install 方法
Vue.use(VueRouter) 

// 创建路由对象 
const router = new VueRouter({ 
  routes: [ 
    { name: 'home', path: '/', component: homeComponent } ] 
})

// 创建 Vue 实例，注册 router 对象 
new Vue({ 
  router, 
  render: h => h(App) 
}).$mount('#app')
```

#### 实现思路

- 创建 VueRouter 插件，静态方法 install

  判断插件是否已经被加载

  当 Vue 加载的时候把传入的 router 对象挂载到 Vue 实例上（注意：只执行一次）

- 创建 VueRouter 类

  初始化，options、routeMap、app(简化操作，创建 Vue 实例作为响应式数据记录当前路径)

  initRouteMap() 遍历所有路由信息，把组件和路由的映射记录到 routeMap 对象中

  注册 popstate 事件，当路由地址发生变化，重新记录当前的路径

  创建 router-link 和 router-view 组件

  当路径改变的时候通过当前路径在 routerMap 对象中找到对应的组件，渲染 router-view

![image-20220601211648774](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601211648774.png)

#### 代码实现

```js
// 模拟history模式

// vue cli 默认的是运行是版本
// console.dir(Vue)
let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2 把Vue的构造函数记录在全局,其他的地方还需要使用
    _Vue = Vue
    // 3 把创建Vue的实例传入的router对象注入到Vue实例
    // 谁调用，这里的this就是指向谁。此时的this就是指向VueRouter这个类
    // _Vue.prototype.$router = this.$options.router
    _Vue.mixin({
      // 所有的组件都会执行beforeCreate这个函数
      beforeCreate () {
        // 做判断，只需要执行一次。如果是组件的就不行，是vue实例就执行。只有vue的$options才会有router属性
        if (this.$options.router) {
          // 在beforeCreate里面，this就是_vue的实例
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    // observable 响应式数据  observable这个函数，可以使用在渲染函数或者计算属性里面
    this.data = _Vue.observable({
      current: '/'
    })
    this.init()
  }

  init () {
    this.createRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponent (Vue) {
    Vue.component('router-link', {
      // 接收外部传入的参数
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickhander
          }
        }, [this.$slots.default])
        // 第三个参数是创建标签的内容
      },
      methods: {
        clickhander (e) {
          // data --传给popstate事件的
          // unused --网页的标题
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          // 阻止默认的刷新事件
          e.preventDefault()
        }
      }
      // template:"<a :href='to'><slot></slot><>"  模板的写法，汇报运行是异常的错误
      //  <router-link to="/">Home</router-link>   之前的写法
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        // self.data.current  cm=components
        // 如果直接使用this，这个this不是指代的VueRouter
        const cm = self.routeMap[self.data.current]
        return h(cm)
      }
    })
  }

  initEvent () {
    // popstate 改变浏览器的地址栏 监听地址栏的变化
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
```

**注意：**

vue-cli 创建的项目默认使用的是运行时版本的 Vue.js。不支持template语法

```js
template:"<a :href='to'><slot></slot><>"
```

如果想切换成带编译器版本的 Vue.js，需要修改 vue-cli 配置;项目根目录创建 vue.config.js 文件，添加 runtimeCompiler

```js
module.exports = { 
	runtimeCompiler: true 
}
```

- 运行时版：不支持 template 模板，需要打包的时候提前编译
- 完整版：包含运行时和编译器，体积比运行时版大10K左右，程序运行的时候把模板转换成 render 函数

### 附录：

https://www.jianshu.com/p/4295aec31302
https://zhuanlan.zhihu.com/p/27588422

