/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

import "@cypress/code-coverage/support";
import { mount } from "cypress/vue";
import SlideUnlock from "./SlideUnlock.vue";
import "./style.scss";

describe("<SlideUnlock />", () => {
    it("render the component", () => {
        // see: https://on.cypress.io/mounting-vue
        mount(SlideUnlock)
    })

    it("render text prop when passed", () => {
        const text = "drag to the right"
        mount(SlideUnlock, {
            props: {
                text
            }
        })
        cy.get(".slideunlock-text").invoke("text").should("eq", text)
    })

    it("renders with fixed width when autoWidth=false prop passed", () => {
        const compWidth = 500
        mount(SlideUnlock, {
            props: {
                autoWidth: false,
                width: compWidth
            }
        })
        cy.get("#slideunlock").invoke("css", "width").then((width) => {
            expect(width).to.eq(`${compWidth}px`)
        })
    })

    it("renders with sharp borders", () => {
        mount(SlideUnlock, {
            props: {
                circle: false
            }
        })
        cy.get("#slideunlock").should("not.have.class", "is-circle")
    })

    it("renders with desired height when height prop passed", () => {
        const compHeight = 100
        mount(SlideUnlock, {
            props: {
                height: compHeight
            }
        })
        cy.get("#slideunlock").invoke("css", "height").then((height) => {
            expect(height).to.eq(`${compHeight}px`)
        })
    })

    it("renders disabled when disabled=true prop passed", () => {
        mount(SlideUnlock, {
            props: {
                disabled: true
            }
        })
        cy.get("#slideunlock").should("have.class", "is-disabled")
    })

    it("renders without animations when noanimate=true prop passed", () => {
        mount(SlideUnlock, {
            props: {
                noanimate: true
            }
        })
        cy.get("#slideunlock").should("have.class", "is-noanimate")
    })

    it("unfinished slide test with TouchEvent", () => {
        const text = "drag to the right"
        const successText = "excelsior"
        const width = 400
        mount(SlideUnlock, {
            props: {
                text,
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler")

        handler.realSwipe("toRight", {
            length: width - 100
        })

        cy.get(".slideunlock-text").invoke("text").should("eq", text)
    })

    it("slide to unlock test with TouchEvent", () => {
        const successText = "excelsior"
        const width = 400
        mount(SlideUnlock, {
            props: {
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler")
        handler.realSwipe("toRight", {
            length: width
        })

        cy.get(".slideunlock-text").invoke("text").should("eq", successText)
    })

    it("unfinished slide test with MouseEvent", () => {
        const text = "drag to the right"
        const successText = "excelsior"
        const width = 400
        mount(SlideUnlock, {
            props: {
                text,
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler")
        handler.realMouseDown()
        handler.realMouseMove(width - 100, 0, { position: "center" })
        handler.realMouseUp()

        cy.get(".slideunlock-text").invoke("text").should("eq", text)
    })

    it("slide to unlock test with MouseEvent", () => {
        const successText = "excelsior"
        const width = 400
        mount(SlideUnlock, {
            props: {
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler")
        handler.realMouseDown()
        handler.realMouseMove(width, 0, { position: "center" })
        handler.realMouseUp()

        cy.get(".slideunlock-text").invoke("text").should("eq", successText)
    })

    // it("update some props", () => {
    //     const compWidth = 300
    //     const windowWidth = window.innerWidth

    //     mount(SlideUnlock, {
    //         props: {
    //             autoWidth: true
    //         }
    //     }).as("component")

    //     const handler = cy.get(".slideunlock-handler")
    //     handler.realSwipe("toRight", {
    //         length: windowWidth
    //     })

    //     cy.get("@component").then(({ wrapper }) => {
    //         wrapper.setProps({
    //             autoWidth: false
    //         })
    //     })

    //     cy.get("@component").then(({ wrapper }) => {
    //         wrapper.setProps({
    //             autoWidth: false,
    //             width: compWidth
    //         })
    //     })

    //     cy.wait(100)

    //     cy.get("#slideunlock").invoke("css", "width").then((width) => {
    //         expect(width).to.eq(`${compWidth}px`)
    //     })
    // })
})
