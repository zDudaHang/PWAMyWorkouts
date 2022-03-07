import React from "react"
import { LoggedUserContextProvider } from "./components/context/LoggedUserContextProvider"
import { RootView } from "./components/root/RootView"

function App() {
  return (
    <LoggedUserContextProvider>
      <RootView />
    </LoggedUserContextProvider>
  )
}

export default App
