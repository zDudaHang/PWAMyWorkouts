import { Router } from "express"
import webpush from "web-push"

const push_router = Router()

//subscribe route
push_router.post("/subscribe", (req, res) => {
  //get push subscription object from the request
  const subscription = req.body

  //send status 201 for the request
  res.status(201).json({})

  //create paylod: specified the detals of the push notification
  const payload = JSON.stringify({ title: "Section.io Push Notification" })

  //pass the object into sendNotification fucntion and catch any error
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err))
})

export default push_router
