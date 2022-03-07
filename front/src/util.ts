export function verifyNotificationPermission(
  creatorName: string,
  userId: number
) {
  if (!window.Notification) {
    alert("The browser does not support notifications")
  } else {
    const permission = Notification.permission
    if (permission === "default") {
      Notification.requestPermission().then((status) => {
        if (status === "denied") {
          alert(
            "You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications"
          )
          return
        }
      })
    } else if (permission === "denied") {
      alert(
        "You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications"
      )
    } else {
      subscribeUser(userId)
    }
  }
}

export function subscribeUser(userId: number) {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((reg) => {
      if (process.env.REACT_APP_VAPID_PUBLIC_KEY) {
        reg.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.REACT_APP_VAPID_PUBLIC_KEY
            ),
          })
          .then(
            (pushSubscription) => {
              const subscriptionModel = {
                subscription: pushSubscription,
                userId,
              }
              fetch("push/subscribe", {
                method: "POST",
                body: JSON.stringify(subscriptionModel),
                headers: {
                  "content-type": "application/json",
                },
              }).then((response) => console.log(response))
            },
            (error) => console.log(error)
          )
      }
    })
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
