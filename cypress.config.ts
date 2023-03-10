// cypress.config.ts
import { defineConfig } from "cypress"
import coverage from '@cypress/code-coverage/task'

export default defineConfig({
    component: {
        devServer: {
            framework: "vue",
            bundler: "vite"
        },
        setupNodeEvents(on, config) {
            coverage(on, config)
            return config
        }
    },
})
