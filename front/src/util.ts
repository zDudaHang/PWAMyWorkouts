export function verifyNotificationPermission(creatorName: string) {
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
    }
  }
}
