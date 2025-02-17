# The Problem with Props

## Introduction

------

Props are an incredibly useful technique when it comes to passing data down to child components. However, as an application scales and components get bigger, relying solely on props can often end up creating more problems than one might realize. In this lesson, you will learn the trade-offs that often come with a props heavy component and get a glimpse into an alternative technique every Vue developer should have in their toolkit.

## Scenario: A “Simple” Button Component

------

A “button” component is universal amongst all applications. At first glance, most developers would probably say that buttons are incredibly simple, as far as components go.

Let’s put that to the test by playing a little mental puzzle game, originally designed by core team member Damian Dulisz, where we build a base button component from scratch. The rules of the game are simple:

1. You will be given a new requirement each round that builds on the past one(s)
2. Imagine what the template block will look like in BaseButton.vue and App.vue
3. All styles are provided by a separately defined CSS classes (i.e., `.button`, `.icon`, etc.)

Ready to play? Let’s start!

### Requirement #1: Display Custom Text

------

To start, the button needs to be able to display any custom text specified by the parent component.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F001.opt.jpg?alt=media&token=1a8a85c0-155f-4f01-bbfc-02cdf893aa4a](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F001.opt.jpg?alt=media&token=1a8a85c0-155f-4f01-bbfc-02cdf893aa4a)

.

.

.

Got it? Good. Next round!

### Requirement #2: Display Icon to the Right

------

For this round, in addition to the custom text from the parent component, you can assume that you have a `<app-icon :icon="iconName" />` component that you can use inside of your base button component.

.

.

.

.

.

Feeling good? Let’s keep going!

### Round #3: Display Icons on Either Side

------

Rather than solely displaying the icon on the right side of the text, the button must also account for:

- Icon on the left side
- Icon on the right side
- Icon on both sides

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F002.opt.jpg?alt=media&token=c4bbe43d-435a-415a-86ad-127a053d7c29](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F002.opt.jpg?alt=media&token=c4bbe43d-435a-415a-86ad-127a053d7c29)

.

.

.

.

.

.

.

Starting to have a little trouble holding it in your head? Hang in there. Only a couple more to go!

### Requirement #4: Replace Content with a Loading Spinner

------

When a user clicks a button, it sometimes needs to fetch data from an external API service and needs to inform the user that it’s in the process of retrieving that data.

Assuming you have a `<LoadingSpinner />` component, the button now also needs to be able to replace the entire content of the button with the loading spinner based on its state.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F003.opt.gif?alt=media&token=ba3ad559-5e72-4671-a709-0cbaac558f77](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F003.opt.gif?alt=media&token=ba3ad559-5e72-4671-a709-0cbaac558f77)

.

.

.

.

.

.

.

.

.

We’re almost there! Just one more!

### Requirement #5: Only Replace Icon with a Loading Spinner

------

On some pages, the designer would prefer to switch out the button text to “Loading” and swap out the icon with the `<LoadingSpinner />` component in order to provide more context to the user.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F004.opt.gif?alt=media&token=bb8ae941-3313-444a-afe3-1fb7c9e0fe97](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F004.opt.gif?alt=media&token=bb8ae941-3313-444a-afe3-1fb7c9e0fe97)

.

.

.

.

.

.

.

.

.

.

.

And that’s it! You’re all done now. Whew!

## A Common Descent into Props Madness

------

When you first started the exercise, you (and most developers) most likely started with a simple solution resembling something as follows:

**📄App.vue**

```html
<template>
  <h1>My App</h1>
  <BaseButton text="Submit" />
</template>
```

**📄BaseButton.vue**

```html
<template>
  <button class="button">
    {{ text }}
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
```

However, as each requirement continued to build on one another, it wasn’t long before it looked something like this instead:

**📄App.vue**

```html
<template>
  <h1>My App</h1>
  <BaseButton 
    text="Submit" 
    :isLoading="loading"
    iconLeftName="left-arrow"
    iconRightName="right-arrow"
    :isLoadingLeft="loadingLeft"
    :isLoadingRight="loadingRight"
  />
</template>
```

**📄BaseButton.vue**

```html
<template>
  <button type="button" class=“nice-button“>
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <template v-if="iconLeftName">
        <LoadingSpinner v-if="isLoadingLeft" />
        <AppIcon v-else :icon=“iconLeftName” />
      </template>
      {{ text }}
      <template v-if="iconRightName">
        <LoadingSpinner v-if="isLoadingRight" />
        <AppIcon v-else :icon=“iconRightName” />
      </template>
    </template>
  </button>
</template>
<script>
export default {
  // Props shortened to Array syntax for brevity
  props: [
    'text', 
    'iconLeftName', 
    'iconRightName', 
    'isLoading', 
    'isLoadingLeft', 
    'isLoadingRight'
  ]
}
</script>
```

😵I don’t know about you, but I got pretty dizzy trying to hold all of that in my head!

## The Problem with Props-Based Solutions

------

The solution I just showed is what one might call a “props-based solution.” In other words, the strategy for solving each new requirement is simply to layer on a new prop that controls the desired behavior and layer it into the existing template and data model. Is it inherently wrong? Absolutely not. It solves the requirements and works as expected for the user.

However, as you might have noticed, it doesn’t take long before the code becomes rather difficult to read and could become very difficult to maintain as time goes on (and more requirements inevitably get added).

As a result, some of the common issues that teams see with props-based solutions are:

1. New developers who have no prior experience with the component are forced to navigate a complex maze of conditionals to add any new feature or debug the code.
2. Components lose their ability to be intuitive since components with numerous props essentially gain their own unique configurations that often require extensive onboarding or explanation just to understand how everything works. And that’s assuming the props are documented well!
3. Complex components that become hard to maintain often lead to developers creating alternate components since deadlines take precedent over good coding practices, which fragments the application’s ecosystem.

So the question becomes: “Is there a better way?” And the answer is absolutely yes.

## A Simpler and Cleaner Solution

------

Instead of relying solely on props, it’s time to reach for our next component design technique: slots.

**📄App.vue**

```html
<template>
  <h1>My App</h1>
  <BaseButton>Submit <AppIcon name="arrow-right" /></BaseButton>
</template>
```

**📄BaseButton.vue**

```html
<template>
  <button class="button">
    <slot />
  </button>
</template>
```

Believe it or not, using a single slot element checks off all of our boxes for our requirements without changing a single line of code in the component!

## Let’s ReVue

------

Props are an incredibly powerful technique for defining conventions that enforce a level of consistency in your components. However, when relied on too heavily for enhancing component features, it can increase complexity and create inflexible components. As long as you’re aware of those trade-offs, you’re ready for the next step in our journey.

In the next lesson, we’ll take a look at core fundamental concepts that will empower you to create more flexible components with slots. See you there!