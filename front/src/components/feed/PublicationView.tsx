import { Button, Heading, Icon, VFlow } from "bold-ui"
import React from "react"
import { db } from "../../db"
import { CreatorModel, PublicationModel } from "../../../../model/model"
import { subscribeUser, verifyNotificationPermission } from "../../util"
import { WorkoutView } from "../WorkoutView"

interface PublicationViewProps {
  publication: PublicationModel
  isFollowing: boolean
  addNewFollowing: (creator: CreatorModel) => void
}

export function PublicationView(props: PublicationViewProps) {
  const {
    publication: { title, date, workout },
    isFollowing,
    addNewFollowing,
  } = props

  const handleClick = () => {
    db.savedWorkouts.add({
      ...workout,
    })
  }

  const handleFollowClick = () => {
    const request1Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
    fetch(`api/follow/${workout.creator.id}`, request1Options)
    addNewFollowing(workout.creator)
    verifyNotificationPermission(workout.creator.name)
    subscribeUser()
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
      <Button size="small" skin="ghost" onClick={handleFollowClick}>
        <Icon
          icon={isFollowing ? "bellFilled" : "bellOutline"}
          style={{ marginRight: "0.5rem" }}
        />
        Seguir {workout.creator.name}
      </Button>
    </VFlow>
  )
}
