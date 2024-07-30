// cypress.config.ts
import coverage from "@cypress/code-coverage/task"
import { defineConfig } from "cypress"

export default defineConfig({
    env: {
        codeCoverage: {
            excludeSpecPattern: [
                "*.cy.ts",
                "*.spec.ts"
            ]
        }
    },
    projectId: "slide-unlock",
    component: {
        video: true,
        experimentalMemoryManagement: true,
        devServer: {
            framework: "vue",
            bundler: "vite"
        },
        setupNodeEvents(on, config) {
            coverage(on, config)
            return config
        }
    }
})
