# JS 原型初步理解

## 相关术语概念

为了将原型这个知识吃透，我们先要明确和这个知识点相关的术语及概念，以下概念参考了`ECMAScript® 2015 Language Specification`：

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
> `[[Prototype]]` ：`ECMAScript`中定义的内置属性，这个属性的值可以是null，也可以是一个对象，用于实现继承。可以通过内置方法`[[GetPrototypeOf]]`获取，`[[SetPrototypeOf]]`设置
>
> `__proto__` ：浏览器内部实现的对象的访问属性，通过`get __proto__`和`set __proto__`来获取和设置 `[[Prototype]]`
>
> `constructor.prototype`：每个构造器具有的属性，指向该构造器的原型对象。
>
> `The Object Constructor`：对象构造函数，**内置**，用于创建`object`。该构造函数有一个对应的**原型对象**（我叫它`O`），由`Object.prototype`指向，且该对象的`[[Prototype]]`属性指向`null`。
>
> `The Function Constructor`：函数对象构造函数，**内置**，用于创建`function`。该构造函数有一个对应的**原型对象**（我叫它`F`），由`Function.prototype`指向，且`Function.prototype`是一个函数对象，但是该对象并没有`prototype`属性（不要问为什么，规范就这么定的=￣ω￣=）。该对象的`[[Prototype]]`属性指向`O`。

想要理解好原型这个知识点，就要在脑海中要强调**原型对象**的概念，而 `__proto__` 和 `prototype属性`只是指向这个原型对象的一个表示。

## 理解JS原型生成步骤

以下是个人对JS各种对象之间的原型关系的一个理解，不一定和实际相符，但是我觉得有助于理解原型这个知识

### JS内置对象

1. 内存中创建一个null
2. 内存中创建一个对象`O:{}`（O只是代表这个对象，方便描述，并不表示有个变量叫O，其值指向对象的内存地址，下同），然后设置O的`__proto__`为`null`，得到`O:{__proto__:null}`
3. 内存中创建一个**函数**`F:{}`，然后设置F的`__proto__`为O，得到`F:{__proto__:O}`
4. 内存中创建一个对象 `Function：{}`（对，就是创建函数的构造函数）。因为它是一个对象，所以有`Function:{__proto__:F}`。同时，将`F`的`constructor`设置为`Function`，也就有了`F:{__proto__:O, constructor: Funtion}`。此外，因为它是一个函数，所以又添加了一个属性`Function.prototype = F` 
5. 内存中创建一个对象 `Object：{}`（对，就是创建对象的构造函数）。因为它是一个对象，所以有`Object:{__proto__:F}`。同时，将`O`的`constructor`设置为`Object`，也就有了`O:{__proto__:null, constructor: Object}`。此外，因为它是一个函数，所以又添加了一个属性`Object.prototype = O` 

### 创建的对象

### 创建函数

```js
function fn(){}
```

1. `fn.__proto__ = Function.prototype`
2. 创建一个伴生对象，并将该对象的`constructor`设置为该函数。`{constructor: fn}`
3. 将该函数的`prototype`属性设置为该对象，即 `fn.prototype = {constructor: fn}`

### 创建对象

1. 字面量`{}`*隐式指定原型*
2. `Object.create` *显示指定*
3. 构造函数 *隐式指定*
   1. `new Object()` 
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

#### 参考资料

https://262.ecma-international.org/6.0/#sec-terms-and-definitions-object

https://262.ecma-international.org/5.1/#sec-15.3