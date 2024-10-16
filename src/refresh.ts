if (
  import.meta.env.DEV &&
  new URL(location.href).searchParams.get("view") == "latest"
) {
  setTimeout(() => location.reload(), 200)
}
