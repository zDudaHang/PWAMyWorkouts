import React, { useState, useEffect } from "react"

export const OnlineStatusContext = React.createContext(true)

export function OnlineStatusProvider(props: any) {
  const { children } = props
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true)

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false)
    })
    window.addEventListener("online", () => {
      setOnlineStatus(true)
    })

    // clean-up when the component is no longer mounted
    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false)
      })
      window.removeEventListener("online", () => {
        setOnlineStatus(true)
      })
    }
  }, [])

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  )
}
