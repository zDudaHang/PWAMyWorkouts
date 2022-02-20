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

this.addEventListener("push", function (e) {
  console.log(e)
  var options = {
    body: "This notification was generated from a push!",
    icon: "images/example.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "images/checkmark.png",
      },
      { action: "close", title: "Close", icon: "images/xmark.png" },
    ],
  }
  e.waitUntil(this.registration.showNotification("Hello world!", options))
})
