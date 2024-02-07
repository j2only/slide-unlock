<!-- sandbox/App.vue -->
<template>
    <div>
        <nav>
            <div class="container">
                <div>
                    <img alt="Vite logo" src="/vite.svg">
                    <h4>vue-slide-unlock</h4>
                    <span class="version">[{{ cVersion }}]</span>
                </div>
                <div>
                    <a class="nav-item" href="https://github.com/j2only/vue-slide-unlock" title="Github" target="_blank">
                        Documentation
                    </a>
                    <a class="nav-item" href="https://github.com/j2only" title="Github" target="_blank">
                        <div class="nav-icon">
                            <svg viewBox="0 0 16 16">
                                <path d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
        <div class="container is-content">
            <section class="head">
                <img src="/vue.svg" class="logo" alt="Vue logo" />

                <h1>Vue.js slide to unlock component</h1>
                <div class="description">
                    <b>Protect users from accidental clicks for Vue.js</b>
                </div>
            </section>

            <section class="demo-section">
                <slide-unlock
                    ref="vueSlideUnlockRef"
                    :auto-width="autoWidth"
                    :circle="isCircle"
                    :disabled="isDisabled"
                    :noanimate="isNoAnimate"
                    :width="width"
                    :height="height"
                    :text="text"
                    :success-text="successText"
                    :handler-icon="handlerIcon"
                    name="slideunlock"
                    @vue:mounted="handleMounted"
                />
            </section>

            <section class="props-section">
                <h2>Options (props)</h2>

                <div class="grid is-4">
                    <div class="item">
                        <label for="autoWidth">
                            <input
                                id="autoWidth"
                                v-model="autoWidth"
                                type="checkbox"
                            >
                            autoWidth
                        </label>
                    </div>
                    <div class="item">
                        <label for="isCircle">
                            <input
                                id="isCircle"
                                v-model="isCircle"
                                type="checkbox"
                            >
                            isCircle
                        </label>
                    </div>
                    <div class="item">
                        <label for="isDisabled">
                            <input
                                id="isDisabled"
                                v-model="isDisabled"
                                type="checkbox"
                            >
                            isDisabled
                        </label>
                    </div>
                    <div class="item">
                        <label for="isNoAnimate">
                            <input
                                id="isNoAnimate"
                                v-model="isNoAnimate"
                                type="checkbox"
                            >
                            isNoAnimate
                        </label>
                    </div>
                </div>

                <div class="grid">
                    <div class="item">
                        <label>width (px)</label>
                        <input v-model="width" type="number" :disabled="autoWidth">
                    </div>
                    <div class="item">
                        <label>height (px)</label>
                        <input v-model="height" type="number">
                    </div>
                    <div class="item">
                        <label>text</label>
                        <input v-model="text" type="text">
                    </div>
                    <div class="item">
                        <label>successText</label>
                        <input v-model="successText" type="text">
                    </div>
                </div>
            </section>
            <section class="size-section">
                <h2>Options (CSS Variables)</h2>
                <div class="grid">
                    <div class="item">
                        <label>textSize (px)</label>
                        <input v-model="textSize" type="number">
                    </div>
                    <div class="item">
                        <label>paddingSize (px)</label>
                        <input v-model="paddingSize" type="number">
                    </div>
                </div>
                <div class="grid is-1">
                    <div class="item">
                        <label>handlerIcon</label>
                        <input v-model="handlerIcon" type="text">
                    </div>
                </div>
            </section>
            <section class="colors-section">
                <h2>Colors (CSS Variables)</h2>

                <div class="grid">
                    <div class="item">
                        <label>textColor</label>
                        <input v-model="textColor" type="color">
                    </div>
                    <div class="item">
                        <label>textCompleteColor</label>
                        <input v-model="textCompleteColor" type="color">
                    </div>
                    <div class="item">
                        <label>background</label>
                        <input v-model="background" type="color">
                    </div>
                    <div class="item">
                        <label>progressBarBg</label>
                        <input v-model="progressBarBg" type="color">
                    </div>
                    <div class="item">
                        <label>completedBg</label>
                        <input v-model="completedBg" type="color">
                    </div>
                    <div class="item">
                        <label>handlerBg</label>
                        <input v-model="handlerBg" type="color">
                    </div>
                </div>
            </section>

            <section class="actions-section">
                <h2>Actions</h2>
                <button class="btn" @click="resetComponent()" data-cy="reset">
                    Reset state
                </button>
                <button class="btn" @click="completeComponent()" data-cy="complete">
                    Complete state
                </button>
            </section>
        </div>
        <footer>
            <div class="container">
                <div> &copy; {{ new Date().getFullYear() }} Anton Zolotov </div>
                <a href="https://github.com/j2only">github.com</a>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import SlideUnlock from "../lib/index"
