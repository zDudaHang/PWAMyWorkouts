import { Client } from "pg"
import { readFileSync } from "fs"
import { DUPLICATED_TABLE_CODE_ERROR } from "./model"

export const configureDataBase = () => {
  console.log(console.log("[server] Configurating database..."))

  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_USER_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
  })

  client.connect().then(() => {
    console.log("[server] Database is online now! Creating tables...")
    client
      .query(readFileSync(`${__dirname}/data.sql`, "utf-8").toString())
      .catch((reason) => {
        if (reason.code && reason.code === DUPLICATED_TABLE_CODE_ERROR) {
          console.log("[server] The tables were already created")
        }
      })
    console.log("[server] Database was created successfully !")
  })

  return client
}
