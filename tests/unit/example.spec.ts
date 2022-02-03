import { shallowMount } from "@vue/test-utils"
import SlideUnlock from "@/components/SlideUnlock.vue"

describe("SlideUnlock.vue", () => {
    it("renders props.msg when passed", () => {
        const text = "slide to unlock"
        const wrapper = shallowMount(SlideUnlock, {
            props: { text }
        })
        expect(wrapper.text()).toMatch(text)
    })
})
