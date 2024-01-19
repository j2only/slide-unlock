<template>
    <div
        :id="name"
        class="slideunlock"
        :class="{
            'is-disabled': disabled,
            'is-noanimate': noanimate,
            'is-circle': circle,
            'is-complete': Slider.IsComplete
        }"
        :style="slideUnlockStyle"
        @mousemove="slideMoving"
        @mouseup="slideFinish"
        @touchmove="slideMoving"
        @touchend="slideFinish"
    >
        <div class="slideunlock-progressbar" :style="progressBarStyle" />
        <div class="slideunlock-text" :style="{ opacity: Slider.TextOpacity }">
            {{ message }}
        </div>

        <div
            class="slideunlock-handler"
            :style="handlerStyle"
            @mousedown="slideStart"
            @touchstart="slideStart"
        />
    </div>
</template>

<script lang="ts">
import ease from "easy-ease"
import debounce from "lodash.debounce"
import { computed, defineComponent, reactive, watch } from "vue"

export default defineComponent({
    name: "SlideUnlock",
    props: {
        autoWidth: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 60
        },
        text: {
            type: String,
            default: "slide to unlock"
        },
        successText: {
            type: String,
            default: "success"
        },
        circle: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        noanimate: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: "slideunlock"
        }
    },
    setup(props, { emit }) {
        const Slider = reactive({
            CanMove: false,
            IsComplete: false,
            StartPositionWindow: 0,
            HandlerPosition: 0,
            ProgressWidth: 0,
            TextOpacity: 1
        })

        const slideUnlockStyle = computed(() => {
            return {
                width: props.autoWidth ? "auto" : props.width + "px",
                height: props.height + "px"
            }
        })

        const progressBarStyle = computed(() => {
            return {
                width: Slider.ProgressWidth + "px",
                height: props.height + "px",
                borderRadius: props.circle
                    ? !Slider.IsComplete
                        ? (props.height / 2 + "px 0 0 " + props.height / 2 + "px")
                        : (props.height / 2 + "px ")
                    : 0
            }
        })

        const handlerStyle = computed(() => {
            return {
                left: Slider.HandlerPosition + "px",
                width: props.height + "px",
                height: props.height + "px"
            }
        })

        const message = computed(() => {
            return Slider.IsComplete ? props.successText : props.text
        })

        const sliderWidth = computed(() => {
            const h = document.getElementById(props.name) as HTMLElement
            return props.autoWidth
                ? h.clientWidth - (parseInt(getComputedStyle(h).getPropertyValue("--su-size-padding").replace("px", ""), 10) * 2)
                : props.width
        })

        watch(() => props.autoWidth, () => {
            if (Slider.IsComplete) {
                setTimeout(() => {
                    Slider.ProgressWidth = sliderWidth.value
                }, 1)
            }
        })

        watch(() => props.width, () => {
            if (Slider.IsComplete) {
                Slider.ProgressWidth = sliderWidth.value
            }
        })

        const fadeText = debounce(function() {
            const ReversePercent = ((sliderWidth.value - props.height) * (100 / Slider.HandlerPosition)) / 1000 - 0.1
            if (Slider.CanMove) { Slider.TextOpacity = ReversePercent }
        }, 5)

        const slideStart = (e: MouseEvent | TouchEvent) => {
            if (!Slider.IsComplete) {
                Slider.CanMove = true
                if (window.TouchEvent && e instanceof TouchEvent && e.touches) {
                    Slider.StartPositionWindow = (e.touches[0].pageX) - Slider.HandlerPosition
                }
                else if (e instanceof MouseEvent) {
                    Slider.StartPositionWindow = (e.pageX) - Slider.HandlerPosition
                }
            }
            document.onmousemove = (ev) => {
                const el = ev
                slideMoving(el)
                return false
            }
            document.onmouseup = (ev) => {
                const el = ev
                slideFinish(el)
                document.onmousemove = null
                return false
            }
        }

        const slideMoving = (e: unknown) => {
            if (Slider.CanMove && !Slider.IsComplete) {
                if (window.TouchEvent && e instanceof TouchEvent && e.touches) {
                    Slider.HandlerPosition = (e.touches[0].pageX) - Slider.StartPositionWindow
                }
                else if (e instanceof MouseEvent) {
                    Slider.HandlerPosition = (e.pageX) - Slider.StartPositionWindow
                }
                if (Slider.HandlerPosition > 0 && Slider.HandlerPosition <= (sliderWidth.value - props.height)) {
                    Slider.ProgressWidth = (Slider.HandlerPosition + props.height / 2)
                    fadeText()
                }
                else if (Slider.HandlerPosition > (sliderWidth.value - props.height)) {
                    Slider.HandlerPosition = (sliderWidth.value - props.height)
                    Slider.ProgressWidth = (sliderWidth.value)
                    passVerify()
                }
            }
        }

        const slideFinish = (e: unknown) => {
            if (Slider.CanMove && !Slider.IsComplete) {
                if (window.TouchEvent && e instanceof TouchEvent && e.touches) {
                    Slider.HandlerPosition = (e.changedTouches[0].pageX) - Slider.StartPositionWindow
                }
                else if (e instanceof MouseEvent) {
                    Slider.HandlerPosition = (e.pageX) - Slider.StartPositionWindow
                }
                if (Slider.HandlerPosition < (sliderWidth.value - props.height)) {
                    ease({
                        startValue: Slider.HandlerPosition,
                        endValue: 0,
                        durationMs: 200,
                        onStep: (value: number) => {
                            Slider.HandlerPosition = value
                            Slider.ProgressWidth = value + (props.height / 2)
                        }
                    })
                    Slider.TextOpacity = 1
                }
                Slider.CanMove = false
            }
        }

        const passVerify = () => {
            Slider.IsComplete = true
            Slider.CanMove = false
            emit("completed")
        }

        const reset = () => {
            Slider.CanMove = false
            Slider.IsComplete = false
            Slider.StartPositionWindow = 0
            Slider.HandlerPosition = 0
            Slider.ProgressWidth = 0
            Slider.TextOpacity = 1
        }

        const complete = () => {
            Slider.CanMove = false
            Slider.IsComplete = true
            Slider.StartPositionWindow = 0
            Slider.HandlerPosition = 0
            Slider.ProgressWidth = sliderWidth.value
            Slider.TextOpacity = 1
        }

        return {
            Slider,
            slideUnlockStyle,
            progressBarStyle,
            handlerStyle,
            message,
            sliderWidth,
            slideStart,
            slideMoving,
            slideFinish,
            reset,
            complete
        }
    }
})
</script>

