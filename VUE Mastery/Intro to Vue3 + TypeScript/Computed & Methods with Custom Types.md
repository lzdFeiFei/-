# Computed & Methods with Custom Types

As we begin to wrap up our journey together with the fundamentals of using TypeScript with Vue 3, it’s time we learned how to add custom types to computed properties and methods.

## Custom Types with Computed Properties

Let’s start with computed properties.

Here we have a standard single file component where the language in the script block is marked for TypeScript.

```html
<script lang="ts">
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  data() {
    return {
      events: []
    }
  },
  computed: {
    secondEvent() {
      return this.events[1]
    }
  }
})
</script>
```

We’re importing our `defineComponent` helper method from vue as well as a custom `EventItem` type that you should recognize from previous lessons.

Using what we learned in Data with Custom Types, we know that we can type our events array by using the keyword `as` to tell TypeScript that it is an array of `EventItem`s.

```html
<script lang="ts">
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  data() {
    return {
      events: [] as EventItem
    }
  },
  computed: {
    secondEvent(): EventItem {
      return this.events[1]
    }
  }
})
</script>
```

But what about our computed property?

When it comes to computed properties, the key thing to remember is that you want to focus on what the computed property is returning. In other words, using our example, we need to define what type that `secondEvent` will end up returning.

To do this, we use the syntax of the `:` and the following it with the custom type the function should return:

```html
<script lang="ts">
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  data() {
    return {
      events: [] as EventItem
    }
  },
  computed: {
    secondEvent(): EventItem {
      return this.events[1]
    }
  }
})
</script>
```

Believe it or not, just like that, you’ve successfully added a custom type to your computed property!

## Custom Types with Methods

Now let’s shift gears to how we add custom types to methods. Let’s start again with our component with a small change where we have an `addEvent` method.

```html
<script lang="ts">
import { defineComponent } from 'vue'
import { EventItem } from '../types'

export default defineComponent({
  data() {
    return {
      events: [] as EventItem[]
    }
  },
  methods: {
    addEvent(newEvent) {
      this.events.push(newEvent)
    }
  }
})
</script>
```

In our `addEvent` function, we can see that it takes in a parameter of `newEvent` and adds it to the `events` data that we’re tracking inside of `data()`.

When it comes to adding custom types to methods, there are two key things to keep in mind:

1. Do we need to add types to the parameters being passed into the method?
2. Do we need to add types to whatever is being returned by the method?

### Adding Custom Types to the Parameter of a Method

In this particular function, our focus is on add a custom type to the parameter `newEvent`, which should a type of `EventItem`. And we can accomplish this by using the `:` syntax:

```typescript
addEvent(newEvent: EventItem) {
  this.events.push(newEvent)
}
```

### Adding Custom Types to the Return Value of a Method

For this scenario, let’s change up the method to fetching the second event:

```typescript
secondEvent() {
  return this.events[1]
}
```

If you’re thinking this looks similar to the computed properties example we saw earlier, you’d be correct! The solution to typing your method’s return value is exactly the same.

```typescript
secondEvent(): EventItem {
  return this.events[1]
}
```

And with that, you know all you need to add custom types to your methods!

## Let’s ReVue

In this lesson, we’ve learned how to apply custom types to computed properties by focusing on what is being returned. And finally, for methods, we need to make sure we check whether our parameters and return value need any custom types.

That’s it for this lesson. See you in the next one!