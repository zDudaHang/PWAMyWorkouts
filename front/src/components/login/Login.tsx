import React from "react"
import { UserForm } from "./UserForm"

export function Login() {
  return <UserForm isLogin fetchUrl="api/login" title="Login" />
}
