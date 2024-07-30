/// <reference types="cypress" />

import "@cypress/code-coverage/support"
import { mount } from "cypress/vue"
import App from "./App.vue"
import "./style.scss"

describe("<App />", () => {
    it("render the component", () => {
        mount(App)
    })

    it("complete state", () => {
        mount(App)
        cy.get("[data-cy=\"complete\"]").click()
        cy.get("#slideunlock").should("have.class", "is-complete")
    })

    it("reset state", () => {
        mount(App)
        cy.get("[data-cy=\"complete\"]").click()
        cy.get("#slideunlock").should("have.class", "is-complete")

        cy.get("[data-cy=\"reset\"]").click()
        cy.get("#slideunlock").should("not.have.class", "is-complete")
    })
})
