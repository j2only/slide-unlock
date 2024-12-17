/** @type {import('vite').UserConfig} */
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

// demo build config
export default defineConfig({
    plugins: [vue()],
    base: "/slide-unlock/",
    css: { preprocessorOptions: { scss: { api: "modern-compiler" } } }
})
