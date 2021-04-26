<template>
    <div
        ref="slider"
        class="slideunlock"
        :style="slideUnlockStyle"
        @mousemove="slideMoving"
        @mouseup="slideFinish"
        @touchmove="slideMoving"
        @touchend="slideFinish"
    >
        <div class="slideunlock-progressbar" :style="progressBarStyle" />
        <div class="slideunlock-text">
            {{ message }}
        </div>

        <div
            ref="handler"
            class="slideunlock-handler"
            :style="handlerStyle"
            @mousedown="slideStart"
            @touchstart="slideStart"
        >
            <i :class="handlerIcon" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import ease from "easy-ease"

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
        handlerIcon: {
            type: String,
            default: ""
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
            }
        }
    },
    computed: {
        slideUnlockStyle() {
            return {
                width: this.autoWidth ? "auto" : this.width + "px",
                height: this.height + "px",
                borderRadius: this.circle ? (this.height/1.5 + "px") : 0
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
                height: this.height + "px",
                borderRadius: this.circle ? "50%" : 0
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
        slideStart(e) {
            if (!this.IsComplete) {
                this.CanMove = true
                this.StartPositionWindow = (e.pageX||e.touches[0].pageX) - parseInt(this.$refs.handler.style.left.replace("px",""), 10)
            }

        },
        slideMoving(e) {
            if (this.CanMove && !this.IsComplete){
                this.HandlerPosition = (e.pageX||e.touches[0].pageX) - this.StartPositionWindow
                if (this.HandlerPosition > 0 && this.HandlerPosition <= (this.sliderWidth - this.height)){
                    this.Handler.left = this.HandlerPosition + "px"
                    this.Progress.width = (this.HandlerPosition + this.height/2) + "px"
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
                        durationMs: 300,
                        onStep: value => {
                            this.Handler.left = value + "px"
                            this.Progress.width = value + (this.height / 2) + "px"
                        }
                    })
                }
                this.CanMove = false
            }

        },
        passVerify() {
            this.IsComplete = true
            this.CanMove = false
            this.$refs.slider.className += " is-complete"
            this.$emit("passcallback")
        }
    }
})
</script>

<style lang="scss">
    :root {
        --su-color-bg:#ebebeb;
        --su-color-handler-bg:#FFFFFF;
        --su-color-progress-normal-bg:#cacaca;
        --su-color-progress-complete-bg:#37A463;
        --su-color-text-normal:#4F4F4F;
        --su-color-text-complete:#FEFEFE;
        --su-size-text:24px;
        --su-size-padding:6px;
    }
    @keyframes animated {
        from {
            background-position: -300px 0;
        }
        to {
            background-position: 300px 0;
        }
    }
	.slideunlock {
        position: relative;
        background-color: var(--su-color-bg);
        text-align: center;
        display: flex;
        padding: var(--su-size-padding);
        .slideunlock-progressbar {
            position: absolute;
            height: 34px;
            width: 0;
            transition: background 1s ease;
            background-color: var(--su-color-progress-normal-bg);
            z-index: 1;
        }
        .slideunlock-text {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            user-select: none;
            animation: animated 2s linear infinite;
            background-clip: text;
            background-color: var(--su-color-text-normal);
            background-image: -webkit-linear-gradient(left, rgba(255, 255, 255, 0), var(--su-color-handler-bg), rgba(255, 255, 255, 0));
            background-repeat: no-repeat;
            color: transparent;
            transition: all 1s ease;
            font-size: var(--su-size-text);
            z-index: 2;
        }
        .slideunlock-handler {
            position: absolute;
            top: 0;
            left: 0;
            cursor: grab;
            transition: background 0.75s ease, transform 0.1s ease-in;
            background: var(--su-color-handler-bg) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
            margin: var(--su-size-padding);
            z-index: 3;
            &:active {
                transform: scale(1.05);
            }
            i {
                color: var(--color-text);
                font-size: 1.5em;
            }
        }
        &.is-complete {
            .slideunlock-progressbar {
                background-color: var(--su-color-progress-complete-bg);
            }
            .slideunlock-text {
                color: var(--su-color-text-complete);
            }
            .slideunlock-handler {
                background: var(--su-color-progress-complete-bg);
                opacity: 0;
            }
        }
    }
</style>
