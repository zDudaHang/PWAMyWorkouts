import { Button, HFlow, Icon, Link, Text } from "bold-ui"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LOCAL_STORAGE_LOGGED_USER } from "../constants"
import { LoggedUserContext } from "./context/LoggedUserContext"
import { useOnlineStatus } from "./context/useOnlineStatus"
import {
  CREATE_WORKOUT_URL,
  FEED_URL,
  LOGIN_URL,
  MY_SAVED_WORKOUTS_URL,
} from "./root/model"

export function Navbar() {
  const { user, setUser } = useContext(LoggedUserContext)
  const isOnline = useOnlineStatus()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_LOGGED_USER)
    setUser(undefined)
    navigate(LOGIN_URL)
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
          {isOnline && <Link href={CREATE_WORKOUT_URL}>Create workout</Link>}
          <Button size="small" skin="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
      {!isOnline && (
        <HFlow alignItems="center">
          <Icon icon="exclamationTriangleFilled" />
          <Text>You're off-line, some features are disabled now</Text>
        </HFlow>
      )}
    </HFlow>
  )
}
