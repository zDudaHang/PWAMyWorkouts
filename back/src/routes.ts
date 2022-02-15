import { Router } from "express"
import { CREATORS, mocked_feed } from "./mock"
import { CreatorModel } from "../../model/model"

const router = Router()

const following: CreatorModel[] = []

router.get("/feed", (_, res) => {
  res.json(mocked_feed)
})

router.put("/follow/:creatorId", (req, res) => {
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

export default router
