import { Button, Icon, VFlow } from "bold-ui"
import React, { useContext } from "react"
import { db } from "../../db"
import { WorkoutModel } from "../../../../model/model"
import { verifyNotificationPermission } from "../../util"
import { WorkoutView } from "../WorkoutView"
import { LoggedUserContext } from "../context/LoggedUserContext"

interface PublicationViewProps {
  workout: WorkoutModel
  isFollowing: boolean
  updateFollowingIds: (id: number) => void
}

export function PublicationView(props: PublicationViewProps) {
  const { workout, isFollowing, updateFollowingIds } = props

  const { user } = useContext(LoggedUserContext)

  const handleClick = () => {
    db.savedWorkouts.add({
      ...workout,
    })
  }

  const handleFollowClick = () => {
    if (user) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
      const apiURL = isFollowing ? "unfollow" : "follow"
      fetch(`api/${apiURL}/${workout.creator.id}/${user.id}`, requestOptions)
      updateFollowingIds(workout.creator.id)
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
        {isFollowing ? "Unfollow " : "Follow"} {workout.creator.username}
      </Button>
    </VFlow>
  )
}
