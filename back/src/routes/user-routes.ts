import { assert } from "console"
import { Router } from "express"
import { client } from "../.."
import { mocked_feed } from "../mock"
import { isEmpty, isEqual } from "lodash"
import {
  AuthenticationResponseModel,
  LoginRequestModel,
} from "../../../model/model"
import { QueryResult, DatabaseError } from "pg"
import { CreateUserQueryResult, LoginQueryResultModel } from "./model"
import { constants } from "http2"
import { KEY_ALREADY_EXISTS } from "../database/model"

const user_router = Router()

user_router.post("/login", async (req, res) => {
  const credentials: LoginRequestModel = req.body
  if (!isEmpty(credentials)) {
    const { username, password } = credentials
    const queryResult: QueryResult<LoginQueryResultModel> = await client.query(
      "SELECT id, password FROM users WHERE username=$1",
      [username]
    )
    if (
      queryResult.rowCount === 1 &&
      isEqual(queryResult.rows[0].password, password)
    ) {
      res.statusCode = constants.HTTP_STATUS_OK
      const user: AuthenticationResponseModel = { id: queryResult.rows[0].id }
      res.json(user)
    } else {
      res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
    }
  }
})

user_router.put("/createUser/:username/:password", (req, res) => {
  const username = req.params.username
  const password = req.params.password
  if (username && password) {
    client
      .query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [username, password]
      )
      .then((value: QueryResult<CreateUserQueryResult>) => {
        assert(value.rowCount === 1)
        const userResponse: AuthenticationResponseModel = {
          id: value.rows[0].id,
        }
        res.json(userResponse)
      })
      .catch((reason: DatabaseError) => {
        if (reason.code === KEY_ALREADY_EXISTS) {
          console.log(`[server] The username ${username} already exists`)
          res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
        }
      })
  }
})

user_router.get("/feed", (_, res) => {
  res.json(mocked_feed)
})

user_router.put("/follow/:followed_user_id/:follower_user_id", (req, res) => {
  const followed_user_id = Number(req.params.followed_user_id)
  const follower_user_id = Number(req.params.follower_user_id)
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
