const CACHE_NAME = "MY_WORKOUT_PWA_APP"

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/index.css",
  "/manifest.json",
  "/App.tsx",
  "/favicon.ico",
  "/static/js/bundle.js",
  "/logo192.png",
  "/logo512.png",
]

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(FILES_TO_CACHE)
    })
  )
})

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    console.log("[Navegador] OFF")
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response
      })
    )
  }
})
