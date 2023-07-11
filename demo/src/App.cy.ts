/// <reference types="cypress" />

import App from "./App.vue"
import "@cypress/code-coverage/support"
import { mount } from "cypress/vue"

describe("<App />", () => {
    it("render the component", () => {
        cy.mount(App)
    })

    it("complete state", () => {
        cy.mount(App)
        cy.get("[data-cy=\"complete\"]").click()
        cy.get("#slideunlock").should("have.class", "is-complete")
    })

    it("reset state", () => {
        cy.mount(App)
        cy.get("[data-cy=\"complete\"]").click()
        cy.get("#slideunlock").should("have.class", "is-complete")

        cy.get("[data-cy=\"reset\"]").click()
        cy.get("#slideunlock").should("not.have.class", "is-complete")
    })
})
