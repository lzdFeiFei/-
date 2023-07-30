# Type Fundamentals

## Introduction

One of TypeScript’s fundamental concepts is the ability to define static types that can be used to enhance development. In this lesson, we will be covering some of the most useful types that you should be aware of as you start your TypeScript journey.

## Overview of Types

### Basic Types

As a quick review, common JavaScript types that we often encounter in our code include:

- String
- Number
- Boolean
- Array
- Function
- Object

These form the foundation of most applications built with JavaScript, but in the world of programming, there are many other data structures that are worth knowing. To learn more about what types and data structures exist in JavaScript, check out [MDN’s documentation on JavaScript Data Types and Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

### New Types from TypeScript

While JavaScript comes with a lot of native types, TypeScript also offers additional types commonly found in other programming languages such as:

- `any` - allows you to assign any type to the variable, which is the basic equivalent of disabling type checking
- `tuple` - allows you to define an array that contains a fixed number of elements with certain types
- `enum` - allows you to define friendly names to sets of numeric values

We won’t be going over these types in this course, but if you want to level up your TypeScript abilities, you’ll definitely want to check out the [official documentation on TypeScript Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html).

## How to Apply a Type to a Variable

Now that we are familiar with these basic types, the natural next question is: “How do we apply these types to our variables?”

### String, Number and Booleans

In TypeScript, this is accomplished by appending our variable with the `:` and the desired type. Here are some examples using some basic types:

```typescript
let stageName: string = 'A Beautiful Vue'
let roomSize: number = 100
let isComplete: boolean = false
```

### Arrays

In TypeScript, defining arrays is not as straightforward as saying:

```typescript
let shoppingList: array = ['apple', 'bananas', 'cherries']
```

Because TypeScript is about being more explicit about what types are expected in the array, the notation for defining arrays is a little bit different. Using our `shoppingList` example from above, we know that the list should only include a strings. As a result, we define the type with:

```typescript
let shoppingList: string[] = ['apple', 'bananas', 'cherries']
```

### Function

When it comes to adding types to a function, there are a few ways to do this. However, regardless of the methodology, there are two key parts to keep in mind:

- Parameters
- Return

For the purposes of getting familiar with adding types to functions, we will be using the ES6 arrow function with a `generateFullName` method. Before adding any TypeScript, it might look something like this:

```typescript
let generateFullName = (firstName, lastName) => {
  return firstName + ' ' + lastName
}
```

However, as you might have guessed, this leaves us vulnerable to having random data types being passed into our function when we really only want strings to be passed in. So as a first step, we would define the types expected on our parameters, which in this case are strings.

```typescript
let generateFullName = (firstName: string, lastName: string) => {
  return firstName + ' ' + lastName
}
```

However, we’re not done yet! The one last thing we need to do is to define what type of data we expect to get from the function, which we do by using the colon (i.e., `:`) after the parameters.

```typescript
let generateFullName = (firstName: string, lastName: string): string => {
  return firstName + ' ' + lastName
}
```

### Object

In TypeScript, objects are where things begin to get more interesting, but before we get into those pieces, let’s start with the fundamentals of how to define types on object values. In the case of a person object:

```typescript
let person = {
  name: 'Peter Parker',
  age: 20,
  activeAvenger: true,
  powers: ['wall-crawl', 'spider-sense']
}
```

If we wanted to define the types that are expected for each key-value pair in the person object, we define the types through the following syntax:

```typescript
let person: {
  name: string;
  age: number;
  activeAvenger: boolean;
  powers: string[];
} = {
  name: 'Peter Parker',
  age: 20,
  activeAvenger: true,
  powers: ['wall-crawl', 'spider-sense']
}
```

At first glance, this might look really odd. After all, it looks like you’re defining the object twice. In addition, you might have also noticed that the type is not a traditional object because there are semi-colons (i.e., `;`) instead of commas (i.e., `,`).

### Limitations of Predefined Types

While a lot of incredible things has and can be built with pre-defined types provided to us by JavaScript and TypeScript, the reality is that there leaves something left to be desired when providing more descriptive types.

For example, what if we wanted to define a custom type that only allowed developers to use a predefined set of button styles (e.g., primary, secondary, error, disabled) on a variable?

Based on our current knowledge of TypeScript, we would start with a variable that is typed to a string:

```typescript
let buttonStyles: string = 'primary'
```

However, while there is a type assigned to `buttonStyles`, it doesn’t do much as far as protecting developers from assigning the wrong style type to it. This is where we need to take our knowledge to the next level with defining custom types.

## Let’s ReVue

In this lesson, we covered fundamental knowledge of taking the basic types that most JavaScript developers are already familiar with and applying them as types with TypeScript. In the next lesson, we’ll be learning how to use one of TypeScript’s most useful feature: the ability to define custom types.