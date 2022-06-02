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
