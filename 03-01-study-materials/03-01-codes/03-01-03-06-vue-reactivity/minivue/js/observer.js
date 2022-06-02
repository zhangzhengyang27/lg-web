class Observer {
  constructor (data) {
    this.walk(data)
  }

  walk (data) {
    // 1. 判断data空或者是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // 定义响应式数据
  defineReactive (obj, key, val) {
    let that = this
    // 负责收集依赖，并发送通知 为每一个属性创建一个dep对象
    let dep = new Dep()
    // 如果val是对象，把val内部的属性转换成响应式数据,在walk里面做的判断
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        // 收集依赖  target属性是在watcher类中添加的
        Dep.target && dep.addSub(Dep.target)
        // return obj[key] 会报栈溢出的错误  使用obj[key]又会触发get()函数
        return val
      },
      set (newValue) {
        // function内部会开启一个新的作用域
        if (newValue === val) {
          return
        }
        val = newValue
        // 重新赋值的数据是对象是,也要是响应式的
        that.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}
