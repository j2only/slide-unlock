module.exports = {
    root: true,
    env: {
        node: true
    },
    "plugins": ["import", "promise"],
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:vue/vue3-essential"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/no-deprecated-slot-attribute": "off",
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "never"],
        "import/extensions": 0,
        "import/prefer-default-export": 0,
        "no-unused-vars": 1,
        "no-underscore-dangle": 0,
        "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
        "no-shadow": 0,
        "max-len": ["error", { code: 160, ignoreRegExpLiterals: true, ignoreStrings: true }],
        "func-names": ["error", "never"],
        "prefer-arrow-callback": 0,
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],

        "array-bracket-spacing": ["error", "never"],
        "vue/array-bracket-spacing": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "vue/object-curly-spacing": ["error", "always"],
        "block-spacing": ["error", "always"],
        "vue/block-spacing": ["error", "always"],
        "comma-dangle": ["error", "never"],
        "vue/comma-dangle": ["error", "never"],
        eqeqeq: ["error", "smart"],
        "vue/eqeqeq": ["error", "smart"],
        "arrow-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "vue/arrow-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        "vue/key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true
            }
        ],

        "vue/no-v-html": ["off", true],
        "vue/script-indent": ["error", 4],
        "vue/html-indent": [
            "error",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: 4,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        "vue/singleline-html-element-content-newline": [
            "error",
            {
                ignoreWhenNoAttributes: true,
                ignoreWhenEmpty: true,
                ignores: [
                    "p",
                    "span",
                    "small",
                    "a",
                    "label",
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6"
                ]
            }
        ]
    },
    overrides: [
        {
            files: [
                "./src/App.vue",
                "./src/components/SlideUnlock.vue"
            ],
            rules: {
                "max-len": 0
            }
        }
    ]
}
