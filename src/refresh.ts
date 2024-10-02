if (import.meta.env.DEV) {
  if (new URL(location.href).searchParams.has("latest")) {
    setTimeout(() => location.reload(), 100)
  }
}
