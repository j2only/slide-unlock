import { mount } from "@vue/test-utils"
import { describe, expect, it } from 'vitest';
import SlideUnlock from "./SlideUnlock.vue"

describe("SlideUnlock.vue", () => {
    it("should render the component", () => {
        const wrapper = mount(SlideUnlock)
        expect(wrapper.text()).toMatch("slide to unlock")
    })

    it("renders text prop when passed", () => {
        const text = "drag to the right"
        const wrapper = mount(SlideUnlock, {
            props: { text }
        })
        expect(wrapper.find(".slideunlock-text").text()).toMatch(text)
    })

    it("renders with fixed width when autoWidth=false prop passed", () => {
        const compWidth = 500
        const wrapper = mount(SlideUnlock, {
            props: {
                autoWidth: false,
                width: compWidth
            }
        })
        expect(wrapper.find("#slideunlock").attributes().style).toContain(`width: ${compWidth}px;`)
    })

    it("renders with desired height when height prop passed", () => {
        const compHeight = 100
        const wrapper = mount(SlideUnlock, {
            props: {
                height: compHeight
            }
        })
        expect(wrapper.find("#slideunlock").attributes().style).toContain(`height: ${compHeight}px;`)
    })

    it("renders with right angles when circle=false prop passed", () => {
        const wrapper = mount(SlideUnlock, {
            props: {
                circle: false
            }
        })
        expect(wrapper.find("#slideunlock").classes("is-circle")).toBe(false)
        expect(wrapper.find("div.slideunlock-progressbar").attributes().style).toContain("border-radius: 0")
    })

    it("renders disabled when disabled=true prop passed", () => {
        const wrapper = mount(SlideUnlock, {
            props: {
                disabled: true
            }
        })
        expect(wrapper.find("#slideunlock").classes("is-disabled")).toBe(true)
    })

    it("renders without animations when noanimate=true prop passed", () => {
        const wrapper = mount(SlideUnlock, {
            props: {
                noanimate: true
            }
        })
        expect(wrapper.find("#slideunlock").classes("is-noanimate")).toBe(true)
    })
})
