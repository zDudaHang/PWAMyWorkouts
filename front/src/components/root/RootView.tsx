import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  CREATE_USER_URL,
  CREATE_WORKOUT_URL,
  FEED_URL,
  LOGIN_URL,
  MY_SAVED_WORKOUTS_URL,
} from "./model"
import React from "react"
import { SavedWorkoutsView } from "../SavedWorkoutsView"
import { Login } from "../login/Login"
import { Feed } from "../feed/Feed"
import { CreateUser } from "../login/CreateUser"
import { PrivateRoute } from "./PrivateRoute"
import { Navbar } from "../Navbar"
import { CreateWorkout } from "../workout/CreateWorkout"

export function RootView() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={LOGIN_URL} element={<Login />} />
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
        <Route
          path={CREATE_WORKOUT_URL}
          element={
            <PrivateRoute>
              <CreateWorkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
