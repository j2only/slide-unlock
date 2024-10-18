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
        },
        position: {
            type: Number,
            default: 0
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
            if (Slider.IsComplete)
                Slider.ProgressWidth = sliderWidth.value
        })

        const fadeText = debounce(function(force: boolean = false) {
            const ReversePercent = ((sliderWidth.value - props.height) * (100 / Slider.HandlerPosition)) / 1000 - 0.1
            if (Slider.CanMove || force)
                Slider.TextOpacity = ReversePercent
        }, 5)

        const slideStart = (e: MouseEvent | TouchEvent) => {
            if (!Slider.IsComplete) {
                Slider.CanMove = true
                if (window.TouchEvent && e instanceof TouchEvent && e.touches)
                    Slider.StartPositionWindow = (e.touches[0].pageX) - Slider.HandlerPosition

                else if (e instanceof MouseEvent)
                    Slider.StartPositionWindow = (e.pageX) - Slider.HandlerPosition
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
                let pageX = Slider.StartPositionWindow
                if (window.TouchEvent && e instanceof TouchEvent && e.touches)
                    pageX = e.touches[0].pageX
                else if (e instanceof MouseEvent)
                    pageX = e.pageX

                if (pageX < Slider.StartPositionWindow)
                    return
                else
                    Slider.HandlerPosition = pageX - Slider.StartPositionWindow

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
                let pageX = Slider.StartPositionWindow
                if (window.TouchEvent && e instanceof TouchEvent && e.touches)
                    pageX = e.changedTouches[0].pageX
                else if (e instanceof MouseEvent)
                    pageX = e.pageX

                if (pageX < Slider.StartPositionWindow)
                    return
                else if (Slider.HandlerPosition < (sliderWidth.value - props.height)) {
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

        const emulateSlideFromProps = (pos: number) => {
            if (typeof (pos) !== "number" || pos < 0 || Slider.IsComplete || props.disabled)
                return

            const computedPosition = Math.round(((sliderWidth.value - props.height) / 100) * pos)
            Slider.ProgressWidth = computedPosition + (props.height / 2)
            Slider.HandlerPosition = computedPosition
            fadeText(true)
            if (computedPosition >= sliderWidth.value - props.height) {
                complete()
                passVerify()
            }
        }

        watch(() => props.position, () => {
            emulateSlideFromProps(props.position)
        })

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
