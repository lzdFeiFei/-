https://262.ecma-international.org/6.0/#sec-terms-and-definitions-object

https://262.ecma-international.org/5.1/#sec-15.3

创建对象

1. {}
2. Object.create 显示指定
3. 构造函数 隐式指定
   1. new Object() 
   2. 自定义 

```js
let obj1 = {};
const p = { p: 1 };
let obj2 = Object.create(p);
let obj3 = new Object();
function Person() {
    this.name = 'wang';
}
let person = new Person();

console.log(obj1.__proto__);
console.log(obj2.__proto__);
console.log(obj3.__proto__);
console.log(p.__proto__);
```



脑海中要强调**原型对象**的概念，而 `__proto__` 和 `prototype`只是指向这个原型对象的一个表示。

## 原型链

原型对象之间的链式关系就构成了**原型链**。

对象可以访问其原型链上的方法和属性。

```js
function Person(){
    this.name='wang'
}
let person = new Person()
console.log(person.name) // wang
console.log(person.age)  // undefined
console.log(person.job)  // undefined

Person.prototype.age = 12
console.log(person.name) // wang
console.log(person.age)	 // 12 
console.log(person.job)  // undefined

Object.prototype.job = 'manong'
console.log(person.name) // wang
console.log(person.age)  // 12
console.log(person.job)  // manong
```

## 原型的用途

类和继承

两个构造函数建立关系



## 相关术语概念

为了将原型这个知识吃透，我们先要明确和这个知识点相关的术语及概念

`ECMAScript® 2015 Language Specification`

> `The Object Type` ：对象数据类型；
>
> `object` ：对象数据类型的成员，也就是平时使用的对象；
>
> `function`：函数对象，可以作为子例程调用的对象类型的成员，也就是我们使用的函数；
>
> `prototype`：原型（对象），为其他对象提供共享属性的对象；
>
> `constructor`： 构造器（构造函数），创造和初始化对象的函数对象，每个构造器都有一个`prototype属性`；
>
> `The Object Constructor`：对象构造函数，**内置**，用于创建`object`
>
> `The Function Constructor`：函数对象构造函数，**内置**，用于创建`function`

>  `[[Prototype]]` ：`ECMAScript`中定义的内置属性，这个属性的值可以是null，也可以是一个对象，用于实现继承。可以通过内置方法`[[GetPrototypeOf]]`获取，`[[SetPrototypeOf]]`设置
>
> `__proto__` ：浏览器内部实现的对象的访问属性，通过`get __proto__`和`set __proto__`来获取和设置 `[[Prototype]]`
>
> `constructor.prototype`：每个构造器具有的属性，指向该构造器的原型对象。



- 对象、函数（对象）、原型对象、构造器（构造函数）**区别和联系** `__proto__`  `[[Prototype]]` `prototype`
- 内置部分的原型关系（已完成）
- 开发时的原型关系
  - 创建函数
  - 创建对象
- 原型链

Object.prototype Object 内置