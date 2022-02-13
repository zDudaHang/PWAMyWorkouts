import { Button, Heading, Icon, VFlow } from "bold-ui"
import { PublicationModel } from "../model/model"
import React from "react"
import { WorkoutView } from "../components/WorkoutView"
import { db } from "../db"

interface PublicationViewProps {
  publication: PublicationModel
}

export function PublicationView(props: PublicationViewProps) {
  const {
    publication: { title, date, workout },
  } = props

  const handleClick = () => {
    db.savedWorkouts.add({
      ...workout,
    })
  }

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <Heading level={2} style={{ marginBottom: "-0.5rem" }}>
        {`${title} (${date})`}
      </Heading>
      <WorkoutView workout={workout} />
      <Button size="small" skin="ghost" onClick={handleClick}>
        <Icon icon="download" style={{ marginRight: "0.5rem" }} />
        Salvar
      </Button>
    </VFlow>
  )
}
