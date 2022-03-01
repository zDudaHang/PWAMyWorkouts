import React, { useEffect, useState } from "react"
import { VFlow } from "bold-ui"
import { PublicationView } from "./PublicationView"
import { CreatorModel, WorkoutModel } from "../../../../model/model"

export function Feed() {
  const [feed, setFeed] = useState<WorkoutModel[]>()
  const [following, setFollowing] = useState<CreatorModel[]>([])

  const addNewFollowing = (creator: CreatorModel) => {
    if (!following.includes(creator)) {
      setFollowing([...following, creator])
    }
  }

  useEffect(() => {
    fetch("api/feed").then((response) => {
      response.json().then((feed: WorkoutModel[]) => {
        setFeed(feed)
      })
    })
  }, [])

  return (
    <VFlow>
      {feed?.map((workout, index) => (
        <PublicationView
          key={index}
          workout={workout}
          addNewFollowing={addNewFollowing}
          isFollowing={following.includes(workout.creator)}
        />
      ))}
    </VFlow>
  )
}
