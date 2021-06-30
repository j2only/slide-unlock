<template>
    <div
        ref="slider"
        class="slideunlock"
        :class="{
            'is-disabled': disabled,
            'is-noanimate': noanimate,
            'is-circle': circle,
            'is-complete': IsComplete
        }"
        :style="slideUnlockStyle"
        @mousemove="slideMoving"
        @mouseup="slideFinish"
        @touchmove="slideMoving"
        @touchend="slideFinish"
    >
        <div class="slideunlock-progressbar" :style="progressBarStyle" />
        <div class="slideunlock-text" :style="Text">
            {{ message }}
        </div>

        <div
            ref="handler"
            class="slideunlock-handler"
            :style="handlerStyle"
            @mousedown="slideStart"
            @touchstart="slideStart"
        />
    </div>
</template>

<script>
import { defineComponent } from "vue"
import ease from "easy-ease"

function debounce(func, wait, immediate) {
    var timeout
    return function() {
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

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
        }
    },
    data() {
        return {
            CanMove: false,
            IsComplete: false,
            StartPositionWindow: 0,
            HandlerPosition: 0,
            Handler: {
                left: 0
            },
            Progress: {
                width: 0
            },
            Text: {
                opacity: 1
            }
        }
    },
    computed: {
        slideUnlockStyle() {
            return {
                width: this.autoWidth ? "auto" : this.width + "px",
                height: this.height + "px"
            }
        },
        progressBarStyle() {
            return {
                width: this.Progress.width,
                height: this.height + "px",
                background: this.Progress.background,
                borderRadius: this.circle
                    ? !this.IsComplete
                        ? (this.height/2 + "px 0 0 " + this.height/2 + "px")
                        : (this.height/2 + "px ")
                    : 0
            }
        },
        handlerStyle() {
            return {
                left: this.Handler.left,
                width: this.height + "px",
                height: this.height + "px"
            }
        },
        message() {
            return this.IsComplete ? this.successText : this.text
        },
        sliderWidth() {
            return this.autoWidth
                ? this.$refs.slider.clientWidth - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--su-size-padding").replace("px",""), 10) * 2)
                : this.width
        }
    },
    watch: {
        autoWidth() {
            if (this.IsComplete) {
                const THIS = this
                setTimeout(() => {
                    THIS.Progress.width = THIS.sliderWidth + "px"
                }, 1)
            }
        },
        width() {
            if (this.IsComplete) {
                this.Progress.width = this.sliderWidth + "px"
            }
        }
    },
    methods: {
        fadeText: debounce(function() {
            const ReversePercent = ((this.sliderWidth - this.height) * (100 / this.HandlerPosition)) / 1000 - 0.1
            if (this.CanMove)
                this.Text.opacity = ReversePercent
        }, 5),
        slideStart(e) {
            const THIS = this
            if (!this.IsComplete) {
                this.CanMove = true
                this.StartPositionWindow = (e.pageX||e.touches[0].pageX) - parseInt(this.$refs.handler.style.left.replace("px",""), 10)
            }
            document.onmousemove = (ev) => {
                let el = ev
                THIS.slideMoving(el)
                return false
            }
            document.onmouseup = (ev) => {
                let el = ev
                THIS.slideFinish(el)
                document.onmousemove = null
                return false
            }
        },
        slideMoving(e) {
            if (this.CanMove && !this.IsComplete){
                this.HandlerPosition = (e.pageX||e.touches[0].pageX) - this.StartPositionWindow
                if (this.HandlerPosition > 0 && this.HandlerPosition <= (this.sliderWidth - this.height)){
                    this.Handler.left = this.HandlerPosition + "px"
                    this.Progress.width = (this.HandlerPosition + this.height/2) + "px"
                    this.fadeText()
                }
                else if (this.HandlerPosition > (this.sliderWidth - this.height)){
                    this.Handler.left = (this.sliderWidth - this.height) + "px"
                    this.Progress.width = (this.sliderWidth) + "px"
                    this.passVerify()
                }
            }
        },
        slideFinish(e) {
            if (this.CanMove && !this.IsComplete) {
                this.HandlerPosition = (e.pageX || e.changedTouches[0].pageX) - this.StartPositionWindow
                if (this.HandlerPosition < (this.sliderWidth - this.height)) {
                    ease({
                        startValue: this.HandlerPosition,
                        endValue: 0,
                        durationMs: 200,
                        onStep: value => {
                            this.Handler.left = value + "px"
                            this.Progress.width = value + (this.height / 2) + "px"
                        }
                    })
                    this.Text.opacity = 1
                }
                this.CanMove = false
            }

        },
        passVerify() {
            this.IsComplete = true
            this.CanMove = false
            this.$emit("completed")
        },
        reset() {
            this.CanMove = false,
            this.IsComplete = false,
            this.StartPositionWindow = 0,
            this.HandlerPosition = 0,
            this.Handler.left = 0,
            this.Progress.width = 0,
            this.Text.opacity = 1
        }
    }
})
</script>

<style lang="scss">
    :root {
        --su-size-text: 24px;
        --su-size-padding: 6px;
        --su-color-bg: #EBEBEB;
        --su-color-progress-normal-bg: #CACACA;
        --su-color-progress-complete-bg: #42B983;
        --su-color-text-normal: #4F4F4F;
        --su-color-text-complete: #FEFEFE;
        --su-color-handler-bg: #FFF;
        --su-icon-handler: url('data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==');
    }
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
            background-color: rgba(255, 255, 255, 0);
        }
    }
    .slideunlock {
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
            background-color: rgba(255, 255, 255, 0.4);
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
            background: var(--su-color-text-normal) linear-gradient(90deg, rgba(255, 255, 255, 0), white, rgba(255, 255, 255, 0)) no-repeat;
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
