import { WorkoutModel } from "../model/model"
import React from "react"
import { VFlow, Text, Heading } from "bold-ui"

interface WorkoutProps {
  workout: WorkoutModel
}

export function WorkoutView(props: WorkoutProps) {
  const {
    workout: { creator, description, name },
  } = props

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <Heading level={3} style={{ marginBottom: "-0.5rem" }}>
        {name}
      </Heading>
      <Text>Publicado por {creator.name}</Text>
      <Text style={{ whiteSpace: "pre-wrap" }}>{description}</Text>
    </VFlow>
  )
}
