import React from "react"
import { VFlow, Text, Heading } from "bold-ui"
import { WorkoutModel } from "../../../model/model"

interface WorkoutProps {
  workout: WorkoutModel
}

export function WorkoutView(props: WorkoutProps) {
  const {
    workout: { creator, description, title },
  } = props

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <Heading level={2} style={{ marginBottom: "-0.5rem" }}>
        {title}
      </Heading>
      <Text>Published by {creator.username}</Text>
      <Text style={{ whiteSpace: "pre-wrap" }}>{description}</Text>
    </VFlow>
  )
}
