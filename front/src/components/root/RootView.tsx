import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CREATE_USER_URL, FEED_URL, MY_SAVED_WORKOUTS_URL } from "./model"
import React from "react"
import { SavedWorkoutsView } from "../SavedWorkoutsView"
import { Login } from "../login/Login"
import { Feed } from "../feed/Feed"
import { CreateUser } from "../login/CreateUser"
import { PrivateRoute } from "./PrivateRoute"

export function RootView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={CREATE_USER_URL} element={<CreateUser />} />
        <Route
          path={FEED_URL}
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path={MY_SAVED_WORKOUTS_URL}
          element={
            <PrivateRoute>
              <SavedWorkoutsView />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
