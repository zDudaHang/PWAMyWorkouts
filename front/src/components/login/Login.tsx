import React, { useContext } from "react"
import { Button, Cell, Grid } from "bold-ui"
import { CreateUserResponseModel } from "../../../../model/model"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { Field, Form, FormRenderProps } from "react-final-form"
import { LoginFormModel } from "./model"
import { PasswordFieldAdapter, TextFieldAdapter } from "../adapters"
import { useNavigate } from "react-router-dom"
import { FEED_URL } from "../root/model"

export function Login() {
  const { setUser } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const handleSubmit = ({ username, password }: LoginFormModel) => {
    if (username && password) {
      console.log("HANDLE SUBMIT", username, password)
      const request1Options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
      fetch(`api/createUser/${username}/${password}`, request1Options).then(
        (response) => {
          response.json().then((response: CreateUserResponseModel) => {
            setUser({ id: response.id, username })
            navigate(FEED_URL)
          })
        }
      )
    }
  }

  const renderForm = ({ handleSubmit }: FormRenderProps<LoginFormModel>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Grid style={{ margin: "1rem" }} justifyContent="center">
          <Cell size={6}>
            <Field
              component={TextFieldAdapter}
              name="username"
              label="Username"
              required
              clearable={false}
            />
          </Cell>
          <Cell size={6}>
            <Field
              component={PasswordFieldAdapter}
              name="password"
              label="Password"
              required
              clearable={false}
            />
          </Cell>
          <Cell size={6}>
            <Button type="submit" kind="primary">
              Create user
            </Button>
          </Cell>
        </Grid>
      </form>
    )
  }

  return <Form<LoginFormModel> onSubmit={handleSubmit} render={renderForm} />
}
