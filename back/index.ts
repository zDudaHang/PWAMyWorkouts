import express from "express"
import cors from "cors"
import router from "./src/routes"

const app = express()
const PORT = 8000

const ALLOWED_ORIGINS = ["http://localhost:3000"]

const options: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
}

app.use(cors(options))

app.use("/api", router)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
