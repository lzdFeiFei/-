# Suspense

When we code up Vue apps we use API calls a lot to load in back-end data. When we are waiting for this API data to load, it’s a good user interface practice to let the user know that the data is loading. This is especially needed if the user has a slow internet connection.

Typically in Vue we’ve used lots of `v-if` and `v-else` statements to show one bit of html while we’re waiting for data to load and then switch it out once data is loaded. Things can get even more complex when we have multiple components doing API calls, and we want to wait until all data is loaded before displaying the page.

However, Vue 3 comes with an alternative option inspired by React 16.6 called `Suspense`. This allows you to wait for any asynchronous work (like making a data API call) to complete before a component is displayed.

Suspense is a built in component that we can use to wrap two different templates, like so:

```html
<template>
  <Suspense>
    <template #default>
      <!-- Put component/components here, one or more of which makes an asychronous call -->
    </template>
    <template #fallback>
      <!-- What to display when loading -->
    </template>
  </Suspense>
</template>
```

When `Suspense` loads it will first attempt to render out what it finds in `<template #default>`. If at any point it finds a component with a `setup` function that returns a promise, or an Asynchronous Component (which is a new feature of Vue 3) it will instead render the `<template #fallback>` until all the promises have been resolved.

Let’s take a look at a very basic example:

```html
<template>
  <Suspense>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import Event from "@/components/Event.vue";
export default {
  components: { Event },
};
</script>
```

Here you can see I’m loading my Event component. It looks similar to previous lessons:

```html
<template>
...
</template>
<script>
import useEventSpace from "@/composables/use-event-space";
export default {
  async setup() {
    const { capacity, attending, spacesLeft, increaseCapacity } = await useEventSpace();
    return { capacity, attending, spacesLeft, increaseCapacity };
  },
};
</script>
```

Notice in particular that my `setup()` method marked as `async` and my `await useEventSpace()` call. Obviously, there’s an API call inside the `useEventSpace()` function, that I’m going to wait to return.

Now when I load up the page I see the loading … message, until the API call promise is resolved, and then the resulting template is displayed.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F01-suspense-opt.gif?alt=media&token=05c4aacb-02fb-4830-a5bd-37607bd5ab36)

## Multiple Async Calls

What’s nice about **Suspense** is that I can have multiple asynchronous calls, and **Suspense** will wait for all of them to be resolved to display anything. So, if I put:

```html
<template>
  <Suspense>
    <template #default>
      <Event />
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

Notice the two events? Now Suspense is going to wait for both of them to be resolved before showing up.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F02-two-events-opt.gif?alt=media&token=401523be-1157-4506-a2b5-92e3046d03af)

## Deeply Nested Async Calls

What’s even more powerful is that I might have a deeply nested component that has an asynchronous call. Suspense will wait for all asynchronous calls to finish before loading the template. So you can have one loading screen on your app, that waits for multiple parts of your application to load.

## What about errors?

It’s pretty common that you need a fallback if an API call doesn’t work properly, so we need some sort of error screen along with our loading screen. Luckily the **Suspense** syntax allows you to use it with a good old `v-if`, and we have a new `onErrorCaptured` lifecycle hook that we can use to listen for errors:

```html
<template>
  <div v-if="error">Uh oh .. {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import Event from "@/components/Event.vue";
import { ref, onErrorCaptured } from "vue";
export default {
  components: { Event },
  setup() {
    const error = ref(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });
    return { error };
  },
};
</script>
```

Notice the div at the top, and the `v-else` on the **Suspense** tag. Also notice the `onErrorCaptured` callback in the setup method. In case you’re wondering, returning `true` from `onErrorCaptured` is to prevent the error from propagating further. This way our user doesn’t get an error in their browser console.

## Creating Skeleton Loading Screens

Using the **Suspense** tag makes creating things like Skeleton loading screens super simple. You know, like these:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F03-suspense.opt.gif?alt=media&token=5d0b0a47-fe62-4997-8aab-751c6c377b8d)

Your skeleton would go into your `<template #fallback>` and your rendered HTML would go into your `<template #default>`. Pretty simple!

https://medium.com/javascript-in-plain-english/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-e34d5291cb38

https://css-tricks.com/building-skeleton-screens-css-custom-properties/