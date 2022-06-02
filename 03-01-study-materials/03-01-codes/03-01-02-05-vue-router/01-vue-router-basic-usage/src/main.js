import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const vm = new Vue({
  // 3. 注册 router 对象
  router,
  render: h => h(App)
}).$mount('#app')
console.log(vm)
// zzy 注册router,则会在vm中创建$route、$router对象
