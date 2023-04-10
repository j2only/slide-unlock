# vue-slide-unlock

 ![npm publish](https://github.com/joseph2/vue-slide-unlock/actions/workflows/npm.yml/badge.svg) [![npm](https://img.shields.io/npm/v/vue-slide-unlock.svg)](https://www.npmjs.com/package/vue-slide-unlock) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-slide-unlock)  [![CodeFactor](https://www.codefactor.io/repository/github/joseph2/vue-slide-unlock/badge/main)](https://www.codefactor.io/repository/github/joseph2/vue-slide-unlock/overview/main) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/joseph2/vue-slide-unlock/issues)

Vue.js slide to unlock component. Protect users from accidental clicks or protect your web app from bot attack.
Written entirely on Vue 3 Composition API with Typescript and Vite. Coated with tests using Cypress. Compatible only with Vue.js 3.x.

You can check a [DEMO HERE](https://joseph2.github.io/vue-slide-unlock/)

![Preview](preview.gif)

## Test coverage

| Statements                                                                                 | Branches                                                                               | Functions                                                                                | Lines                                                                            |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-92.94%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-98.52%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-96.15%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-92.68%25-brightgreen.svg?style=flat) |

## Installation

Install this component via package manager:

```bash
yarn add vue-slide-unlock
```

or

```shell
npm install --save vue-slide-unlock
```

[![https://nodei.co/npm/vue-slide-unlock.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/vue-slide-unlock.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vue-slide-unlock)

## Usage

Import the component in your app and pass some settings:

```javascript
<template>
    <slide-unlock
        ref="vueslideunlock"
        :auto-width="true"
        :circle="true"
        :disabled="false"
        :noanimate="false"
        :width="400"
        :height="60"
        text="slide to unlock"
        success-text="success"
        name="slideunlock"
        @completed="complete()"
    />
</template>

<script>
import SlideUnlock from "vue-slide-unlock"

export default {
    components: {
        SlideUnlock
    }
}
</script>
```

As you can see, the component accepts some props:

| Prop        | Type    | Default           | Description                                                           |
| ----------- | ------- | ----------------- | --------------------------------------------------------------------- |
| autoWidth   | Boolean | true              | Auto width for component                                              |
| circle      | Boolean | true              | All parts of component will be with border-radius and rounded handler |
| disabled    | Boolean | false             | Disable interaction with component                                    |
| noanimate   | Boolean | false             | Disable css animations (but not css transitions)                      |
| width       | Number  | 400               | Width of element (ignored if autoWidth is true)                       |
| height      | Number  | 60                | Height of element                                                     |
| text        | String  | "slide to unlock" | Text on element                                                       |
| successText | String  | "success"         | Text on element when slide is completed                               |
| name        | String  | "slideunlock"     | Unique ID, in case of using several components on one page            |

Also, you can customize some styles via CSS Variables:

| Variable                        | Default | Description                                      |
| ------------------------------- | ------- | ------------------------------------------------ |
| --su-size-text                  | 24px    | Font size of text on element                     |
| --su-size-padding               | 6px     | Padding on element from progressbar              |
| --su-color-bg                   | #ebebeb | Background color of element.                     |
| --su-color-progress-normal-bg   | #cacaca | Color of progressbar                             |
| --su-color-progress-complete-bg | #42b983 | Color of progressbar when slide is completed     |
| --su-color-text-normal          | #4F4F4F | Color of text on element                         |
| --su-color-text-complete        | #FEFEFE | Color of text on element when slide is completed |
| --su-color-handler-bg           | #FFFFFF | Color of handler                                 |
| --su-icon-handler               | base64  | Icon of handler                                  |

## Event

```javascript
this.$emit("completed")
```

Emitted when pass verify, the handler swiped to the right side.

## Reset state

If you want to reset the state of a component, you need to assign a ref to the component

```javascript
<template>
    <slide-unlock ref="vueSlideUnlockRef" />
</template>
```

And then you need to call the reset method

```javascript
const vueSlideUnlockRef = ref()

const resetComponent = () => {
    vueSlideUnlockRef.value.reset()
}
```
