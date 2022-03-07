import { assert } from "console"
import { Router } from "express"
import { client } from "../.."
import { isEmpty, isEqual } from "lodash"
import {
  AuthenticationResponseModel,
  CreateWorkoutRequestModel,
  FeedRequestModel,
  LoginRequestModel,
  WorkoutModel,
} from "../../../model/model"
import { QueryResult, DatabaseError } from "pg"
import {
  CreateUserQueryResult,
  FeedQueryResult,
  FollowersQueryResult,
  FollowingQueryResult,
  LoginQueryResultModel,
} from "./model"
import { constants } from "http2"
import { KEY_ALREADY_EXISTS } from "../database/model"
import webpush from "web-push"
import { ServerStatusCode } from "../constants"

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
          res.sendStatus(ServerStatusCode.KEY_ALREADY_EXISTS)
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
      .then(async (value: QueryResult) => {
        if (value.rowCount === 1) {
          const followersSubscriptions: QueryResult<FollowersQueryResult> =
            await client.query(
              "SELECT s2.endpoint, s2.sub_public_key, s2.sub_private_key, u2.username" +
                " FROM subscriptions s2 INNER JOIN followers f2 ON s2.sub_user_id = f2.follower_user_id" +
                " INNER JOIN users u2 ON u2.id = f2.follower_user_id " +
                " WHERE f2.followed_user_id = $1",
              [creatorId]
            )
          followersSubscriptions.rows.forEach(
            ({ endpoint, sub_private_key, sub_public_key, username }) => {
              webpush.sendNotification(
                {
                  endpoint,
                  keys: { auth: sub_private_key, p256dh: sub_public_key },
                },
                JSON.stringify({ title, description, username })
              )
            }
          )
          res.sendStatus(constants.HTTP_STATUS_OK)
        }
      })
  }
})

user_router.get("/feed/:userId", (req, res) => {
  const userId = req.params.userId
  if (userId) {
    client
      .query(
        "SELECT w.*, u.username FROM workouts w INNER JOIN users u ON w.creator_id = u.id WHERE w.creator_id <> $1 LIMIT 10",
        [userId]
      )
      .then((value: QueryResult<FeedQueryResult>) => {
        const feed: WorkoutModel[] = value.rows.map((workout) => ({
          id: workout.id,
          title: workout.title,
          description: workout.description,
          creator: { id: workout.creator_id, username: workout.username },
        }))
        res.json(feed)
      })
  }
})

user_router.get("/following/:userId", (req, res) => {
  const userId = req.params.userId
  if (userId) {
    client
      .query(
        "SELECT u.id from followers f " +
          "inner join users u on u.id = f.followed_user_id " +
          "where f.follower_user_id  = $1",
        [userId]
      )
      .then((value: QueryResult<FollowingQueryResult>) => {
        const followingIds: number[] = value.rows.map(
          (followingQueryResult) => followingQueryResult.id
        )
        res.json(followingIds)
      })
  }
})

user_router.post(
  "/follow/:user_id_will_be_followed/:follower_user_id",
  (req, res) => {
    const user_id_will_be_followed = Number(req.params.user_id_will_be_followed)
    const follower_user_id = Number(req.params.follower_user_id)
    if (user_id_will_be_followed && follower_user_id) {
      client
        .query(
          "INSERT INTO followers (followed_user_id, follower_user_id) VALUES ($1, $2)",
          [user_id_will_be_followed, follower_user_id]
        )
        .then(() => res.sendStatus(constants.HTTP_STATUS_OK))
        .catch((reason: DatabaseError) => {
          if (reason.code === KEY_ALREADY_EXISTS) {
            console.log(
              `[server] The user #${follower_user_id} is already following user #${user_id_will_be_followed}`
            )
            res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED)
          }
        })
    }
  }
)

user_router.post(
  "/unfollow/:user_id_will_be_unfollowed/:follower_user_id",
  (req, res) => {
    const user_id_will_be_unfollowed = Number(
      req.params.user_id_will_be_unfollowed
    )
    const follower_user_id = Number(req.params.follower_user_id)
    if (user_id_will_be_unfollowed && follower_user_id) {
      client
        .query(
          "DELETE FROM followers f WHERE f.followed_user_id = $1 AND f.follower_user_id = $2",
          [user_id_will_be_unfollowed, follower_user_id]
        )
        .then(() => res.sendStatus(constants.HTTP_STATUS_OK))
        .catch((reason: DatabaseError) => {
          console.log(reason)
        })
    }
  }
)

export default user_router
