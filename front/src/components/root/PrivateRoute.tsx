import React from "react"
import { Navigate } from "react-router-dom"
import { LOCAL_STORAGE_LOGGED_USER } from "./model"

export function PrivateRoute({ children }: any) {
  const user = window.localStorage.getItem(LOCAL_STORAGE_LOGGED_USER)
  return user ? children : <Navigate to="/" />
}
