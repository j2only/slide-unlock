# vue-slide-unlock

[![CodeFactor](https://www.codefactor.io/repository/github/joseph2/vue-slide-unlock/badge/main)](https://www.codefactor.io/repository/github/joseph2/vue-slide-unlock/overview/main) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) ![](https://img.shields.io/badge/vue-3.x-brightgreen.svg) [![npm](https://img.shields.io/npm/v/vue-slide-unlock.svg)](https://www.npmjs.com/package/vue-slide-unlock) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-slide-unlock)](https://www.npmjs.com/package/vue-slide-unlock) ![GitHub language count](https://img.shields.io/github/languages/count/joseph2/vue-slide-unlock?color=%23df4)

Vue.js 3.x "slide to unlock" component. Protect users from accidental clicks or protect your web app from bot attack.
Compatible only with Vue.js 3.x. The component is written entirely using the Composition API.

You can check a [DEMO HERE](https://joseph2.github.io/vue-slide-unlock/)

![Preview](preview.gif)

## Installation

You can install this component via npm:

```shell
npm install --save vue-slide-unlock
```

or using yarn:

```shell
yarn add vue-slide-unlock
```

## Usage

Import the component in your app and pass some settings:

```javascript
<template>
    <slide-unlock
        ref="vueSlideUnlockRef"
        :auto-width="true"
        :circle="true"
        :disabled="false"
        :noanimate="false"
        :width="400"
        :height="60"
        text="slide to unlock"
        success-text="success"
        @completed="complete()"
    />
</template>

<script>
import SlideUnlock from "vue-slide-unlock"

export default defineComponent({
    components: {
        SlideUnlock
    }
})
</script>
```

As you can see, the component accepts some props:

| Prop        | Type    | Default         | Description                                                           |
| ----------- | ------- | --------------- | --------------------------------------------------------------------- |
| autoWidth   | Boolean | true            | Auto width for component                                              |
| circle      | Boolean | true            | All parts of component will be with border-raduis and rounded handler |
| disabled    | Boolean | false           | Disable interaction with component                                    |
| noanimate   | Boolean | false           | Disable css animations (but not css transitions)                      |
| width       | Number  | 400             | Width of element (ignored if autoWidth is true)                       |
| height      | Number  | 60              | Height of element                                                     |
| text        | String  | slide to unlock | Text on element                                                       |
| successText | String  | success         | Text on element when slide is completed                               |

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
emit("completed")
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
setup() {
    const vueSlideUnlockRef = ref()

    const resetComponent = () => {
        vueSlideUnlockRef.value.reset()
    }
}
```