<style lang="scss" scoped>
    @keyframes animated {
        from {
            background-position: -300px 0;
        }
        to {
            background-position: 300px 0;
        }
    }
    @keyframes shine {
        100% {
            width: 100%;
            transition: all 5s ease-out;
            background-color: rgb(255 255 255 / 0%);
        }
    }
    .slideunlock {
        --su-size-text: 24px;
        --su-size-padding: 6px;
        --su-color-bg: #EBEBEB;
        --su-color-progress-normal-bg: #CACACA;
        --su-color-progress-complete-bg: #42B983;
        --su-color-text-normal: #4F4F4F;
        --su-color-text-complete: #FEFEFE;
        --su-color-handler-bg: #FFF;
        --su-icon-handler: url("data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==");

        display: flex;
        position: relative;
        box-sizing: content-box;
        padding: var(--su-size-padding);
        background-color: var(--su-color-bg);
        text-align: center;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            transition: none;
            animation: shine 4s infinite;
            background-color: rgb(255 255 255 / 40%);
        }
        .slideunlock-progressbar {
            position: absolute;
            z-index: 1;
            width: 0;
            height: 34px;
            transition: background 1s ease-out;
            background-color: var(--su-color-progress-normal-bg);
        }
        .slideunlock-text {
            display: inline;
            z-index: 2;
            align-items: center;
            justify-content: center;
            width: 100%;
            transition: background 1s ease, color 1s ease;
            animation: animated 2s linear infinite;
            background: var(--su-color-text-normal) linear-gradient(90deg, rgb(255 255 255 / 0%), white, rgb(255 255 255 / 0%)) no-repeat;
            background-clip: text;

            // color: var(--su-color-text-normal);
            color: transparent;
            font-size: var(--su-size-text);
            user-select: none;
            &::before {
                content: "";
                display: inline-block;
                height: 100%;
                vertical-align: middle;
            }
        }
        .slideunlock-handler {
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
            margin: var(--su-size-padding);
            transition: background 0.75s ease, transform 0.1s ease-in;
            background: var(--su-color-handler-bg) var(--su-icon-handler) no-repeat center;
            cursor: grab;
            &:active {
                transform: scale(1.05);
                cursor: grabbing;
            }
        }
        &.is-circle {
            border-radius: 50rem;
            &::after {
                border-radius: 50rem 0 0 50rem;
            }
            .slideunlock-handler {
                border-radius: 50%;
            }
        }
        &.is-noanimate {
            &::after {
                animation: none;
            }
            .slideunlock-text {
                animation: none;
                color: var(--su-color-text-normal);
            }
        }
        &.is-disabled {
            opacity: 0.5;
            &::after {
                content: "";
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                animation: none;
                opacity: 0.5;
                background-color: var(--su-color-bg);
            }
            .slideunlock-text {
                animation: none;
                opacity: 0.25;
                color: var(--su-color-text-normal);
            }
            .slideunlock-handler {
                pointer-events: none;
            }
        }
        &.is-disabled.is-circle {
            &::after {
                border-radius: 50rem;
            }
        }
        &.is-complete {
            &::after {
                animation: none;
            }
            .slideunlock-progressbar {
                background-color: var(--su-color-progress-complete-bg);
            }
            .slideunlock-text {
                animation: none;
                opacity: 1 !important;
                color: var(--su-color-text-complete);
            }
            .slideunlock-handler {
                opacity: 0;
                background: var(--su-color-progress-complete-bg);
            }
        }
    }
</style>
