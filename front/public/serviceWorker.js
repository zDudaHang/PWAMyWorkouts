const CACHE_NAME = "MY_WORKOUT_PWA_APP"

const IMAGES = [
  "images/weight128.png",
  "images/weight256.png",
  "images/weight512.png",
]

const OFFLINE_URLS = ["/my-saved-workouts"]

const FILES_TO_CACHE = [
  "/",
  "index.html",
  "manifest.json",
  "favicon.ico",
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
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response
      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone()

      return fetch(fetchRequest).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone()
        if (OFFLINE_URLS.some((url) => event.request.url.includes(url)))
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache)
          })

        return response
      })
    })
  )
})

this.addEventListener("push", function (e) {
  var body

  if (e.data) {
    body = e.data.text()
  } else {
    body = "Push message no payload"
  }

  const newWorkout = JSON.parse(body)

  var options = {
    body: newWorkout.title,
    icon: "images/weight128.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
  }
  e.waitUntil(
    this.registration.showNotification(
      `@${newWorkout.username} created a new workout !`,
      options
    )
  )
})
