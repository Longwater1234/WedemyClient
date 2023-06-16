/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "prettier"
  ],
  plugins: ["vue", "unused-imports"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "double"],
    "unused-imports/no-unused-imports": "error",
    "vue/multi-word-component-names": [0, "never"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "comma-dangle": [1, "never"],
    "no-unused-vars": [
      1,
      {
        vars: "all",
        args: "none"
      }
    ],
    "semi-spacing": [
      1,
      {
        before: false,
        after: true
      }
    ],
    "array-bracket-spacing": [1, "never"],
    "no-var": 2
  }
};
