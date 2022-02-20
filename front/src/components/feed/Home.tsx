import React, { useEffect, useState } from "react"
import { VFlow } from "bold-ui"
import { PublicationView } from "./PublicationView"
import { CreatorModel, FeedModel } from "../../../../model/model"

export function Home() {
  const [feed, setFeed] = useState<FeedModel>()
  const [following, setFollowing] = useState<CreatorModel[]>([])

  const addNewFollowing = (creator: CreatorModel) => {
    if (!following.includes(creator)) {
      setFollowing([...following, creator])
    }
  }

  useEffect(() => {
    fetch("api/feed").then((response) => {
      response.json().then((feed: FeedModel) => {
        setFeed(feed)
      })
    })
  }, [])

  return (
    <VFlow>
      {process.env.REACT_APP_TESTE}
      {feed?.publications?.map((publication, index) => (
        <PublicationView
          key={index}
          publication={publication}
          addNewFollowing={addNewFollowing}
          isFollowing={following.includes(publication.workout.creator)}
        />
      ))}
    </VFlow>
  )
}
