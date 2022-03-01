const CACHE_NAME = "MY_WORKOUT_PWA_APP"

const IMAGES = [
  "/images/weight128.png",
  "/images/weight256.png",
  "/images/weight512.png",
]

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/static/js/bundle.js",
  ...IMAGES,
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
  var body

  if (e.data) {
    body = e.data.text()
  } else {
    body = "Push message no payload"
  }

  const { title, description, usename } = JSON.parse(body)

  console.log(title, description, usename)

  var options = {
    body: body,
    icon: "images/weight128.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "Save it",
        title: "Save it",
        icon: "images/checkmark.png",
      },
      { action: "close", title: "Close", icon: "images/xmark.png" },
    ],
  }
  e.waitUntil(
    this.registration.showNotification("New workout arrived!", options)
  )
})
