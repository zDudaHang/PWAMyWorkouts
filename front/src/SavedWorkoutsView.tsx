import { Heading, VFlow } from "bold-ui"
import React from "react"
import { db } from "./db"
import { useLiveQuery } from "dexie-react-hooks"
import { WorkoutView } from "./components/WorkoutView"

export function SavedWorkoutsView() {
  const savedWorkouts = useLiveQuery(() => db.savedWorkouts.toArray())

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <Heading level={2}>Treinos salvos</Heading>
      {savedWorkouts?.map((workout) => (
        <WorkoutView key={workout.id} workout={workout} />
      ))}
    </VFlow>
  )
}
