import { createContext } from "react"
import { LoggedUserContextModel } from "./model"

export const LoggedUserContext = createContext<LoggedUserContextModel>({
  user: undefined,
  setUser: () => {},
})
