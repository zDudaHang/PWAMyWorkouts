import express from "express"
import cors from "cors"
import user_router from "./src/routes/user-routes"
import webpush from "web-push"
import push_router from "./src/routes/push-routes"
import { config as configEnv } from "dotenv"
import { json } from "body-parser"
import { configureDataBase } from "./src/database/config"

const app = express()
const PORT = process.env.PORT || 8000

configEnv()

export const client = configureDataBase()

app.use(json())

const ALLOWED_ORIGINS = ["http://localhost:3000"]

const options: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
}

app.use(cors(options))

app.use(express.static("../front/public"))

if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    `mailto:${process.env.PUSH_EMAIL}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
  app.use("/push", push_router)
  console.log("[server]: The push route was successfully added")
}

app.use("/api", user_router)
console.log("[server]: The api routes were successfully added")

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PORT}`)
})
