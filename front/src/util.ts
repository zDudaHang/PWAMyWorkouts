import { isNil } from "lodash"

export async function verifyNotificationPermission(
  creatorName: string,
  userId: number
) {
  if (!window.Notification) {
    alert("O navegador não tem suporte para notificações")
  } else {
    const permission = Notification.permission
    if (permission === "default") {
      Notification.requestPermission().then((status) => {
        if (status === "denied") {
          alert(
            "Você negou a permissão de notificações. Por favor, vá nas configurações do seu navegador ou celular e habilite as notificações"
          )
          return
        } else {
          alert(`Sucesso ! Agora você está seguindo o ${creatorName}`)
        }
      })
    } else if (permission === "denied") {
      alert(
        "Você negou a permissão de notificações. Por favor, vá nas configurações do seu navegador ou celular e habilite as notificações"
      )
    } else {
      alert(`Sucesso ! Agora você está seguindo o ${creatorName}`)
      await subscribeUser(userId)
    }
  }
}

export function subscribeUser(userId: number) {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(async (reg) => {
      if (process.env.REACT_APP_VAPID_PUBLIC_KEY) {
        const subscription = await reg.pushManager.getSubscription()
        console.log(subscription)
        if (isNil(subscription))
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
