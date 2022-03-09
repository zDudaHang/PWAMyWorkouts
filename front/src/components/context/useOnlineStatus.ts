import { useContext } from "react"
import { OnlineStatusContext } from "./OnlineStatusContextProvider"

export const useOnlineStatus = () => {
  const isOnline = useContext(OnlineStatusContext)
  return isOnline
}
