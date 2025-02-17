# Slots: Fundamentals

## Introduction

When you need to take your components to the next level beyond props, the use of slots is the next technique to enhance your components. In this lesson, we will be taking a look at essential knowledge to be successful with slots.

## What are slots?

Slots are a custom Vue element that serve as distribution outlets for content. To demonstrate this, let’s examine normal HTML elements.

When you are working with HTML elements (e.g., `div`, `span`, `p`, etc.), they accept any kind of input provided:

```html
<!-- Just passing a string -->
<div>
  This is just normal text
</div>

<!-- Composing text with other HTML elements -->
<div>
  This is text with <strong>other HTML elements</strong>.
</div>
```

In other words, regardless of whether you want to pass text or add other elements, the component renders as expected on the screen.

By using slots in our Vue component, we can achieve a similar effect!

## How to use slots?

Using slots is as easy as any other HTML element. With no additional configuration needed, all you need to do is add the `slot` element to your component’s template and you’re good to go!

With the BaseButton component we discussed in the previous lesson, we can take a configuration heavy component into a flexible component using the same HTML element model that any HTML developer will intuitively understand.

**📄App.vue with BaseButton using props**

```html
<template>
  <main>
    <BaseButton text="Cancel" />
    <BaseButton text="Submit" right-icon="right-arrow" />
  </main>
</template>
```

**📄App.vue with BaseButton using slots**

```html
<template>
  <main>
    <BaseButton>Cancel</BaseButton>
    <BaseButton>Submit <span class="icon right-arrow"></span></BaseButton>
  </main>
</template>
```

### Defining default content for a slot

In the event that your component has content that works as a good default, this can be accomplished by defining the default content within the `slot` element of your component. For example, if you wanted a button to have the text of “Submit” by default, you could do this with the following snippet:

**📄BaseButton.vue**

```html
<template>
  <button class="button">
    <slot>Submit</slot>
  </button>
</template>
```

And whenever content is provided to the component, it will automatically override the default content as you would expect.

```html
<!-- BaseButton with no custom content -->
<BaseButton></BaseButton>

<!-- Rendered BaseButton with no custom content -->
<button class="button">Submit</button>

<!-- BaseButton with custom content -->
<BaseButton>Cancel</BaseButton>

<!-- Rendered BaseButton with custom content -->
<button class="button">Cancel</button>
```

## What if you need to define multiple slots?

While having the ability to define a single slot is empowering, there may be times where you need a component to have the ability to receive content in multiple slots. To accomplish this, you need to understand two concepts: named slots and `template` blocks.

### What are named slots?

Named slots is a way to configure your slots so that they are unique from one another. To do this, slots have a `name` property that allows you to designate it with a custom identifier.

In a custom layout component where you need to provide the flexibility to add whatever content required to the header, main, and footer section, this could be accomplished with the following snippet:

**📄CustomLayout.vue**

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

But the question you may be wondering next is, how would this look when using the `CustomLayout` component? To accomplish this, we’ll need the `template` element.

### What is the template block?

Similar to how you use the `<template>` block to define the HTML of your single file components, you can also use it to define specific blocks of HTML that need to be passed into a slot. In order to do this, you need to apply the `v-slot` directive.

The `v-slot` directive can then take an argument which is the desired slot name you want the content to appear in.

📄**App.vue**

```html
<template>
  <CustomLayout>
    <template v-slot:header>
      <p>Header content</p>
    </template>
    <template>
      <p>Main body content</p>
    </template>
    <template v-slot:footer>
      <p>Footer content</p>
    </template>
  </CustomLayout>
</template>
```

## Does slots have a shorthand syntax?

Similar to `v-bind` and `v-on`, `v-slot` also has a shorthand syntax as well: `#`. Using the previous example, this is how the code would look instead.

📄**App.vue**

```html
<template>
  <CustomLayout>
    <template #header>
      <p>Header content</p>
    </template>
    <template>
      <p>Main body content</p>
    </template>
    <template #footer>
      <p>Footer content</p>
    </template>
  </CustomLayout>
</template>
```

However, from my personal experience, I would caution against using this shorthand in your codebase as it can cause confusion with users who are not as familiar with slots. It can easily be mistaken for a CSS ID rather than something specific to the slot API in Vue. So use with caution!

## Let’s Revue

At the end of the day, slots are an effective technique to use when you need to allow other developers the flexibility of providing different types of content into a component. The trade-offs of slots come with the inability to provide constraints to what is possible in a component.