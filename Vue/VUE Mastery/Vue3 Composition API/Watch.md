# Watch

Let’s look at another simple example using our composition API. Here’s some code that has a simple search input box, uses the search text to call an API, and returns the number of events that match the input results.

```html
<template>
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";
import eventApi from "@/api/event.js";

export default {
  setup() {
    const searchInput = ref("");
    const results = ref(0);
    
    results.value = eventApi.getEventCount(searchInput.value);

    return { searchInput, results };
  }
};
</script>
```

With this code, here what happens when we use the form:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1573923226592_not-working-opt.gif?alt=media&token=93063af3-6f36-441f-a3c1-833b3bb54daf)

As you can see, it doesn’t seem to be working. This is because our API calling code, specifically `results.value = eventApi.getEventCount(searchInput.value);` is only getting called once, during the first time `setup()` is run. It doesn’t know to fire again, when our `searchInput` gets updated.

## Solution: watchEffect

To fix this we need to use `watchEffect`. This will run our function on the next tick while reactively tracking its dependencies, and re-run it whenever the dependencies have changed. Like so:

```javascript
setup() {
  const searchInput = ref("");
  const results = ref(0);

  watchEffect(() => {
    results.value = eventApi.getEventCount(searchInput.value);
  });

  return { searchInput, results };
}
```

So the first time this gets run it uses reactivity to start tracking `searchInput`, and when it gets updated it will re-run our API call which will update `results`. Since `results` is used in our template our template will be re-rendered.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1573923234963_working-opt.gif?alt=media&token=4b0b53c8-d6d4-4895-9085-2f2697956be7)

If I want to be more specific as to which source I want to watch for changes, I can use `watch` instead of `watchEffect`, like so:

```javascript
watch(searchInput, () => {
  ...
});
```

Also, if I need access to the new value and old value of the item being watched I can write:

```javascript
watch(searchInput, (newVal, oldVal) => {
  ...
});
```

## Watching Multiple Sources

If I want to watch two Reactive References I can send them inside an array:

```javascript
watch([firstName, lastName], () => {
  ...  
});
```

Now if either are changed, the code inside will re-run. I can also get access to both of their old and new values with:

```javascript
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  ...   
});
```