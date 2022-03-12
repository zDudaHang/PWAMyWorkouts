import React, { useState, useEffect } from "react"
import { LOCAL_STORAGE_ONLINE_STATUS } from "../../constants"

export const OnlineStatusContext = React.createContext(true)

export function OnlineStatusProvider(props: any) {
  const { children } = props
  const [onlineStatus, setOnlineStatus] = useState<boolean>(navigator.onLine)

  const updateOnlineStatus = (status: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_ONLINE_STATUS, JSON.stringify(status))
    setOnlineStatus(status)
  }

  useEffect(() => {
    window.addEventListener("offline", () => {
      updateOnlineStatus(false)
    })
    window.addEventListener("online", () => {
      updateOnlineStatus(true)
    })

    // clean-up when the component is no longer mounted
    return () => {
      window.removeEventListener("offline", () => {
        updateOnlineStatus(false)
      })
      window.removeEventListener("online", () => {
        updateOnlineStatus(true)
      })
    }
  }, [])

  useEffect(() => {
    const isOnline = window.localStorage.getItem(LOCAL_STORAGE_ONLINE_STATUS)
    if (isOnline !== null) {
      setOnlineStatus(Boolean(isOnline))
    }
  }, [])

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  )
}
