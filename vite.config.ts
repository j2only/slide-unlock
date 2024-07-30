/** @type {import('vite').UserConfig} */
import vue from "@vitejs/plugin-vue"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

// lib build config
export default defineConfig({
    plugins: [
        vue(),
        libInjectCss(),
        dts({
            include: ["lib/SlideUnlock.vue"]
        })
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            // Name of the library.
            name: "slide-unlock",
            // We are building for CJS and ESM, use a function to rename automatically files.
            // Example: my-component-library.esm.js
            fileName: (format) => `${"slide-unlock"}.${format}.js`
        },
        rollupOptions: {
            // Vue is provided by the parent project, don't compile Vue source-code inside our library.
            external: ["vue"],
            output: { globals: { vue: "Vue" } }
        }
    }
})
