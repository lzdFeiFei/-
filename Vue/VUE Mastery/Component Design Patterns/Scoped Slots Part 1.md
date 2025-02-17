# Scoped Slots: Part 1

## Introduction

------

Slots allow developers to have the flexibility to provide content to a child component, but what happens when the child component has control of the data? In these cases, scoped slots are here to come to the rescue.

## What are scoped slots?

------

Scoped slots is a technique for allowing a component to expose data to the slot’s template block. While that may sound like a mouthful, if we take the analogy of a crane game, slots allow us to put data into it from the parent.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F01-slots-crane.opt.gif?alt=media&token=73e27641-24ff-4ab9-a66e-f1f896ad6e86](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F01-slots-crane.opt.gif?alt=media&token=73e27641-24ff-4ab9-a66e-f1f896ad6e86)

However, when we want to access data from the child, standard slots will not give us permission to grab that data. As a result, we need to expose the data from the child so that we can grab it and put it in the slot as desired.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F02-crane-child.opt.gif?alt=media&token=3e9ce925-c1c0-4021-9f6d-c27e937e3233](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F02-crane-child.opt.gif?alt=media&token=3e9ce925-c1c0-4021-9f6d-c27e937e3233)

In terms of code, let’s take a look at a `Library.vue` and `Book.vue` example:

📄**Book.vue**

```html
<template>
  <div class="book">
    <slot name="title"></slot>
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

📄**Library.vue**

```html
<template>
  <Book>
    <template v-slot:title>
      <!-- How do we get the bookTitle from Book.vue? -->
    </template>
  </Book>
</template>
```

As we can see in the code example, the data is currently embedded in our `Book.vue` component and we need to some how render it in the `Library.vue` component. Let’s learn how we can use scoped slots!

## How do you use scoped slots?

------

To learn how to use scoped slots, let’s start with a standard named slot with a name of `header`.

📄**LogoHeader.vue**

```html
<template>
  <slot name="header" />
</template>
<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  }
}
</script>
```

In this scenario, let’s say that we want to expose our `logoImage` property to the slot. To do this, we define a prop (like you would with a normal component) on our slot.

📄**LogoHeader.vue**

```html
<template>
  <slot name="header" :logo="logoImage" />
</template>
<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  }
}
</script>
```

By defining these “slot props,” this allows us to access them in the `<template>` block by exposing the `slotProps` value.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F03-slotprops.opt.jpg?alt=media&token=22d8d15d-61cd-4aa0-a9e6-f417801280af](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F03-slotprops.opt.jpg?alt=media&token=22d8d15d-61cd-4aa0-a9e6-f417801280af)

Once we expose the slot props, this allows us to use it within that `<template>` block.

Using our code from this scenario, it would result in the following:

📄**LogoHeader.vue**

```html
<template>
  <slot name="header" :logo="logoImage" />
</template>
<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  }
}
</script>
```

📄**App.vue**

```html
<template>
  <LogoHeader>
    <template v-slot:header="slotProps">
      {{ slotProps.logo }}
    </template>
  </LogoHeader>
</template>
```

## Once Again for Reinforcement!

Using our `Library.vue` and `Book.vue` example from earlier in the lesson, let’s implement the `bookTitle` property using scoped slots.

### Step 1. Expose the data as props on the desired slots

📄**Book.vue**

```html
<template>
  <div class="book">
    <slot name="title" :bookTitle="bookTitle"></slot>
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

### Step #2. Expose slot props on your `<template>` block

📄**Library.vue**

```html
<template>
  <Book>
    <template v-slot:title="slotProps">
      <!-- How do we get the bookTitle from Book.vue? -->
    </template>
  </Book>
</template>
```

### Step 3. Use `slotProps` to render out the desired data

📄**Library.vue**

```html
<template>
  <Book>
    <template v-slot:title="slotProps">
      {{ slotProps.bookTitle }}
    </template>
  </Book>
</template>
```

And you’re done! Here is the complete code from top to bottom:

📄**Book.vue**

```html
<template>
  <div class="book">
    <slot name="title" :bookTitle="bookTitle"></slot>
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

📄**Library.vue**

```html
<template>
  <Book>
    <template v-slot:title="slotProps">
      {{ slotProps.bookTitle }}
    </template>
  </Book>
</template>
```

## Let’s ReVue

Believe it or not, you now have the fundamentals for using scoped slots! There are some caveats and best practices to keep in mind when using them, but we will get to that in the next lesson. See you there!