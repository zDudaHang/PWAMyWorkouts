import { Router } from "express"
import { constants } from "http2"
import { DatabaseError } from "pg"
import { client } from "../.."
import { SubscriptionRequestModel } from "../../../model/model"
import { ServerStatusCode } from "../constants"
import { KEY_ALREADY_EXISTS } from "../database/model"

const push_router = Router()

push_router.post("/subscribe", (req, res) => {
  const subscriptionRequest: SubscriptionRequestModel = req.body

  const {
    userId,
    subscription: {
      endpoint,
      keys: { auth, p256dh },
    },
  } = subscriptionRequest

  console.log(subscriptionRequest)

  client
    .query(
      "INSERT INTO subscriptions (endpoint, sub_public_key, sub_private_key, sub_user_id) VALUES ($1, $2, $3, $4)",
      [endpoint, p256dh, auth, userId]
    )
    .then(() => res.sendStatus(constants.HTTP_STATUS_OK))
    .catch((reason: DatabaseError) => {
      if (reason.code === KEY_ALREADY_EXISTS) {
        console.log(
          `[server] The subscription of user #${userId} is already saved`
        )
        res.sendStatus(ServerStatusCode.KEY_ALREADY_EXISTS)
      }
    })
})

export default push_router
