# TypeScript

解决JS类型系统的问题

## 内容概要

- 强类型与若类型
- 静态类型和动态类型
- JavaScript自由类型系统的问题
- Flow静态类型检查方案
- TypeScript语言规范与基本应用

## 类型系统

强类型和若类型、静态类型和动态类型

![ts类型](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/img/ts%E7%B1%BB%E5%9E%8B.png)

### JavaScript 弱类型产生的问题

```js
// 1. 异常需要等到运行时才能发现

const obj = {}
obj.foo()
setTimeout(() => {
  obj.foo()
}, 1000000)

// 2. 函数功能可能发生改变

function sum (a, b) {
  return a + b
}

console.log(sum(100, 100))     // 200
console.log(sum(100, '100'))  // 100100
console.log('100'-50)  // 50

// 3. 对象索引器的错误用法

const obj = {}

obj[true] = 100 // 属性名会自动转换为字符串

console.log(obj['true'])

// 4.变量重复声明
// obj对象
```

### 强类型的优势

```js
// 1. 强类型代码错误更早暴露

// 2. 强类型代码更智能，编码更准确

function render (element) {
  element.className = 'container'
  element.innerHtml = 'hello world'
}

// 3. 重构更可靠

const util = {
  aaa: () => {
    console.log('util func')
  }
}

// 4. 减少了代码层面的不必要的类型判断

function sum (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('arguments must be a number')
  }

  return a + b
}
```







## Javascript类型系统特征

弱类型且动态类型

弱类型的问题

强类型的优势

## Flow

JavaScript的类型检查器，2014年由Facebook,可以弥补js弱类型的弊端。

并不需要给每一个参数添加注解，可以在需要的参数上添加主角

```js
yarn init --yes 初始化package

yarn add flow-bin -dev

yarn flow init 初识化 .flowconfig的配资文件

yarn flow 开启一个服务

yarn flow stop 关闭

// 去除注解的第一种方法
yarn flow-remove-types -dev

yarn flow-remove-types . -d dist //第一个参数是要转换的目录，第二个是要输出的目录

// 去除注解的第二种方法
yarn add @babel/core @babel/cli @babel/preset-flow

要在目录上添加.babelrc

yarn babel src -d dist  //第一个参数是要转换的目录，第二个是要输出的目录
```

### 快速上手

```js
// @flow
function sum (a: number, b: number) {
  return a + b
}

sum(100, 100)

sum('100', '100')

sum('100', 100)
```

### 开发工具插件

Flow Language Support 是官方提供的插件

### 类型推断

```js
/**
 * 类型推断
 *
 * @flow
 */

function square (n) {
  return n * n
}
// 即使没有添加注解，也会报错
square('100')  

square(100)
```

### 类型注解

```js
// @flow

function square (n: number) {
  return n * n
}

let num: number = 100

// num = 'string' // error

function foo (): number {
  return 100 // ok
  // return 'string' // error
}

function bar (): void {
  // return undefined
}
```

### 原始类型

```js
// @flow

const a: string = 'foobar'

const b: number = Infinity // NaN // 100

const c: boolean = false // true

const d: null = null

const e: void = undefined

const f: symbol = Symbol()
```

其他由结构的数据

```js
// @flow

// 数组类型

const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 元组
const foo: [string, number] = ['foo', 100]

// -------------------------------------------

// 对象类型

const obj1: { foo: string, bar: number } = { foo: 'string', bar: 100 }

// ? 表示可选的
const obj2: { foo?: string, bar: number } = { bar: 100 }
// 初识化的时候不添加任何属性，后续自动添加  [string] 键是值类型
const obj3: { [string]: string } = {}

obj3.key1 = 'value1'
obj3.key2 = 'value2'

// -------------------------------------------

// 函数类型
function foo (callback: (string, number) => void) {
  callback('string', 100)
}

foo(function (str, n) {
  // str => string
  // n => number
})
```

### 特殊类型

```js
// @flow

// 字面量类型  a变量只能存'foo'

const a: 'foo' = 'foo'
// type 只能存放这三种值之一
const type: 'success' | 'warning' | 'danger' = 'success'

// ------------------------

// 声明类型

type StringOrNumber = string | number

const b: StringOrNumber = 'string' // 100

// ------------------------

// Maybe 类型

const gender: ?number = undefined
// 相当于
// const gender: number | null | void = undefined

```

### Mixed&Any

可以传入任意类型

```js
// @flow

// string | number | boolean | ....
function passMixed (value: mixed) {
  if (typeof value === 'string') {
    value.substr(1)
  }

  if (typeof value === 'number') {
    value * value
  }
}

passMixed('string')

passMixed(100)

// ---------------------------------

function passAny (value: any) {
  value.substr(1)

  value * value
}

passAny('string')

passAny(100)
```

### 类型小结

### 运行环境API

内置对象

## TypeScript

JavaScript的超集(superset)，ts经过编译之后转换为js

![ts的包含种类](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/img/ts%E7%9A%84%E5%8C%85%E5%90%AB%E7%A7%8D%E7%B1%BB.png)

### 快速上手

### 配置文件

### 原始类型

### 标准库声明

内置对象类型

### 中文错误消息

### 作用域问题

### Object类型

### 数组类型

### 元组类型

### 枚举类型

### 函数类型

### 任意类型

### 隐式类型转换

### 类型断言

### 接口

### 可选成员、只读成员

### 类

访问修饰符

只读属性

类与接口

抽象类

### 泛型

### 类型声明



