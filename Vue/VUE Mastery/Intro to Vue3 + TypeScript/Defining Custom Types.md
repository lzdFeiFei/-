# Defining Custom Types

## Introduction

As we saw in the last lesson, predefined types are incredibly helpful for a number of common scenarios. However, as applications grow in size and complexity with unique requirements, it’s inevitable that there will be a need for custom types. And when you want to define custom types in TypeScript, there are two methods that account for most scenarios early on: `type` and `interface`.

## What is `type`?

In its simplest form, `type` allows you to define an alias that refers to a specific way that the data should be shaped. For example, in the last lesson, we were faced with a problem where wanted to confine our `buttonStyles` variables to certain CSS classes based on a design system.

```typescript
let buttonStyles: string = 'primary'
```

Given our knowledge at this point, the best we could do was limit it to a string. However, through the use of `type`, we can accomplish our goal.

### How to use `type`?

Similar to declaring a variable, you use `type` as a declaration of the variable type.

```typescript
type buttonType = 'primary'
```

In this starting example, we’ve declared a type called `buttonType` that contains that value `'primary'`. And similar to standard type declaration, we can apply this type to our initial example:

```typescript
let buttonStyles: buttonType = 'primary'
```

As it stands, our `buttonStyles` is a valid variable because it matches our defined type. At this time, if someone tried to switch the value of `buttonStyles` to:

```typescript
let buttonStyles: buttonType = 'secondary'
```

TypeScript would report an error, which is what we expect since `buttonType` can only be a value of `'primary'` at this time. So what if we need multiple values?

### How to define multiple values?

In the event that you need to allow a type to contain multiple values, this is where the union operator comes in. The union operator can be identified by a single pipe `|` and is most similar to what we’re familiar with in JavaScript as `||` or in other words, the “OR” operator.

With this knowledge, let’s continue enhancing our `buttonType` example with the remaining valid button types.

```typescript
type buttonType = 'primary' | 'secondary' | 'success' | 'danger'
```

And now when we apply it, we can ensure that all `buttonType` variables have the correct value!

```typescript
// TypeScript will report an error because this doesn't exist in the type!
const errorBtnStyles: buttonType = 'error'

// This variable is type safe!
const dangerBtnStyles: buttonType = 'danger'
```

Equipped with this new knowledge, we are now able to complete our `buttonStyles` as intended.

## What is an `interface`?

When getting started with `interface`, the way I like to think about it is a way to define a `type` for an object. To show this in action, let’s take a look at an object we defined In the last lesson.

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

As we can see here, even though the data isn’t too complicated, it’s already fairly verbose and adds clutter to our code. Wouldn’t it be nice if it could look something like this instead?

```typescript
let person: Hero = {
	name: 'Peter Parker',
	age: 20,
	activeAvenger: true,
	powers: ['wall-crawl', 'spider-sense']
}
```

Well, with an `interface`, you can totally do this!

### How to define an `interface`?

Just like a `type`, you declare an `interface` by prefixing the variable name with `interface`. So using our hero example from above, it would start out looking like this:

```typescript
interface Hero { } 
```

Once we have this structure in place, then it’s only a matter of defining our object types within the `interface`.

```typescript
interface Hero {
	name: string;
	age: number;
	activeAvenger: boolean;
	powers: string[];
}
```

And just like that, we can now define variables that will be checked against the type `Hero`!

### Can you use `type` in an interface?

Let’s say we want to enhance our `Hero` interface by defining what comic-book universe they live in. Well, without the use of `type`, it might look like this:

```typescript
interface Hero {
	name: string;
	age: number;
	activeAvenger: boolean;
	powers: string[];
	universe: string;
}
```

But like most applications, this isn’t useful given we want to restrict the `universe` property to only contain `Marvel` or `DC` as a value. Well, it looks like it’s time to call upon our power of `type`!

```typescript
type ComicUniverse = 'Marvel' | 'DC'

interface Hero {
	name: string;
	age: number;
	activeAvenger: boolean;
	powers: string[];
	universe: ComicUniverse;
}
```

And just like that, we’ve now combined our `interface` and `type` together!

## Let’s ReVue

------

In this lesson, you’ve learned how to define custom types using the `type` and `interface` types. In addition, you’ve learned about union operators as a way to add more flexibility to our custom type definitions.

That said, I want to stress the importance that this lesson equips you with what you need to get started with `type` and `interface`, but there is more to explore on your own if you choose to. And while you will see lots of different opinions within the TypeScript community as far as how they should be used, my recommendation for your initial mental model is to use `interface` for objects, and use `type` for everything else.

Thanks for watching, and I’ll see you in the next lesson.