const CACHE_NAME = "MY_WORKOUT_PWA_APP"

const IMAGES = [
  "/images/weight128.png",
  "/images/weight256.png",
  "/images/weight512.png",
]

const OFFLINE_URLS = ["/"]

const FILES_TO_CACHE = [
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/static/js/bundle.js",
  ...IMAGES,
  ...OFFLINE_URLS,
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
    console.log("FETCH on off-line")
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
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

  const { title, usename } = JSON.parse(body)

  var options = {
    body: title,
    icon: "images/weight128.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
  }
  e.waitUntil(
    this.registration.showNotification(
      `@${usename} created a new workout !`,
      options
    )
  )
})
