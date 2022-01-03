# Modularizing

Two of the reasons we might use the component API are to **organize our component by feature** and **reuse our code across other components.** Up until now we’ve done nether with our code example, so let’s do that now. Here’s our current code, notice I’ve changed back to using **Reactive References,** there’s something about that syntax that just seems cleaner to me.

```html
    <template>
      ...
    </template>
    <script>
    import { ref, computed } from "vue";
    export default {
      setup() {
        const capacity = ref(4);
        const attending = ref(["Tim", "Bob", "Joe"]);
        const spacesLeft = computed(() => {
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

## Extracting into a Composition Function

This is just as simple as it sounds:

```html
    <template>
      ...
    </template>
    <script>
    import { ref, computed } from "vue";
    export default {
      setup() {
        return useEventSpace(); // <--- Notice I've just extracted a function
      }
    };
    function useEventSpace() {
      const capacity = ref(4);
      const attending = ref(["Tim", "Bob", "Joe"]);
      const spacesLeft = computed(() => {
        return capacity.value - attending.value.length;
      });
      function increaseCapacity() {
        capacity.value++;
      }
      return { capacity, attending, spacesLeft, increaseCapacity };
    }
    </script>
```

All I’ve done is move all my code into a function which is now outside of my `export default {`. The `setup()` method now becomes the place where I tie my composition functions together.

## Extracting into a file to reuse the code

If `useEventSpace()` is a piece of code I might want to use in multiple components, all I need to do is extract this function into it’s own file with export default:

📃 **use/event-space.vue**

```javascript
    import { ref, computed } from "vue";
    
    export default function useEventSpace() {
      const capacity = ref(4);
      const attending = ref(["Tim", "Bob", "Joe"]);
      const spacesLeft = computed(() => {
        return capacity.value - attending.value.length;
      });
      function increaseCapacity() {
        capacity.value++;
      }
      return { capacity, attending, spacesLeft, increaseCapacity };
    }
```

I called my folder `use` for my composition functions, but you can call it whatever you like. `composables` or `hooks` are other good names.

Now my component code simply imports this composition function and uses it.

```html
    <template>
      ...
    </template>
    <script>
    import useEventSpace from "@/use/event-space";
    export default {
      setup() {
        return useEventSpace();
      }
    };
    </script>
```

------

## Adding another Composition Function

If we had another composition function, perhaps in **use/event-mapping.js**, to map our event and we wanted to use it here, we might write:

```html
    <template>
      ...
    </template>
    <script>
    import useEventSpace from "@/use/event-space";
    import useMapping from "@/use/mapping";
    export default {
      setup() {
        return { ...useEventSpace(), ...useMapping() }
      }
    };
    </script>
```

As you can see, it’s quite simple to share composition functions across your components. Realistically I’d probably have shared data which I’d send into these functions, like the event data which was fetched from an API using Vuex.

## Vue 3 Best Practice

In the code above, even though it’s quite efficient, has introduced a problem. Now it’s not clear anymore which objects are coming from which composition functions. This was part of the reason we moved away from Mixins, which can hide which objects come from which code snippets. For this reason, we may want to write this differently using local objects:

```html
    <template>
      ...
    </template>
    <script>
    import useEventSpace from "@/use/event-space";
    import useMapping from "@/use/mapping";
    export default {
      setup() {
        const { capacity, attending, spacesLeft, increaseCapacity } = useEventSpace();
        const { map, embedId } = useMapping();

        return { capacity, attending, spacesLeft, increaseCapacity, map, embedId };
      }
    };
    </script>
```

Now it’s explicit where are objects are coming from.