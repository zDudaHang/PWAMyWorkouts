import express from "express"
import cors from "cors"
import user_router from "./src/routes/user-routes"
import webpush from "web-push"
import push_router from "./src/routes/push-routes"
import { config as configEnv } from "dotenv"
import { json } from "body-parser"

const app = express()
const PORT = 8000

configEnv()

app.use(json())

const ALLOWED_ORIGINS = ["http://localhost:3000"]

const options: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
}

console.log(process.env.REACT_APP_TESTE)

app.use(cors(options))

if (process.env.REACT_APP_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    `mailto:${process.env.PUSH_EMAIL}`,
    process.env.REACT_APP_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
  app.use("/push", push_router)
  console.log("[server]: The push route was successfully added")
}

app.use("/api", user_router)
console.log("[server]: The api routes were successfully added")

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`)
})