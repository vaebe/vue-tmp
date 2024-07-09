// eslint.config.js
import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "single"
  },
  formatters: {
    css: true,
    html: true,
    markdown: "prettier"
  },
  ignores: [
    "node_modules/*",
    "/dist",
    "/src/*.d.ts",
    "**.json",
    "**.svg",
    "*.js"
  ]
});
