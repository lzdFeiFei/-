# Methods

Now that we’ve learned how to create a Reactive Reference, the next building block of our component composition is creating methods. If you haven’t downloaded the [Vue 3 Composition API Cheat Sheet](https://www.vuemastery.com/vue-3-cheat-sheet) yet, now would be a good time. Here’s what our current code looks like:

```html
<template>
  <div>Capacity: {{ capacity }}</div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(3);
    return { capacity };
  }
};
</script>
```

If we wanted to add a method that would allow us to increment capacity, from a button, we might write the following in our regular component syntax:

```javascript
methods: {
  increase_capacity() {
    this.capacity++;
  }
} 
```

How might we use the new Vue 3 composition API though? Well, we start by defining a function inside our setup method, returning that method to give our component access to it, and then using it inside a button:

```html
<template>
  <div>
    <p>Capacity: {{ capacity }}</p>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(3);

    function increaseCapacity() { // <--- Our new function
      // TBD
    }
    return { capacity, increaseCapacity };
  }
};
</script>
```

Yup, when we need methods, we simply create them as functions using our Composition API. However, how do you think we increment our capacity from inside the setup method? You might guess:

```javascript
function increaseCapacity() { 
  capacity++;
}
```

This wouldn’t work and it would error out. Remember, `capacity` is a Reactive Reference, an object that encapsulates our integer. Incrementing an object won’t work. In this case we need to increment the inner integer `value` our Reactive Reference encapsulates. We can do that by accessing `capacity.value`.

```javascript
function increaseCapacity() { 
  capacity.value++;
}
```

If we check in our browser, everything now works:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1571072657913_01-method-browser750.gif?alt=media&token=2c563df9-5882-4c70-8bce-35eba8b97397)

That’s all there is to it. However, if we look at the template you’ll notice that when we print out capacity:

```html
<p>Capacity: {{ capacity }}</p>
```

We don’t have to write `capacity.value`, and you might be wondering why.

It turns out that when Vue finds a `ref` in a template it automatically exposes the inner value, so you should never need to call `.value` inside the template.