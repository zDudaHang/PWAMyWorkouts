import { assert } from "console"
import { Router } from "express"
import { client } from "../.."
import { mocked_feed } from "../mock"
import { CreateUserResponseModel } from "../../../model/model"

const user_router = Router()

user_router.put("/createUser/:username/:password", (req, res) => {
  const username = req.params.username
  const password = req.params.password
  if (username && password) {
    console.log(username, password)
    client
      .query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [username, password]
      )
      .then((value) => {
        assert(value.rowCount === 1)
        const userResponse: CreateUserResponseModel = { id: value.rows[0].id }
        res.json(userResponse)
      })
  }
})

user_router.get("/feed", (_, res) => {
  res.json(mocked_feed)
})

user_router.put("/follow/:followed_user_id/:follower_user_id", (req, res) => {
  const followed_user_id = Number(req.params.followed_user_id)
  const follower_user_id = Number(req.params.follower_user_id)
  console.log(
    `user #${follower_user_id} starting to follow user #${followed_user_id}`
  )
  if (followed_user_id && follower_user_id) {
    client
      .query(
        "INSERT INTO followers (followed_user_id, follower_user_id) VALUES ($1, $2)",
        [followed_user_id, follower_user_id]
      )
      .then((value) => console.log("Sucesso!", value))
  }
})

export default user_router
