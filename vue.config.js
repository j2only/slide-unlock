const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    publicPath: "/vue-slide-unlock/",
    css: { extract: false },
    transpileDependencies: true
})
