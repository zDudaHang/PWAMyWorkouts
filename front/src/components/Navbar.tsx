import { Button, HFlow, Link, Text } from "bold-ui"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoggedUserContext } from "./context/LoggedUserContext"
import {
  CREATE_WORKOUT_URL,
  FEED_URL,
  LOCAL_STORAGE_LOGGED_USER,
  MY_SAVED_WORKOUTS_URL,
} from "./root/model"

export function Navbar() {
  const { user, setUser } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_LOGGED_USER)
    setUser(undefined)
    navigate("/")
  }

  return (
    <HFlow
      justifyContent="flex-start"
      style={{ borderBottom: "1px solid", padding: "1rem" }}
      alignItems="center"
    >
      <Text>My Workouts App</Text>
      {user && (
        <>
          <Text>Welcome, {user.username}</Text>
          <Link href={FEED_URL}>Feed</Link>
          <Link href={MY_SAVED_WORKOUTS_URL}>My saved workouts</Link>
          <Link href={CREATE_WORKOUT_URL}>Submit workout</Link>
          <Button size="small" skin="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </HFlow>
  )
}
