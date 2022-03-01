import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FEED_URL, MY_SAVED_WORKOUTS_URL } from "./model"
import React from "react"
import { SavedWorkoutsView } from "../SavedWorkoutsView"
import { Login } from "../login/Login"
import { Feed } from "../feed/Feed"

export function RootView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={FEED_URL} element={<Feed />} />
        <Route path={MY_SAVED_WORKOUTS_URL} element={<SavedWorkoutsView />} />
      </Routes>
    </BrowserRouter>
  )
}
