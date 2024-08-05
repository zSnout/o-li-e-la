/// <reference types="vite/client" />

declare interface ArrayConstructor {
  isArray(v: unknown): v is readonly any[]
}
