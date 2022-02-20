import { Router } from "express"
import { CreatorModel } from "../../../model/model"
import { CREATORS, mocked_feed } from "../mock"

const user_router = Router()

const following: CreatorModel[] = []

user_router.get("/feed", (_, res) => {
  res.json(mocked_feed)
})

user_router.put("/follow/:creatorId", (req, res) => {
  const creatorId = Number(req.params.creatorId)
  if (creatorId && CREATORS.has(creatorId)) {
    const creator = CREATORS.get(creatorId)
    if (creator && !following.includes(creator)) {
      following.push(creator)
      console.log(
        `User is now following: `,
        following.map((creator) => creator.name)
      )
    }
  }
})

export default user_router
