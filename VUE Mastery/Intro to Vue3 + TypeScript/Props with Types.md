# Props with Types

## Introduction

In the last lesson, we learned how to apply custom types to our data option. So in this lesson, we’re going to continue our journey with TypeScript and Vue 3 by learning how to apply custom types to props. And if you want to follow along, be sure to check out branch `07-begin`.

## Default Prop Types

When we open up `EventDetails.vue`, you may have noticed that we have no prop typing on this.

```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['id']
})
```

Using standard Vue prop types, we can define this better by using the Object syntax in order to other developers know that the `id` should be of type `Number` and that it is required.

```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
})
```

This is great and is useful for a lot of scenarios, but when we look at our `EventCard` component, we’ll see that we have a prop type applied. That said, while it’s useful to know it should be an `Object`, it’d be much more informative if we can tell developers how the object is defined.

## Applying a Custom Type to Props

Your first instinct from applying custom types to our data property is probably to swap out `Object` for our `EventItem` type, but this won’t work. After all, `EventItem` is a TypeScript type — which means it is TypeScript specific — and not something that JavaScript itself can evaluate.

Your next thought might be to use our new `as` keyword to assert the type, and you would be close, but this won’t work either. The reason for this is because with props in Vue, Vue provides additional functionality to check props that go beyond TypeScript. Before we can dive into this, we need to first learn about TypeScript generics.

### TypeScript Generics

At this point, we have learned how to type basic functions in TypeScript.

```typescript
function createList(item: number): number[] {
    const newList: number[] = []
  
    newList.push(item)
  
    return newList
}

const numberList = createList(123)
```

With this, you get type safety, but the function is rather limiting isn’t it? And if we were to rename it properly, we’d probably want to call it `addNumberToNumberList`, but this wouldn’t be very reusable then. So the question is, how would we make this more reusable?

In TypeScript, this is solved with the concept of “Generics.” At a high level, they allow you to define a dynamic type that is reused in the function later on. The key marker that generics are being used is when a function is appended with the `<>` bracket, which allows you to pass in a type rather than a JavaScript value that is passed in parentheses instead. So the code we had before would become:

```typescript
function createList<CustomType>(item: CustomType): CustomType[] {
    const newList: CustomType[] = []
  
    newList.push(item)
  
    return newList
}

const numberList = createList<number>(123)
```

Before we move on though, I do want to note that even though it’s incredibly confusing to new users and can make for difficult to read code, it is a convention in the TypeScript community to use single letter variables — starting with T — when defining custom types in generics.

So out in other code bases, the same code above would look like this:

```typescript
function createList<T>(item: T): T[] {
    const newList: T[] = []
  
    newList.push(item)
  
    return newList
}

const stringList = createList<T>(123)
```

Now that we know this, it’s time to get a little help from Vue to finish our task!

### PropType Helper Method

In Vue 3, when we want to apply custom types to props, we need the built-in helper method called `PropTypes`. You can use it by importing it from Vue directly.

```javascript
import { PropTypes } from 'vue'
```

And while this may look straightforward at first. The reason we needed to learn about TypeScript generics is because Vue 3’s `PropType` helper method utilizes generics in order order to provide us the benefits of both prop validation and custom types.

Using our new syntax, we can update our `EventCard.vue` to the following:

```typescript
import { defineComponent, PropType } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<EventItem>,
      required: true
    }
  },
})
```

So if you think about it another way, this is how we tell Vue that the prop value should be a type of `PropType` and `EventItem`. And just like that, you’ve now successfully added a custom type to your prop!

## Let’s Revue

In this lesson, we learned about the PropType helper method, the concept of generics, and how we combine them with type assertion to apply custom types to our props.

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/07-begin

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/07-end