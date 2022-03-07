import React, { useContext, useEffect, useState } from "react"
import { VFlow } from "bold-ui"
import { PublicationView } from "./PublicationView"
import { WorkoutModel } from "../../../../model/model"
import { LoggedUserContext } from "../context/LoggedUserContext"

export function Feed() {
  const [feed, setFeed] = useState<WorkoutModel[]>()
  const [followingUserIds, setFollowingUserIds] = useState<number[]>([])
  const { user } = useContext(LoggedUserContext)

  useEffect(() => {
    if (user) {
      fetch(`api/feed/${user?.id}`).then((response) => {
        response.json().then((feed: WorkoutModel[]) => {
          setFeed(feed)
        })
      })
      fetch(`api/following/${user?.id}`).then((response) => {
        response.json().then((following: number[]) => {
          setFollowingUserIds([...following])
        })
      })
    }
  }, [user])

  const updateFollowingIds = (id: number) => {
    if (followingUserIds.includes(id)) {
      setFollowingUserIds([
        ...followingUserIds.filter((userId) => userId !== id),
      ])
    } else {
      setFollowingUserIds([...followingUserIds, id])
    }
  }

  return (
    <VFlow>
      {feed?.map((workout, index) => (
        <PublicationView
          key={index}
          workout={workout}
          updateFollowingIds={updateFollowingIds}
          isFollowing={followingUserIds.includes(workout.creator.id)}
        />
      ))}
    </VFlow>
  )
}
