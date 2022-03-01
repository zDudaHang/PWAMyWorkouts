import { Button, Icon, VFlow } from "bold-ui"
import React, { useContext } from "react"
import { db } from "../../db"
import { CreatorModel, WorkoutModel } from "../../../../model/model"
import { verifyNotificationPermission } from "../../util"
import { WorkoutView } from "../WorkoutView"
import { LoggedUserContext } from "../context/LoggedUserContext"

interface PublicationViewProps {
  workout: WorkoutModel
  isFollowing: boolean
  addNewFollowing: (creator: CreatorModel) => void
}

export function PublicationView(props: PublicationViewProps) {
  const { workout, isFollowing, addNewFollowing } = props

  const { user } = useContext(LoggedUserContext)

  const handleClick = () => {
    db.savedWorkouts.add({
      ...workout,
    })
  }

  const handleFollowClick = () => {
    if (user) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
      fetch(`api/follow/${workout.creator.id}/${user.id}`, requestOptions)
      addNewFollowing(workout.creator)
      verifyNotificationPermission(workout.creator.username, user.id)
    }
  }

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <WorkoutView workout={workout} />
      <Button size="small" skin="ghost" onClick={handleClick}>
        <Icon icon="download" style={{ marginRight: "0.5rem" }} />
        Save
      </Button>
      <Button size="small" skin="ghost" onClick={handleFollowClick}>
        <Icon
          icon={isFollowing ? "bellFilled" : "bellOutline"}
          style={{ marginRight: "0.5rem" }}
        />
        Follow {workout.creator.username}
      </Button>
    </VFlow>
  )
}
