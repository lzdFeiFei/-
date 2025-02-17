# Scoped Slots: Part 2

## Introduction

In the last lesson, we learned the fundamentals for using scoped slots and how they help us solve the problem accessing a child’s data in the slot template. In this lesson, I will cover some of the limitations to scoped slots as well as alternative syntax for scoped slots that you may see in other codebases.

## Why it is called “scoped” slots

Let’s start by looking at our child component:

**📄Book.vue**

```html
<template>
  <div class="book">
    <slot name="title" :bookTitle="bookTitle" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookTitle: 'Child Providing Data'
    }
  }
}
</script>
```

It provides the `bookTitle` data to the `title` slot, which we then access in our parent component:

📄**Library.vue**

```html
<template>
  <Book>
    <template v-slot:title="slotProps">
      <h1>{{ slotProps.bookTitle }}</h1>
    </template>
  </Book>
</template>
```

With the `bookTitle` property exposed via `slotProps`, a common misconception is that it is now available to the parent component for use in things like methods, computed properties, or something else.

So in the event we wanted to create an `uppercaseTitle` in our `Library.vue` component, we might try to write code like this:

📄**Library.vue**

```html
<template>
  <Book>
    <template v-slot:title="slotProps">
      <h1>{{ slotProps.bookTitle }}</h1>
    </template>
  </Book>
</template>
<script>
export default {
  computed: {
    uppercaseTitle() {
      // 🛑THIS DOES NOT WORK
      this.slotProps.bookTitle.toUpperCase()
    }
  }
}
</script>
```

But this will not work, because the data that the child is exposing to the parent is only **scoped** to the slot template block.

While this may seem like an inconvenience, this ultimately helps developers by encouraging us to keep the concerns for each component in the correct place. In other words, rather than try to create a computed property in our `Library.vue` component, it would be more consistent to keep that logic inside of `Book.vue` instead and then expose it via slot props.

**📄Book.vue**

```html
<template>
  <div class="book">
    <slot name="title" 
      :bookTitle="bookTitle" 
      :uppercaseBookTitle="uppercaseTitle"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookTitle: 'Child Providing Data'
    }
  },
  computed: {
    uppercaseTitle() {
      return this.bookTitle.toUpperCase()
    }
  }
}
</script>
```

So to reinforce the concept once more, any data exposed via slot props is scoped to the slot template and nothing more.

## Destructuring slot props

When using slot props, it’s a common desire for developers to find ways to make their code more concise, in other words, less code. And because `slotProps` results in a JavaScript object, we can use ES6 destructuring to make our code a little easier to read.

📄**Library.vue (before)**

```html
<template>
  <Book>
    <template v-slot:title="slotProps">
      <h1>{{ slotProps.bookTitle }}</h1>
    </template>
  </Book>
</template>
```

📄**Library.vue (after)**

```html
<template>
  <Book>
    <template v-slot:title="{ bookTitle }">
      <h1>{{ bookTitle }}</h1>
    </template>
  </Book>
</template>
```

### Single v-slot abbreviated shorthand

In the last lesson, remember how I said that `v-slot` should only be applied to the `template` element? Well, I lied 😅. There is technically an exception, and we shall go over it now.

When a component is being used with only a single slot, just like how our `Book.vue` component has a single `title` slot.

📄**Library.vue (before v-slot abbreviated shorthand)**

```html
<template>
  <Book>
    <template v-slot:title="{ bookTitle }">
      <h1>{{ bookTitle }}</h1>
    </template>
  </Book>
</template>
```

You can actually apply the `v-slot` directive directly to the component directly and remove the `template` blocks.

📄**Library.vue (with v-slot abbreviated shorthand)**

```html
<template>
  <Book v-slot:title="{ bookTitle }">
    <h1>{{ bookTitle }}</h1>
  </Book>
</template>
```

However, **the moment you need to use another slot, this does not work**. For example, if our `Book.vue` component had an addition `description` slot. You may be tempted to try to write something like

**📄Library.vue (with multiple slots and incorrect syntax)**

```html
<template>
  <Book v-slot:title="{ bookTitle }">
    <h1>{{ bookTitle }}</h1>    
    <!-- 🛑THIS DOES NOT WORK -->
    <template v-slot:description>
      <p>My Description</p>
    </template>
  </Book>
</template>
```

But this will not work! The moment you need more than one slot, you must go back to template blocks.

**📄Library.vue (with multiple slots)**

```html
<template>
  <Book>
    <template v-slot:title="{ bookTitle }">
      <h1>{{ bookTitle }}</h1>
    </template>
    <template v-slot:description>
      <p>My Description</p>
    </template>
  </Book>
</template>
```

As a result, I personally recommend that as a best practice, just stick with `template` blocks when using slots.

## Let’s ReVue

And with that, you are now fully equipped to use scoped slots in your Vue.js app while understanding some alternative syntax you may encounter in other codebases.