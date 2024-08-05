// @ts-check

import { zSnoutTheme } from "@zsnout/tailwind"

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      rotate: { 60: "60deg" },
      spacing: { 4.5: "1.125rem" },
      fontFamily: {
        sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", var(--font-sp)',
        "sans-noto":
          'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", var(--font-sp)',
        serif:
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif, var(--font-sp)',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, var(--font-sp)',
        mathnum: "Symbola, Times New Roman, serif, var(--font-sp)",
        mathvar: "Times New Roman, Symbols, serif, var(--font-sp)",
        "sp-sans":
          'var(--font-sp), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

        "ex-eng":
          '"Carlito", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", var(--font-sp)',
        "ex-tok":
          '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, var(--font-sp)',
      },
      colors: {
        "z-border-grid-line": "var(--z-border-grid-line)",
        "z-text-grid-label": "var(--z-text-grid-label)",
      },
      textColor: {
        "z-grid-label": "var(--z-text-grid-label)",
      },
      borderColor: {
        "z-grid-line": "var(--z-border-grid-line)",
      },
    },
  },
  plugins: [
    zSnoutTheme(),

    /** @type {import("tailwindcss/types/config").PluginCreator} */
    ({ addVariant, matchVariant }) => {
      addVariant("xs", "@media (min-width: 400px)")
      addVariant("scrollbar", "&::-webkit-scrollbar")
      addVariant("hover", ["&:hover", "&.ctx"])
      addVariant("focus", ["&:focus", "&.ctx"])
      addVariant("active", ["&:active", "&.ctx"])
      matchVariant("child", (value) => `&:nth-child(${value})`)
    },
  ],
}
