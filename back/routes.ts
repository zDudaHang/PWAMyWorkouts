import { Router } from "express"
import { mocked_feed } from "./mock"
const router = Router()

router.get("/feed", (_, res) => {
  res.json(mocked_feed)
})

export default router
