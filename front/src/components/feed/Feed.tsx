import React, { useContext, useEffect, useState } from "react"
import { VFlow, Text, Heading } from "bold-ui"
import { PublicationView } from "./PublicationView"
import { WorkoutModel } from "../../../../model/model"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { db } from "../../db"

export function Feed() {
  const [feed, setFeed] = useState<WorkoutModel[]>()
  const [followingUserIds, setFollowingUserIds] = useState<number[]>([])
  const { user } = useContext(LoggedUserContext)

  useEffect(() => {
    if (user) {
      fetch(`api/feed/${user?.id}`)
        .then((response) => {
          response.json().then((feed: WorkoutModel[]) => {
            setFeed(feed)
            feed.forEach((workout) =>
              db.feed.add({
                ...workout,
              })
            )
          })
        })
        .catch(async () => {
          const feed = await db.feed.toArray()
          setFeed(feed)
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

  const hasFeed = feed && feed.length > 0

  return (
    <VFlow vSpacing={0.5} style={{ marginLeft: "1rem" }}>
      <Heading level={2}>Feed</Heading>
      {hasFeed ? (
        feed?.map((workout, index) => (
          <PublicationView
            key={index}
            workout={workout}
            updateFollowingIds={updateFollowingIds}
            isFollowing={followingUserIds.includes(workout.creator.id)}
          />
        ))
      ) : (
        <Text>There are no workouts to see</Text>
      )}
    </VFlow>
  )
}