import packageInfo from "../package.json"

const cVersion = packageInfo.version
const getCssVar = (name: string) => {
    const h = document.getElementById("slideunlock") as HTMLElement
    return getComputedStyle(h).getPropertyValue(name).trim()
}
const setCssVar = (name: string, value: string) => {
    const h = document.getElementById("slideunlock") as HTMLElement
    h.style.setProperty(name, value)
}

const autoWidth = ref(true)
const isCircle = ref(true)
const isDisabled = ref(false)
const isNoAnimate = ref(false)
const text = ref("slide to unlock")
const successText = ref("success")
const width = ref(400)
const height = ref(80)

const tSize = ref("")
const pSize = ref("")
const bg = ref("#000000")
const pBg = ref("#000000")
const cBg = ref("#000000")
const hBg = ref("#000000")
const tColor = ref("#000000")
const tCompleteColor = ref("#000000")
const hIcon = ref("")

const handleMounted = () => {
    tSize.value = getCssVar("--su-size-text").slice(0, getCssVar("--su-size-text").length - 2)
    pSize.value = getCssVar("--su-size-padding").slice(0, getCssVar("--su-size-padding").length - 2)
    bg.value = getCssVar("--su-color-bg")
    pBg.value = getCssVar("--su-color-progress-normal-bg")
    cBg.value = getCssVar("--su-color-progress-complete-bg")
    hBg.value = getCssVar("--su-color-handler-bg")
    tColor.value = getCssVar("--su-color-text-normal")
    tCompleteColor.value = getCssVar("--su-color-text-complete")
    hIcon.value = getCssVar("--su-icon-handler")
}

const textSize = computed({
    get() {
        return tSize.value
    },
    set(value) {
        setCssVar("--su-size-text", `${value}px`)
    }
})

const paddingSize = computed({
    get() {
        return pSize.value
    },
    set(value) {
        setCssVar("--su-size-padding", `${value}px`)
    }
})
const background = computed({
    get() {
        return bg.value
    },
    set(value) {
        setCssVar("--su-color-bg", value)
    }
})
const progressBarBg = computed({
    get() {
        return pBg.value
    },
    set(value) {
        setCssVar("--su-color-progress-normal-bg", value)
    }
})
const completedBg = computed({
    get() {
        return cBg.value
    },
    set(value) {
        setCssVar("--su-color-progress-complete-bg", value)
    }
})
const handlerBg = computed({
    get() {
        return hBg.value
    },
    set(value) {
        setCssVar("--su-color-handler-bg", value)
    }
})
const textColor = computed({
    get() {
        return tColor.value
    },
    set(value) {
        setCssVar("--su-color-text-normal", value)
    }
})
const textCompleteColor = computed({
    get() {
        return tCompleteColor.value
    },
    set(value) {
        setCssVar("--su-color-text-complete", value)
    }
})
const handlerIcon = computed({
    get() {
        return hIcon.value
    },
    set(value) {
        setCssVar("--su-icon-handler", value)
    }
})

const vueSlideUnlockRef = ref()
const resetComponent = () => {
    vueSlideUnlockRef.value.reset()
}
const completeComponent = () => {
    vueSlideUnlockRef.value.complete()
}
</script>
