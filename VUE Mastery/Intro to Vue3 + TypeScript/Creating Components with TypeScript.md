# Creating Components with TypeScript

## Introduction

In the last lesson, we learned how to setup a project with TypeScript and Vue CLI. In this lesson, we’ll take a look at what changes have happened inside of our Single File Components.

## TypeScript Changes in Single File Components

### The Language Attribute

One of the most important changes that have happened in our Single File Components (SFC) is that our block now contains a attribute, which stands for language. This is more commonly seen on the block where we declare the use of pre-processors such as Sass.

Given that we want to use TypeScript with our SFCs, this means we also need to configure that on our block by assign the value of to the property.

- `<script lang="ts">`

### defineComponent Method

One of the newer things that takes some getting used to in Vue 3 is the importing of helper methods. And while we typically define components in Single File Components (SFC) by writing:

- `export default { ... }`

However, when we want to use TypeScript, we need to be explicit with TypeScript that we are declaring JavaScript specific to the SFC. As a result, we have to use a helper method from Vue called .

- `import { defineComponent } from 'vue'`

Once we have this, you’ll see that we use it by passing the object we typically export inside of this function:

- `export default defineComponent({ ... })`

## Upgrading Real World Vue App Component

To put what we’ve learned in practice, we will be enhancing the components from Adam Jahr’s [Real World Vue 3](https://www.vuemastery.com/courses/real-world-vue3/) app that he builds in the course.

To get started, check out the [Real World Vue 3 TypeScript GitHub Repo](https://github.com/Code-Pop/Real-World-Vue-3-TypeScript). In here, the project has already been upgraded, and we’ll start upgrading our components in here for exercises.

For this lesson, we’re going to upgrade the together.

```html
<script>
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
```

Following the steps from before, we need:

- Defining the attribute on the block
- Import the helper method
- Pass the exported object to

And when we’re done, it should look like this!

```html
<script lang="ts">
import { defineComponent } from 'vue'

import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService'

export default defineComponent({
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
})
</script>
```

## Challenge

For this lesson, I challenge you to upgrade the `EventCard.vue` and `EventDetails.vue` components. You can find the starting point for the challenge on the `03-challenge` branch.

Good luck!

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/03-begin

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/03-end

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/03-challenge