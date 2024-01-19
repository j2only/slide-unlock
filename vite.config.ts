import { resolve } from "node:path"
/// <reference types="vitest" />
import Vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import IstanbulPlugin from "vite-plugin-istanbul"
import VitePluginStyleInject from "vite-plugin-style-inject"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig((config) => {
    return {
        plugins: [
            Vue(),
            VitePluginStyleInject(),
            IstanbulPlugin({
                include: "src/*",
                exclude: ["node_modules", "test/", "**/*.cy.js", "dist"],
                extension: [".js", ".ts", ".vue"],
                requireEnv: false
            })
        ],
        build: {
            // Output compiled files to /dist.
            outDir: "./dist",
            lib: {
                // Set the entry point (file that contains our components exported).
                entry: resolve(__dirname, "src/index.ts"),
                // Name of the library.
                name: "vue-slide-unlock",
                // We are building for CJS and ESM, use a function to rename automatically files.
                // Example: my-component-library.esm.js
                fileName: (format) => `${"vue-slide-unlock"}.${format}.js`
            },
            rollupOptions: {
                // Vue is provided by the parent project, don't compile Vue source-code inside our library.
                external: ["vue"],
                output: { globals: { vue: "Vue" } }
            }
        },
        test: {
            globals: true,
            coverage: {
                enabled: true,
                provider: "istanbul",
                reporter: ["json-summary", "html"]
            },
            environment: "jsdom",
            css: true,
            setupFiles: "./src/tests/setup.ts"
        }
    }
})
