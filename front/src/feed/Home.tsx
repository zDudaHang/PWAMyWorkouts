import React, { useEffect, useState } from "react"
import { VFlow } from "bold-ui"
import { FeedModel } from "../model/model"
import { PublicationView } from "./PublicationView"

const FEED_API_URL = "/api/feed"

export function Home() {
  const [feed, setFeed] = useState<FeedModel>()

  useEffect(() => {
    fetch(FEED_API_URL).then((response) => {
      response.json().then((feed: FeedModel) => {
        setFeed(feed)
      })
    })
  }, [])

  return (
    <VFlow>
      {feed?.publications?.map((publication, index) => (
        <PublicationView key={index} publication={publication} />
      ))}
    </VFlow>
  )
}
