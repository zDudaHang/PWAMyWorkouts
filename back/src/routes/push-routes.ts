import { Router } from "express"
import { constants } from "http2"
import webpush from "web-push"
import { client } from "../.."
import { SubscriptionRequestModel } from "../../../model/model"

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

  client
    .query(
      "INSERT INTO subscriptions (endpoint, sub_public_key, sub_private_key, sub_user_id) VALUES ($1, $2, $3, $4)",
      [endpoint, p256dh, auth, userId]
    )
    .then(() => res.sendStatus(constants.HTTP_STATUS_OK))
})

export default push_router
