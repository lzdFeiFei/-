# Bonus: Composition API with TypeScript

## Introduction

Welcome to the bonus lesson for this course! Now, while we’ve been using the Options API for this entire course, I want you to know that everything you’ve learned is just as relevant for the Composition API! So, let’s jump right in shall we?

## Todo App Demo

To start, let’s go ahead and check out our demo app.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1615249432795.jpg?alt=media&token=fa5523a2-622d-42d4-9bd0-002946517983](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1615249432795.jpg?alt=media&token=fa5523a2-622d-42d4-9bd0-002946517983)

Inside of the repo, I’ve scaffolded a temporary Todo page to demo Composition API with TypeScript. It is currently defined in `router/index.ts` and `views/Todo.vue`.

It allows you to do things such as:

- Define the task label
- Determine what type the task is
- Toggle the state of whether the task is complete
- Filter the current list of tasks based on whether it is complete or not.

### How It Is Built with Options API

When we open up `Todo.vue`, you’ll see that we have the functionality already built using what we’ve learned in this course using Options API and TypeScript.

We have two custom types that are defined in `types.ts`:

**📄 types.ts**

```typescript
type TaskType = 'personal' | 'work' | 'miscellaneous'

export interface TodoItem {
  label: string
  type: TaskType
  isComplete: boolean
}
```

There is the custom type of `TaskType` which only takes:

1. personal
2. work
3. miscellaneous

And then there’s the custom interface of `TodoItem` which leverages our `TaskType` to help better define the shape of the data.

Inside of our single-file component, we have our reactive data that is being tracked inside the `data` option and is also properly typed:

- `newTask` is an object which should conform to our custom type `TodoItem`
- `taskItems` which contains an array of `TodoItem`

**📄 views/Todo.vue**

```typescript
import { defineComponent } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  data: () => ({
    newTask: {
      label: '',
      type: 'personal'
    } as TodoItem,
    taskItems: [] as TodoItem[],
    listFilter: 'all'
  }),
  ...
})
```

Then we also have our computed property which is also properly typed:

**📄 views/Todo.vue**

```typescript
import { defineComponent } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  // data option removed for brevity
  computed: {
    filteredTasks(): TodoItem[] {
      if (this.listFilter === 'complete') {
        return this.taskItems.filter(
          (item: TodoItem) => item.isComplete === true
        )
      } else if (this.listFilter === 'incomplete') {
        return this.taskItems.filter(
          (item: TodoItem) => item.isComplete === false
        )
      } else {
        return this.taskItems
      }
    }
  }
})
```

Here you can see that we define the return value of `filteredTasks`, which should be an array of `TodoItem`. In addition, you’ll also notice that we are typing the argument being used in the `.filter` method so provide better developer experience with auto-detection of properties.

Now that we’ve covered how it was built, let’s refactor it using the Composition API!

If you’re new to the Composition API, I recommend checking out Gregg’s course on [Vue 3 Composition API](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/)

## Refactoring to Composition API

To start using the Composition API, we start by setting up our `setup` function:

**📄 views/Todo.vue**

```typescript
import { defineComponent } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  setup() {
    // Our code goes in here!
  }
})
```

Then, we’ll go ahead and migrate our `data` option into our `setup` method using the `reactive` helper method, which is my personal preference as it mirrors closely to our existing mental model of how reactive data works with Vue.

```typescript
import { defineComponent, reactive } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  setup() {
    const state = reactive({
      newTask: {
        label: '',
        type: 'personal'
      } as TodoItem,
      taskItems: [] as TodoItem[],
      listFilter: 'all'
    })

    return {
      state
    }
  }
})
```

As you can see, even though we’re working in the Composition API, the types still work exactly as expected! No additional work needed!

Now we also want to clean up the need to reference `state` in our template, so let’s use the `toRefs` helper method to allow us to destructure our state without breaking its reactivity.

```typescript
import { defineComponent, reactive, toRefs } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  setup() {
    const state = reactive({
      newTask: {
        label: '',
        type: 'personal'
      } as TodoItem,
      taskItems: [] as TodoItem[],
      listFilter: 'all'
    })

    return {
      ...toRefs(state)
    }
  }
})
```

Next, we’ll want to migrate our `computed` property, which we can do by using the `computed` helper method! Unlike the `data` option refactor though, there’s one big difference: there’s less code!

```typescript
import { defineComponent, reactive, toRefs } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  setup() {
    const state = reactive({
      // Omitted for brevity
    })

    const filteredTasks = computed(() => {
      if (state.listFilter === 'complete') {
        return state.taskItems.filter(
          (item: TodoItem) => item.isComplete === true
        )
      } else if (state.listFilter === 'incomplete') {
        return state.taskItems.filter(
          (item: TodoItem) => item.isComplete === false
        )
      } else {
        return state.taskItems
      }
    })

    return {
      ...toRefs(state),
      filteredTasks
    }
  }
})
```

When defining types in computed properties in the Options API, we needed to be explicit about what was returned. However, when using the Composition API, you don’t need to do that since TypeScript can infer the type that’s returned!

The final touch is to add the methods to our `setup` method, which we can do without any helper methods since a method is the equivalent of a standard JavaScript function.

```typescript
import { defineComponent, reactive, toRefs } from 'vue'
import { TodoItem } from '../types'

export default defineComponent({
  setup() {
    const state = reactive({
      newTask: {
        label: '',
        type: 'personal'
      } as TodoItem,
      taskItems: [] as TodoItem[],
      listFilter: 'all'
    })

    const filteredTasks = computed(() => {
      if (state.listFilter === 'complete') {
        return state.taskItems.filter(
          (item: TodoItem) => item.isComplete === true
        )
      } else if (state.listFilter === 'incomplete') {
        return state.taskItems.filter(
          (item: TodoItem) => item.isComplete === false
        )
      } else {
        return state.taskItems
      }
    })

    const addTask = () => {
      state.taskItems.push(state.newTask)
    }

    return {
      ...toRefs(state),
      addTask
      filteredTasks
    }
  }
})
```

And believe it or not, we’re done!

## Let’s ReVue

Alright. Let’s review. For this lesson, we’ve taken a look at how the experience between Options API and Composition API can be different TypeScript wise in that Composition API is more friendly to TypeScript, but at the end of the day, you can still apply the concepts you learned about in this course in both contexts.

Thanks for watching and learning Vue 3 and TypeScript with me!



https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/10-begin

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript/tree/10-end