# One Object to Rule Them All

## Introduction

One of the first things that Vue developers often learn is the magic of using `v-bind` and `v-on` to supercharge their HTML with dynamic bindings and event listeners. The declarative nature of `v-bind` and `v-on` make it very easy for other developers to follow.

```html
<input 
  :id="inputId" 
  :data-tooltip="tooltipText"
  @change="updateForm" 
  @mouseover="showTooltip"
/>
```

However, as components grow larger and complex, we can find that this approach becomes limiting and can even create confusion. When it comes to this point, it’s time to learn a hidden secret that most Vue developers don’t know about till much later in their journey: you can dynamically define multiple values for `v-bind` and `v-on`.

## **v-bind with No Argument**

As I mentioned earlier, most Vue developers are familiar with the following syntax:

```html
<template>
  <img v-bind:src="imageAttrs.source" v-bind:alt="imageAttrs.text" />
</template>
<script>
export default {
  data() {
    return {
      imageAttrs: {
        src: '/vue-mastery-logo.png',
        text: 'Vue Mastery Logo'
      }
    }
  }
}
</script>
```

What many don’t realize is that this syntax is the `href` part of our `v-bind` statement is actually an argument. In other words, by passing in an argument to `v-bind`, we are telling Vue that we want to bind a specific property to this particular attribute.

However, what’s even more perplexing is that *this argument is optional*. What does this mean? Well, believe it or not, our code can actually be written instead as:

```html
<img v-bind="{ src: imageAttrs.source, alt: imageAttrs.text }" />
```

This could then be abstracted one step further to:

```html
<img v-bind="imageAttrs" />
```

However, while this this is very short and concise, most of us would still prefer the original way of declaring attributes due to its clarity and ease of use.

## **v-on with No Arguments**

When it comes to `v-on`, most people are familiar with the following usage:

```html
<template>
  <img v-on:click="openGallery" v-on:mouseover="showTooltip" />
</template>
<script>
export default {
  methods: {
    openGallery() { ... },
    showTooltip() { ... }
  }
}
</script>
```

Just like `v-bind`, the event name we define is actually an argument being passed to `v-on`. As a result, we can also rewrite our `input` element as:

```html
<template>
  <img v-on="{ click: openGallery, mouseover: showTooltip }" />
</template>
```

And theoretically, we could abstract this one step further to:

```html
<template>
  <img v-on="inputEvents" />
</template>
<script>
export default {
  computed: {
    inputEvents: {
      click: this.openGallery,
      mouseover: this.showTooltip
    }
  },
  methods: {
    openGallery() { ... },
    showTooltip() { ... }
  }
}
</script>
```

However, just like we mentioned earlier in the `v-bind` section, most of us would still prefer the original syntax because it is easy to understand and change if necessary.

## When would this be useful?

As we illustrated in our earlier examples, simple components with an easy to understand structure has little reason to use an abstracted syntax. However, as our components become more complex and difficult to understand, our newly acquired technique suddenly has a lot of applications.

### NewsFeed Scenario

For example, let’s consider the scenario where you are building a `NewsFeed` component where the API will pass a series of components that changes based on what the editors want. This means that sometimes you will get `NewsArticle` components, but sometimes you’ll get `NewsAd` components.

When it comes to implementing this, you may start out with something like the following:

```html
<template>
  <main>
    <Component 
      v-for="content in apiResponse"
      :key="content.id"
      :is="content.type"
      :article-title="content.title"
      :article-content="content.body"
      :ad-image="content.image"
      :ad-heading="content.heading"
      @click="content.type === 'NewsArticle' ? openArticle : openAd"
      @mouseover="content.type === 'NewsArticle' ? showPreview : trackAdEvent"
    />
  </main>
</template>
```

In this scenario, we are:

- Using the `Component` component to dynamically render either the `NewsArticle` or `NewsAd` component using the `is` attribute that is defined with `content.type`.
- Binding dynamic attributes for the `NewsArticle` component: `article-title` and `article-content`
- Binding dynamic attributes for the `NewsAd` component: `ad-image` and `ad-heading`

And thought it doesn’t look too confusing yet, it is clear that certain props and events only matter in depending on what component it is. As this list of attributes and events becomes much longer, this will become exponentially more difficult to mange and understand.

### Refactoring NewsFeed

When a component becomes difficult to understand and manage, this is the time for us to seek out new techniques and abstractions. Using our newly acquired techniques, let’s refactor the `NewsFeed` component.

```html
<template>
  <main>
    <Component 
      v-for="content in apiResponse"
      :key="content.id"
      :is="content.type"
      v-bind="feedItem(content).attrs"
      v-on="feedItem(content).events"
    />
  </main>
</template>
<script>
export default {
  methods: {
    feedItem(item) {
      if (item.type === 'NewsArticle') {
        return {
          attrs: {
            'article-title': item.title,
            'article-content': item.content
          },
          events: {
            click: this.openArticle,
            mouseover: this.showPreview
          }
        }
      } else if (item.type === 'NewsAd') {
        return {
          attrs: {
            'ad-image': item.image,
            'ad-heading': item.heading
          },
          events: {
            click: this.openAd,
            mouseover: this.trackAdEvent
          }
        }
      }
    }
  }
}
</script>
```

And with that, our `NewsFeed` article has properly delegated the responsibilities to the specific components rather than mix them up under a single HTML element.

## Let’s ReVue

While it may be tempting to refactor all of your code to use the new syntax you just learned, remember that one major indicator of whether code refactors are useful is whether it makes the code easier to follow. In other words, I recommend only using the object syntax when it will increase code clarity rather than abstracting it away. Good luck!