/// <reference types="cypress" />

import SlideUnlock from './SlideUnlock.vue'
import '@cypress/code-coverage/support'
import { mount } from 'cypress/vue'

describe('<SlideUnlock />', () => {
    it('render the component', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(SlideUnlock)
    })

    it('render text prop when passed', () => {
        const text = "drag to the right"
        cy.mount(SlideUnlock, {
            props: {
                text
            }
        })
        cy.get('.slideunlock-text').invoke('text').should('eq', text)
    })

    it("renders with fixed width when autoWidth=false prop passed", () => {
        const compWidth = 500
        cy.mount(SlideUnlock, {
            props: {
                autoWidth: false,
                width: compWidth
            }
        })
        cy.get('#slideunlock').invoke('css', 'width').then((width) => {
            expect(width).to.eq(`${compWidth}px`)
        })
    })

    it("renders with desired height when height prop passed", () => {
        const compHeight = 100
        cy.mount(SlideUnlock, {
            props: {
                height: compHeight
            }
        })
        cy.get('#slideunlock').invoke('css', 'height').then((height) => {
            expect(height).to.eq(`${compHeight}px`)
        })
    })

    it("renders disabled when disabled=true prop passed", () => {
        cy.mount(SlideUnlock, {
            props: {
                disabled: true
            }
        })
        cy.get('#slideunlock').should('have.class', 'is-disabled')
    })

    it("renders without animations when noanimate=true prop passed", () => {
        cy.mount(SlideUnlock, {
            props: {
                noanimate: true
            }
        })
        cy.get('#slideunlock').should('have.class', 'is-noanimate')
    })

    it("unfinished slide test with TouchEvent", () => {
        const text = "drag to the right"
        const successText = "excelsior"
        const width = 400
        cy.mount(SlideUnlock, {
            props: {
                text,
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler");

        handler.realSwipe("toRight", {
            length: width - 100
        });

        cy.get('.slideunlock-text').invoke('text').should('eq', text)
    })

    it("slide to unlock test with TouchEvent", () => {
        const successText = "excelsior"
        const width = 400
        cy.mount(SlideUnlock, {
            props: {
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler");
        handler.realSwipe("toRight", {
            length: width
        });

        cy.get('.slideunlock-text').invoke('text').should('eq', successText)
    })

    it("unfinished slide test with MouseEvent", () => {
        const text = "drag to the right"
        const successText = "excelsior"
        const width = 400
        cy.mount(SlideUnlock, {
            props: {
                text,
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler");
        handler.realMouseDown();
        handler.realMouseMove(width - 100, 0, { position: "center" });
        handler.realMouseUp();

        cy.get('.slideunlock-text').invoke('text').should('eq', text)
    })

    it("slide to unlock test with MouseEvent", () => {
        const successText = "excelsior"
        const width = 400
        cy.mount(SlideUnlock, {
            props: {
                successText,
                autoWidth: false,
                width
            }
        })

        const handler = cy.get(".slideunlock-handler");
        handler.realMouseDown();
        handler.realMouseMove(width, 0, { position: "center" });
        handler.realMouseUp();

        cy.get('.slideunlock-text').invoke('text').should('eq', successText)
    })

    it("update some props", () => {
        const compWidth = 300
        const windowWidth = window.innerWidth
        var component = null

        cy.mount(SlideUnlock, {
            props: {
                autoWidth: true
            }
        }).as('component')

        const handler = cy.get(".slideunlock-handler");
        handler.realSwipe("toRight", {
            length: windowWidth
        });

        cy.get('@component').then(({ wrapper }) => {
            wrapper.setProps({
                autoWidth: false
            })
        })

        cy.get('@component').then(({ wrapper }) => {
            wrapper.setProps({
                autoWidth: false,
                width: compWidth
            })
        })

        cy.wait(100)

        cy.get('#slideunlock').invoke('css', 'width').then((width) => {
            expect(width).to.eq(`${compWidth}px`)
        })
    })

})
