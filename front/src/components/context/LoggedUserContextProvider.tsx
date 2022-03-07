import React, { useEffect, useState } from "react"
import { UserModel } from "../../../../model/model"
import { LOCAL_STORAGE_LOGGED_USER } from "../root/model"
import { LoggedUserContext } from "./LoggedUserContext"

export function LoggedUserContextProvider({ children }: any) {
  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    const user = window.localStorage.getItem(LOCAL_STORAGE_LOGGED_USER)
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <LoggedUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedUserContext.Provider>
  )
}
