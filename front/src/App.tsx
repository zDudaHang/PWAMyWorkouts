import { VFlow } from "bold-ui"
import React from "react"
import { Navbar } from "./Navbar"
import { RootView } from "./root/RootView"

function App() {
  return (
    <VFlow>
      <Navbar />
      <RootView />
    </VFlow>
  )
}

export default App
