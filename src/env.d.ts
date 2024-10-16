/// <reference path="../.astro/types.d.ts" />

declare module "@zsnout/tailwind" {
  export function zSnoutTheme(): import("tailwindcss/types/config").PluginCreator
}
