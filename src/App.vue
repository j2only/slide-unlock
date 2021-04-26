<template>
    <div class="content">
        <section class="head">
            <h1>Vue.js slide to unlock</h1>
            <h2>This is a vue component, this is used to protect users from accidental clicks.</h2>
        </section>

        <section class="demo-section">
            <div class="column">
                <slide-unlock
                    :auto-width="getAutoWidth"
                    :width="width"
                    :height="height"
                    :text="text"
                    :success-text="successText"
                    :handler-icon="handlerIcon"
                    :success-icon="successIcon"
                    :circle="getShape"
                />
            </div>

            <div class="column">
                <table>
                    <tr>
                        <td>Auto width</td>
                        <td>
                            <select v-model="autoWidth">
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Circle handler</td>
                        <td>
                            <select v-model="isCircle">
                                <option>true</option>
                                <option>false</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Width (px)</td>
                        <td>
                            <input v-model="width" type="number" :disabled="autoWidth === 'true'">
                        </td>
                    </tr>
                    <tr>
                        <td>Height (px)</td>
                        <td>
                            <input v-model="height" type="number">
                        </td>
                    </tr>
                    <tr>
                        <td>Text</td>
                        <td>
                            <input v-model="text" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>Success text</td>
                        <td>
                            <input v-model="successText" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>Text size</td>
                        <td>
                            <input v-model="textSize" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>Text color</td>
                        <td>
                            <input v-model="textColor" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Text completed color</td>
                        <td>
                            <input v-model="textCompleteColor" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Bg color</td>
                        <td>
                            <input v-model="background" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Progressbar normal bg color</td>
                        <td>
                            <input v-model="progressBarBg" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Progressbar completed bg color</td>
                        <td>
                            <input v-model="completedBg" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Handler bg color</td>
                        <td>
                            <input v-model="handlerBg" type="color">
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
// import SlideUnlock from "@/components/SlideUnlock"
import SlideUnlock from "../dist/vue-slide-unlock.common.js"
import "../dist/vue-slide-unlock.css"

export default {
    name: "App",
    components: {
        SlideUnlock
    },
    data () {
        return {
            autoWidth: "true",
            handlerIcon: "fa fa-angle-double-right",
            successIcon: "fa fa-check",
            text: "slide to unlock",
            successText: "success",
            width: 400,
            height: 80,
            isCircle: "true",
            Background: getComputedStyle(document.documentElement).getPropertyValue("--su-color-bg"),
            ProgressBarBg: getComputedStyle(document.documentElement).getPropertyValue("--su-color-progress-normal-bg"),
            CompletedBg: getComputedStyle(document.documentElement).getPropertyValue("--su-color-progress-complete-bg"),
            HandlerBg: getComputedStyle(document.documentElement).getPropertyValue("--su-color-handler-bg"),
            TextSize: getComputedStyle(document.documentElement).getPropertyValue("--su-size-text"),
            TextColor: getComputedStyle(document.documentElement).getPropertyValue("--su-color-text-normal"),
            TextCompleteColor: getComputedStyle(document.documentElement).getPropertyValue("--su-color-text-complete")
        }
    },
    computed: {
        getShape() {
            return this.isCircle === "true"
        },
        getAutoWidth() {
            return this.autoWidth === "true"
        },
        background: {
            set: function(value) {
                this.Background = value
                document.documentElement.style.setProperty("--su-color-bg", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-color-bg")
            }
        },
        progressBarBg: {
            set: function(value) {
                this.ProgressBarBg = value
                document.documentElement.style.setProperty("--su-color-progress-normal-bg", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-color-progress-normal-bg")
            }
        },
        completedBg: {
            set: function(value) {
                this.CompletedBg = value
                document.documentElement.style.setProperty("--su-color-progress-complete-bg", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-color-progress-complete-bg")
            }
        },
        handlerBg: {
            set: function(value) {
                this.HandlerBg = value
                document.documentElement.style.setProperty("--su-color-handler-bg", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-color-handler-bg")
            }
        },
        textSize: {
            set: function(value) {
                this.TextSize = value
                document.documentElement.style.setProperty("--su-size-text", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-size-text")
            }
        },
        textColor: {
            set: function(value) {
                this.TextColor = value
                document.documentElement.style.setProperty("--su-color-text-normal", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-color-text-normal")
            }
        },
        textCompleteColor: {
            set: function(value) {
                this.TextCompleteColor = value
                document.documentElement.style.setProperty("--su-color-text-complete", value)
            },
            get: function() {
                return getComputedStyle(document.documentElement).getPropertyValue("--su-color-text-complete")
            }
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: blinkmacsystemfont, -apple-system,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    color: #2c3e50;
}
.content {
    margin: 2rem auto 0;
    max-width: 60rem;
}
.head {
    margin-bottom: 2rem;
    text-align: center;
    h1 {
        font-weight: bold;
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    h2 {
        font-weight: normal;
        font-size: 1.25rem;
        margin-top: 0;
    }
}
.demo-section {
    display: flex;
    .column {
        float: left;
        width: 50%;
    }
    @media only screen and (max-width: 767px) {
        flex-direction: column;
        .column {
            float: none;
            width: 100%;
            &:first-child {
                margin-bottom: 2rem;
            }
        }
    }
}
table {
    display: block;
    width: 100%;
    overflow: auto;
    word-break: normal;
    word-break: keep-all;
    td {
        padding: 0.25rem 0.5rem;
        &:first-child {
            text-align: right;
        }
        input {
            font: inherit;
            margin-bottom: 0.5rem;
            margin: 0;
            outline: none;
            padding: 0.325rem;
            border: 1px solid #cacaca;
            border-radius: 0.25rem;
            float:left;
        }
    }
}
</style>
