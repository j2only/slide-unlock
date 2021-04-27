# vue-slide-unlock

[![CodeFactor](https://www.codefactor.io/repository/github/joseph2/vue-slide-unlock/badge/main)](https://www.codefactor.io/repository/github/joseph2/vue-slide-unlock/overview/main) ![npm](https://img.shields.io/npm/v/vue-slide-unlock.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-slide-unlock) [![Dependecy Status](https://david-dm.org/joseph2/vue-slide-unlock.svg)](https://david-dm.org/joseph2/vue-slide-unlock) [![devDependencies Status](https://david-dm.org/joseph2/vue-slide-unlock/dev-status.svg)](https://david-dm.org/joseph2/vue-slide-unlock?type=dev)

Vue.js 3.x slide to unlock component. Protect users from accidental clicks or protect your web app from bot attack.

You can check a [DEMO HERE](https://joseph2.github.io/vue-slide-unlock/)

## Installation

You can install this component via npm:

```shell
npm install --save vue-slide-unlock
```

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

## Event

```javascript
this.$emit("completed")
```

Emitted when pass verify, the handler swiped to the right side.

## Reset state

If you want to reset the state of a component, you need to assign a ref to the component

```javascript
<template>
    <slide-unlock ref="vueslideunlock" />
</template>
```

And then you need to call the reset method

```javascript
 methods: {
    reset() {
        this.$refs.vueslideunlock.reset()
    }
}
```
