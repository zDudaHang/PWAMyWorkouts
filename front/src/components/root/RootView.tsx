import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../feed/Home"
import { MY_SAVED_WORKOUTS_URL } from "./model"
import React from "react"
import { SavedWorkoutsView } from "../SavedWorkoutsView"

export function RootView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={MY_SAVED_WORKOUTS_URL} element={<SavedWorkoutsView />} />
      </Routes>
    </BrowserRouter>
  )
}
