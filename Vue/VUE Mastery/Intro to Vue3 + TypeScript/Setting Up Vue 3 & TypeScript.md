# Setting Up Vue 3 & TypeScript

## Introduction

In this lesson, we will be talking about how to setup a brand new Vue project with TypeScript and how to add TypeScript to an existing Vue 3 project.

### Prerequisites

The first thing we need is the Vue CLI. If this is the first time you’ve used Vue CLI, here are the basic steps for getting setup:

1. Visit the official docs - https://cli.vuejs.org/
2. Click on the [Installation page](https://cli.vuejs.org/guide/installation.html) to get the latest command

At the time of this lesson, I am using Vue CLI v4.5.8.

## Setting Up a New Vue.js 3 + TypeScript Project

### Creating Our Project in Vue CLI

Inside of your terminal, let’s create a new project by running

When prompted to select a preset, let’s choose the options manually to understand what’s going into our project by using the arrow keys to select the third option: .

You should now be prompted to choose the features needed for the project. By default, you should see `Choose Vue version`, `Babel`, and `Linter / Formatter` already selected.

Since we also want TypeScript for this project, use the arrow keys to navigate down to the `TypeScript` option and hit the spacebar in order to select it. You should see the circle fill up with a smaller green circle which confirms you correctly turned it on.

When prompted to choose the version of Vue you want to install, you should select `3.x (Preview)`.

For the remaining configurations, we’ll want to choose:

- Use class-style component syntax? `No`
- Use Babel alongside TypeScript? `Yes`
- Pick a linter / formatter config: Up to you, but I like `ESLint + Prettier`
- Pick additional lint features: `Lint on save`
- Where do you prefer placing config files? `In dedicated config files`
- Save this for future project? Up to you, but I chose `No`

Once everything has been setup, let’s open up our project in our editor.

### An Overview of the Vue Project

When we open our project inside of our text editor, one of the first changes you may notice is that `main.js` is now `main.ts`. As part of the TypeScript plugin, it will automatically generate TypeScript files (indicated by the `.ts` extension) rather than JavaScript files (indicated by `.js`).

However, when we open up the file to see what has changed, you will see that nothing has actually changed. After all, TypeScript is meant to enhance JavaScript files when needed, but when it’s not needed, standard JavaScript is still perfectly valid!

One of the new files that will definitely be a first if you’ve never used TypeScript in other projects before is the `shims-vue.d.ts`. And while the contents of the file might look foreign, you’ll be relieved to know that it’s primary purpose is to provide TypeScript some information about Vue components. In other words, it’s boilerplate and you’ll never need to configure it unless you have some advanced and complex scenario

There’s also a `tsconfig.json` which contains some default configurations for working with TypeScript.

## Adding TypeScript to an Existing Vue CLI Project

When working with an existing Vue CLI project, we can make use of the TypeScript plugin by calling:

- `vue add typescript`

When prompted here are the options we want to configure:

- Use class-style component syntax? `No`
- Use Babel alongside TypeScript? `Yes`
- Convert all .js to .ts? `Yes`
- Allow .js files to be compiled? `No`
- Skip type checking of all declaration files? `Yes`

Once that’s done, you should see that your application now has the boilerplate files (i.e., , , , , ) updated along with any other JS files you might have. However, if you have other components, they will not be updated since Vue CLI does not want to make assumptions on whether it makes sense to enhance components with TypeScript or not.

## Final Thoughts

As we can see in this lesson, Vue CLI makes the process of adding TypeScripts much easier since it takes care of a lot of configuration that you would normally need to do manually.