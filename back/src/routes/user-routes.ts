import { assert } from "console"
import { Router } from "express"
import { client } from "../.."
import { isEmpty, isEqual } from "lodash"
import {
  AuthenticationResponseModel,
  CreateWorkoutRequestModel,
  LoginRequestModel,
  WorkoutModel,
} from "../../../model/model"
import { QueryResult, DatabaseError } from "pg"
import {
  CreateUserQueryResult,
  FeedQueryResult,
  LoginQueryResultModel,
} from "./model"
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

user_router.post("/createUser", (req, res) => {
  const credentials: LoginRequestModel = req.body
  if (!isEmpty(credentials)) {
    const { username, password } = credentials
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

user_router.post("/createWorkout", (req, res) => {
  const newWorkout: CreateWorkoutRequestModel = req.body
  if (!isEmpty(newWorkout)) {
    const { title, description, creatorId } = newWorkout
    client
      .query(
        "INSERT INTO workouts (creator_id, title, description) VALUES ($1, $2, $3)",
        [creatorId, title, description]
      )
      .then((value: QueryResult<CreateUserQueryResult>) => {
        if (value.rowCount === 1) res.sendStatus(constants.HTTP_STATUS_OK)
      })
  }
})

user_router.get("/feed", (_, res) => {
  client
    .query(
      "SELECT w.*, u.username FROM workouts w INNER JOIN users u ON w.creator_id = u.id LIMIT 10"
    )
    .then((value: QueryResult<FeedQueryResult>) => {
      const feed: WorkoutModel[] = value.rows.map((workout) => ({
        id: workout.id,
        title: workout.title,
        description: workout.description,
        creator: { id: workout.creatorId, username: workout.username },
      }))
      res.json(feed)
    })
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
