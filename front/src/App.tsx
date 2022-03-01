import { VFlow } from "bold-ui"
import React, { useState } from "react"
import { UserModel } from "../../model/model"
import { LoggedUserContext } from "./components/context/LoggedUserContext"
import { Navbar } from "./components/Navbar"
import { RootView } from "./components/root/RootView"

function App() {
  const [user, setUser] = useState<UserModel>()
  return (
    <VFlow>
      <LoggedUserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <RootView />
      </LoggedUserContext.Provider>
    </VFlow>
  )
}

export default App
