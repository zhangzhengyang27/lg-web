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

[flow官网](https://flow.org/en/docs/types/)

[类型手册](https://www.saltycrane.com/cheat-sheets/flow-type/latest/)

### 运行环境API

内置对象

```js
/**
 * 运行环境 API
 *
 * @flow
 */

const element: HTMLElement | null = document.getElementById('app')
```

## TypeScript

JavaScript的超集(superset)，ts经过编译之后转换为JS

任何一种JS运行环境都支持、功能更为强大，生态也更健全、更完善

缺点：

语言本身多了很多的概念

![ts的包含种类](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/img/ts%E7%9A%84%E5%8C%85%E5%90%AB%E7%A7%8D%E7%B1%BB.png)

### 快速上手

```js
yarn init --yes
add typescript --dev
// 编译文件
yarn tsc 01-getting-started.ts  
```

编译ts文件

```js
// 可以完全按照 JavaScript 标准语法编写代码
const hello = (name: any) =>  {
  console.log(`Hello, ${name}`)
}

hello('TypeScript')

// 编译过后
// 可以完全按照 JavaScript 标准语法编写代码
var hello = function (name) {
    console.log("Hello, " + name);
};
hello('TypeScript');
```

### 配置文件

```js
// 初始化，添加tsconfig.json
yarn tsc --init 

// 运行tsc,编译整个项目
yarn tsc

// 以中文提示报错消息
yarn tsc --locale Zh-CN
```

### 原始类型

```js
// 原始数据类型

const a: string = 'foobar'

const b: number = 100 // NaN Infinity

const c: boolean = true // false

// 在非严格模式（strictNullChecks）下，  tsconfig文件夹下面更改 "strict": true,    
// string, number, boolean 都可以为空
// const d: string = null
// const d: number = null
// const d: boolean = null

const e: void = undefined

const f: null = null

const g: undefined = undefined

// Symbol 是 ES2015 标准中定义的成员，
// 使用它的前提是必须确保有对应的 ES2015 标准库引用
// 也就是 tsconfig.json 中的 lib 选项必须包含 ES2015
const h: symbol = Symbol()

// Promise

// const error: string = 100
```

标准库就是内置对象所对应的声明

### 作用域问题

```js
// 默认文件中的成员会作为全局成员
// 多个文件中有相同成员就会出现冲突
// const a = 123

// 解决办法1: IIFE 提供独立作用域
// (function () {
//   const a = 123
// })()

// 解决办法2: 在当前文件使用 export，也就是把当前文件变成一个模块
// 模块有单独的作用域
const a = 123

// export {}是导出的语法
export {}
```

### 特殊类型

```js
// Object 类型

export {} // 确保跟其它示例没有成员冲突

// object 类型是指除了原始类型以外的其它类型
const foo: object = function () {} // [] // {}

// 如果需要明确限制对象类型，则应该使用这种类型对象字面量的语法，或者是「接口」
const obj: { foo: number, bar: string } = { foo: 123, bar: 'string' }

// 在ts中限制对象的类型，要用到接口，接口的概念后续介绍
```

```js
// 数组类型

export {} // 确保跟其它示例没有成员冲突

// 数组类型的两种表示方式

const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 案例 -----------------------

// 如果是 JS，需要判断是不是每个成员都是数字
// 使用 TS，类型有保障，不用添加类型判断
function sum (...args: number[]) {
  return args.reduce((prev, current) => prev + current, 0)
}

sum(1, 2, 3) // => 6
```

```ts
// 元组（Tuple） 就是明确元素数量和元素类型的

export {} // 确保跟其它示例没有成员冲突

const tuple: [number, string] = [18, 'zce']

// 访问数据
// const age = tuple[0]
// const name = tuple[1]

const [age, name] = tuple

// ---------------------

const entries: [string, number][] = Object.entries({
  foo: 123,
  bar: 456
})

const [key, value] = entries[0]
// key => foo, value => 123
```

```js
// 枚举（Enum）

export {} // 确保跟其它示例没有成员冲突

// 用对象模拟枚举
const PostStatus1 = {
  Draft: 0,
  Unpublished: 1,
  Published: 2
}

// 标准的数字枚举
enum PostStatus2 {
  Draft = 0,
  Unpublished = 1,
  Published = 2
}

// 数字枚举，枚举值自动基于前一个值自增
enum PostStatus3 {
  Draft = 6,
  Unpublished, // => 7
  Published // => 8
}

// 字符串枚举，需要手动初始化值
enum PostStatus4 {
  Draft = 'aaa',
  Unpublished = 'bbb',
  Published = 'ccc'
}

// 常量枚举，不会侵入编译结果；编译过后显示的是具体数字值
const enum PostStatus {
  Draft,
  Unpublished,
  Published
}


const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of JavaScript.',
  status: PostStatus.Draft // 3 // 1 // 0
}

// PostStatus[0] // => Draft
```

```js
// 函数类型

export {} // 确保跟其它示例没有成员冲突

function func1 (a: number, b: number = 10, ...rest: number[]): string {
  return 'func1'
}

func1(100, 200)

func1(100)

func1(100, 200, 300)

// -----------------------------------------

const func2: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'func2'
}
```

```js
// 任意类型（弱类型）

export {} // 确保跟其它示例没有成员冲突

function stringify (value: any) {
  return JSON.stringify(value)
}

stringify('string')

stringify(100)

stringify(true)

let foo: any = 'string'

foo = 100

foo.bar()

// any 类型是不安全的
```

```js
// 隐式类型推断  会推断的类型为第一个赋值的类型

export {} // 确保跟其它示例没有成员冲突

let age = 18 // number

// age = 'string'

// 推断为any
let foo

foo = 100

foo = 'string'

// 建议为每个变量添加明确的类型标注
```

```js
// 类型断言

export {} // 确保跟其它示例没有成员冲突

// 假定这个 nums 来自一个明确的接口
const nums = [110, 120, 119, 112]

const res = nums.find(i => i > 0)

// const square = res * res

const num1 = res as number

const num2 = <number>res // JSX 下不能使用
```

```js
// 接口

export {} // 确保跟其它示例没有成员冲突

interface Post {
  title: string
  content: string
}

function printPost (post: Post) {
  console.log(post.title)
  console.log(post.content)
}

printPost({
  title: 'Hello TypeScript',
  content: 'A javascript superset'
})
```

```js
// 可选成员、只读成员、动态成员

export {} // 确保跟其它示例没有成员冲突

// -------------------------------------------

interface Post {
  title: string
  content: string
  subtitle?: string
  readonly summary: string
}

const hello: Post = {
  title: 'Hello TypeScript',
  content: 'A javascript superset',
  summary: 'A javascript'
}

// hello.summary = 'other'

// ----------------------------------

interface Cache {
  [prop: string]: string
}

const cache: Cache = {}

cache.foo = 'value1'
cache.bar = 'value2'
```

### 类

```js
// 类（Class）

export {} // 确保跟其它示例没有成员冲突

class Person {
  name: string // = 'init name'
  age: number
  
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHi (msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
  }
}
```

#### 访问修饰符

```ts
// 类的访问修饰符

export {} // 确保跟其它示例没有成员冲突

class Person {
  public name: string // = 'init name'
  private age: number
  protected gender: boolean
  
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
    this.gender = true
  }

  sayHi (msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
    console.log(this.age)
  }
}

class Student extends Person {
  private constructor (name: string, age: number) {
    super(name, age)
    console.log(this.gender)
  }

  static create (name: string, age: number) {
    return new Student(name, age)
  }
}

const tom = new Person('tom', 18)
console.log(tom.name)
// console.log(tom.age)
// console.log(tom.gender)

const jack = Student.create('jack', 18)
```

#### 只读属性

```ts
// 类的只读属性

export {} // 确保跟其它示例没有成员冲突

class Person {
  public name: string // = 'init name'
  private age: number
  // 只读成员
  protected readonly gender: boolean
  
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
    this.gender = true
  }

  sayHi (msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
    console.log(this.age)
  }
}

const tom = new Person('tom', 18)
console.log(tom.name)
// tom.gender = false
```

#### 类与接口

```ts
// 类与接口

export {} // 确保跟其它示例没有成员冲突

interface Eat {
  eat (food: string): void
}

interface Run {
  run (distance: number): void
}

class Person implements Eat, Run {
  eat (food: string): void {
    console.log(`优雅的进餐: ${food}`)
  }

  run (distance: number) {
    console.log(`直立行走: ${distance}`)
  }
}

class Animal implements Eat, Run {
  eat (food: string): void {
    console.log(`呼噜呼噜的吃: ${food}`)
  }

  run (distance: number) {
    console.log(`爬行: ${distance}`)
  }
}
```

#### 抽象类

```js
// 抽线类

export {} // 确保跟其它示例没有成员冲突

abstract class Animal {
  eat (food: string): void {
    console.log(`呼噜呼噜的吃: ${food}`)
  }

  abstract run (distance: number): void
}

class Dog extends Animal {
  run(distance: number): void {
    console.log('四脚爬行', distance)
  }
}

const d = new Dog()
d.eat('嗯西马')
d.run(100)
```

### 泛型

```ts
// 泛型

export {} // 确保跟其它示例没有成员冲突

function createNumberArray (length: number, value: number): number[] {
  const arr = Array<number>(length).fill(value)
  return arr
}

function createStringArray (length: number, value: string): string[] {
  const arr = Array<string>(length).fill(value)
  return arr
}

function createArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

// const res = createNumberArray(3, 100)
// res => [100, 100, 100]

const res = createArray<string>(3, 'foo')
```

### 类型声明

```ts
// 类型声明
// @types/lodash  lodash类型声明包

import { camelCase } from 'lodash'
import qs from 'query-string'

qs.parse('?key=value&key2=value2')

// declare function camelCase (input: string): string

const res = camelCase('hello typed')


export {} // 确保跟其它示例没有成员冲突
```

