# Computed Properties

Let’s learn how to create computed properties in the new Composition API syntax. First, though we’ll need to add to our example application so we now have a list of people attending our event.

```html
<template>
  <div>
    <p>Capacity: {{ capacity }}</p>
    <button @click="increaseCapacity()">Increase Capacity</button>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(4);
    const attending = ref(["Tim", "Bob", "Joe"]); // <--- New Array
    function increaseCapacity() {
      capacity.value++;
    }
    return { capacity, attending, increaseCapacity };
  }
};
</script>
```

Notice we now have a new array of attendees, and we print them each out. Our website looks like:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1571081299663_01-attendees.jpg?alt=media&token=1c2b6670-d2ff-4228-b328-090ccab795c1)

To create the need for a computed property, let’s change how we’re printing out capacity in our template:

```html
<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    ...
```

Notice `spacesLeft` above, which will show the number of spaces left in the event based on the capacity minus the number of people attending. If we were to create a computed property using the regular component syntax, it might look like this:

```javascript
computed: {
  spacesLeft() {
    return this.capacity - this.attending.length;
  }
}
```

But how would we create this using the new Composition API? It would look something like this:

```html
<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const capacity = ref(4);
    const attending = ref(["Tim", "Bob", "Joe"]);

    const spacesLeft = computed(() => { // <-------
      return capacity.value - attending.value.length;
    });

    function increaseCapacity() {
      capacity.value++;
    }
    return { capacity, attending, spacesLeft, increaseCapacity };
  }
};
</script>
```

As you can see in the code above, we imported `computed` from the Vue API, and then we used it, passing in an anonymous function and setting it equal to a constant called `spacesLeft`. We then returned this in our object from the setup function so our template received access to it. Now in our browser, here’s what we see:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1571081300885_02-computed-final.gif?alt=media&token=632d538c-b811-4f32-b77a-30abee4f88b8)