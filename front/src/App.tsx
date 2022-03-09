import React from "react"
import { LoggedUserContextProvider } from "./components/context/LoggedUserContextProvider"
import { OnlineStatusProvider } from "./components/context/OnlineStatusContextProvider"
import { RootView } from "./components/root/RootView"

function App() {
  return (
    <OnlineStatusProvider>
      <LoggedUserContextProvider>
        <RootView />
      </LoggedUserContextProvider>
    </OnlineStatusProvider>
  )
}

export default App
