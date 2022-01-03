# Data with Custom Types

## Introduction

Now that we know how to define custom types, it’s time for us to apply our new abilities to Vue itself! To start, we will be taking a look at the data option first.

## The Problem

When we open up `EventDetails.vue`, one of the problems that might not be immediately obvious for those of us who haven’t used types before is that currently our editor cannot provide much help in terms of what is valid or not.

**📄 EventDetails.vue**

```html
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
```

For example, while we reference `event.id`, there’s nothing to inform us that this is an attribute that exists. In fact, the only way to really check is to wait until the code runs. And while this might not seem like a huge impediment at first, this can cause a lot of issues when the data becomes more complex.

## Introducing VueDX

So how do we get our editor to help us? Well, the first step is to install a new VS Code extension called [VueDX](https://marketplace.visualstudio.com/items?itemName=znck.vue-language-features&ssr=false).

It is a new extension designed to enhance our developer experience with Vue in a lot of different ways. We won’t have time to cover everything in this lesson, but just know it’s worth taking a closer look at!

Once we’ve installed it and restarted VS Code, one of the first things you may notice is that our editor is now reporting errors. This is great!

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1610899459045.jpg?alt=media&token=868b4cdb-0728-4050-96e0-50a7cbff92b2](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1610899459045.jpg?alt=media&token=868b4cdb-0728-4050-96e0-50a7cbff92b2)

Now let’s fix these errors!

## Defining the Event Custom Type

The reason we are seeing this error is that as can see in our component definition, `events` is actually defined as `null`.

**📄 EventDetails.vue**

```jsx
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EventDetails',
  data() {
    return {
      event: null
    }
  },
})
```

And as far as types are concerned, `null` will never have a property of `title`, `time`, etc. so the errors we are seeing make sense.

So to fix this, let’s start by tracing back to how the Event type should be structured. The way we do this is to trace our steps back to where the data source is coming from, which is an API call in `EventService.ts`

**📄 EventService.vue**

```jsx
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '<https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3>',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
```

When we visit the page, we can navigate the site to find examples of our event. And what we end up with looks something like this:

```json
[
  {
    "id": 123,
    "category": "animal welfare",
    "title": "Cat Adoption Day",
    "description": "Find your new feline friend at this event.",
    "location": "Meow Town",
    "date": "January 28, 2022",
    "time": "12:00",
    "organizer": "Kat Laydee"
  }
]
```

With this, we can now say with confidence that `events` should be an Array that contains a series of objects with the following properties:

- id
- category
- title
- description
- location
- date
- time
- organizer

So, to get started, we’ll begin by defining a `types.ts` in the `src` directory to centralize where types are defined in order to also allow other files to import types as needed. And in here, we’ll go ahead and define our `EventItem` type.

**📄 types.ts**

```typescript
export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: string
}
```

To clarify, we could certainly dive deeper into refining the types for the individual properties of `EventItem`, but for this lesson, I’ve kept it simple for now.

Now that we have defined `EventItem` and made it importable with the `export` keyword, let’s import it into `EventDetails.vue`.

**📄 EventDetails.vue**

```jsx
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  name: 'EventList',
  data() {
    return {
      event: null
    }
  },
})
```

At this point though, you might be wondering, “Well, how do I add `EventItem` as a type to events?” And you’d be right, because as it stands right now, we need to learn a new technique before we can type our events property: type assertions.

## What are type assertions?

At its core definition, type assertions allow you to override the inferred type by the editor. In other words, it is a way for you to tell the compiler that you know more about the type than it does.

For example, if we have a type called `TodoItem` and an empty object:

```typescript
interface TodoItem {
  label: string
  complete: boolean
}

const futureTodoItem = {}

futureTodoItem.label = 'Install VueDX extension'
futureTodoItem.complete = false
```

TypeScript by default, will infer that `futureTodoItem` is simply an empty object that should not have any properties in it and will report errors stating as such. But we know it should be a `TodoItem` type, so we can tell TypeScript this by using the `as` keyword to override the default behavior.

```typescript
interface TodoItem {
  label: string
  complete: boolean
}

const futureTodoItem = {} as TodoItem

futureTodoItem.label = 'Install VueDX extension'
futureTodoItem.complete = false
```

And just like that, everything works now!

## Use Type Assertion to Define Types in Data

Equipped with our new abilities, let’s fix our type in `EventDetails` now!

**📄 EventDetails.vue**

```typescript
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  name: 'EventDetails',
  data() {
    return {
      event: null
    }
  },
})
```

We know that `event` should be an object, so we can start by switching out `null` for `{}`.

**📄 EventDetails.vue**

```typescript
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  name: 'EventDetails',
  data() {
    return {
      event: {}
    }
  },
})
```

But we need to go one step further since we want to tell TypeScript that it is an object of `EventItem` type. And we can accomplish this with our new `as` keyword!

**📄 EventDetails.vue**

```typescript
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  name: 'EventDetails',
  data() {
    return {
      event: {} as EventItem
    }
  },
})
```

And just like that, we’ve now properly typed our `data` property!

## Code Challenge

Now that you know how to add custom types to the data option, checkout the `06-challenge` branch and define the correct custom type for `EventList.vue`.

## Let’s ReVue

In this lesson, we’ve learned about the new VueDX extension, what type assertions are, and how to use the new `as` keyword in order to define custom types in our data option in Vue 3.

In the next lesson, we’ll be taking a look at how to define props with custom types. See you there!

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/06-begin

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/06-end

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/06-challenge