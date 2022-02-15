import { VFlow } from "bold-ui"
import React from "react"
import { Navbar } from "./components/Navbar"
import { RootView } from "./components/root/RootView"

function App() {
  return (
    <VFlow>
      <Navbar />
      <RootView />
    </VFlow>
  )
}

export default App
