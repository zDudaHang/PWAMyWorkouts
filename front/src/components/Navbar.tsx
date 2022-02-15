import { HFlow, Link, Text } from "bold-ui"
import React from "react"
import { MY_SAVED_WORKOUTS_URL } from "./root/model"

export function Navbar() {
  return (
    <HFlow
      justifyContent="flex-start"
      style={{ borderBottom: "1px solid", padding: "0.5rem" }}
    >
      <Text>My Workouts</Text>
      <Link href="/">Home</Link>
      <Link href={MY_SAVED_WORKOUTS_URL}>My saved workouts</Link>
    </HFlow>
  )
}
