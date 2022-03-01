import { HFlow, Link, Text } from "bold-ui"
import React, { useContext } from "react"
import { LoggedUserContext } from "./context/LoggedUserContext"
import { MY_SAVED_WORKOUTS_URL } from "./root/model"

export function Navbar() {
  const { user } = useContext(LoggedUserContext)
  return (
    <HFlow
      justifyContent="flex-start"
      style={{ borderBottom: "1px solid", padding: "0.5rem" }}
    >
      <Text>My Workouts</Text>
      {user && <Text>Bem-vindo(a) {user.username}</Text>}
      <Link href="/">Home</Link>
      <Link href={MY_SAVED_WORKOUTS_URL}>My saved workouts</Link>
    </HFlow>
  )
}
