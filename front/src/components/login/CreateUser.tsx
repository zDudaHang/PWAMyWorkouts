import React from "react"

import { UserForm } from "./UserForm"

export function CreateUser() {
  return <UserForm fetchUrl="api/createUser" title="Creating a new user" />
}
