import { Heading, VFlow, Text } from "bold-ui"
import React from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { WorkoutView } from "./WorkoutView"
import { db } from "../db"

export function SavedWorkoutsView() {
  const savedWorkouts = useLiveQuery(() => db.savedWorkouts.toArray())

  const hasSavedWorkouts = savedWorkouts && savedWorkouts.length > 0

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <Heading level={2}>Saved workouts</Heading>
      {!hasSavedWorkouts ? (
        <Text>There are no saved workouts</Text>
      ) : (
        savedWorkouts?.map((workout) => (
          <WorkoutView key={workout.id} workout={workout} />
        ))
      )}
    </VFlow>
  )
}
