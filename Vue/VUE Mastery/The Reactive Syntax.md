# The Reactive Syntax

Up until now we’ve been using Reactive References to wrap our JavaScript primitives in objects to make them reactive. However, there is an additional way to wrap these primitives in an object. Specifically using the `reactive` syntax.

Below you can see our example using Reactive References on the left, and on the right the alternative `reactive` syntax.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1571763471042_reactive_optimized.jpg?alt=media&token=9fec3fad-1231-40a6-b2cf-6a5aaf0ef1a4)

As it shows in the image above on the right, we created a new `event` constant which takes a plain JavaScript object and returns a reactive object. This may look familiar to using the `data` option in our regular component syntax, where we also send in an object. However, as you can see above, we can also send in our computed properties into this object. You should also notice that when we use this syntax we no longer need to write `.value` when accessing properties. This is because we are simply accessing the object properties on the `event` object. You should also notice that we’re returning the entire `event` object at the end of the `setup` function.

Note that both of these syntaxes are completely valid, and neither is deemed a “best practice.”

In order to get our code working, we’d need to update our template code as follows:

```html
    <p>Spaces Left: {{ event.spacesLeft }} out of {{ event.capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in event.attending" :key="index">
       {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
```

Notice how we are now calling `event.` to access the properties.

------

## Destructuring?

When I first saw the following code:

```javascript
    return { event, increaseCapacity }
```

I wondered, might there be any way to destructure the `event` object, so that in the template I don’t always have to write `event.`? I’d rather have my template written like so:

```html
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
       {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
```

But how can I destructure `event` ? I tried the following two ways, which both failed:

```javascript
    return { ...event, increaseCapacity };

    return { event.capacity, event.attending, event.spacesLeft, increaseCapacity };
```

Neither of these are going to work because splitting apart this object will remove it’s reactivity. To make this work, we need to be able to split apart this object into **Reactive References**, which will be able to maintain reactivity.

## Introducing toRefs

Luckily, there is a way to do this using the `toRefs` method. This method converts a reactive object to a plain object, where each property is a Reactive Reference pointing to the property on the original object. Here is our completed code using this method:

```javascript
    import { reactive, computed, toRefs } from "vue";
    export default {
      setup() {
        const event = reactive({
          capacity: 4,
          attending: ["Tim", "Bob", "Joe"],
          spacesLeft: computed(() => {
            return event.capacity - event.attending.length;
          })
        });
        function increaseCapacity() {
          event.capacity++;
        }
        return { ...toRefs(event), increaseCapacity };
      }
    };
```

Notice that I’m importing `toRefs` and then using it in my return statement, and then destructuring the object. This works great!

## Aside

Before continuing on, I want to mention that if our code didn’t need to also return the `increaseCapacity` function in the return value, I could have simply written:

```javascript
    return toRefs(event);
```

This is because our `setup` method expects us to return an object, which is exactly what `toRefs` returns as well.