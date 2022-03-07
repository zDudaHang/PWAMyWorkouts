export function registerServiceWorker() {
  if (navigator.serviceWorker) {
    const serviceWorkerURL = `${process.env.PUBLIC_URL}/serviceWorker.js`
    navigator.serviceWorker.register(serviceWorkerURL).then(() => {
      console.log("SW Registrado!")
    })
  }
}
