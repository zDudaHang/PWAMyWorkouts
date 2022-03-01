import { VFlow } from "bold-ui"
import React from "react"
import { LoggedUserContextProvider } from "./components/context/LoggedUserContextProvider"
import { Navbar } from "./components/Navbar"
import { RootView } from "./components/root/RootView"

function App() {
  return (
    <VFlow>
      <LoggedUserContextProvider>
        <Navbar />
        <RootView />
      </LoggedUserContextProvider>
    </VFlow>
  )
}

export default App
