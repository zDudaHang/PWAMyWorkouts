import React, { useContext } from "react"
import { Button, Cell, Grid, Heading, Link, VFlow } from "bold-ui"
import {
  AuthenticationResponseModel,
  LoginRequestModel,
} from "../../../../model/model"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { Field, Form, FormRenderProps } from "react-final-form"
import { PasswordFieldAdapter, TextFieldAdapter } from "../Adapters"
import { useNavigate } from "react-router-dom"
import {
  CREATE_USER_URL,
  FEED_URL,
  LOCAL_STORAGE_LOGGED_USER,
} from "../root/model"
import { isEmpty } from "lodash"
import { FormApi } from "final-form"
import { StatusCodes } from "http-status-codes"

export function Login() {
  const { setUser } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const handleSubmit = (
    values: LoginRequestModel,
    formApi: FormApi<LoginRequestModel>
  ) => {
    if (!isEmpty(values)) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      }
      fetch("api/login", requestOptions).then((response) => {
        if (response.status === StatusCodes.OK)
          response.json().then((response: AuthenticationResponseModel) => {
            setUser({ id: response.id, username: values.username })
            window.localStorage.setItem(
              LOCAL_STORAGE_LOGGED_USER,
              JSON.stringify({ id: response.id, username: values.username })
            )
            navigate(FEED_URL)
          })
        else if (response.status === StatusCodes.UNAUTHORIZED) {
          alert("Ops ! Something is wrong, try again !")
          setTimeout(formApi.restart)
        }
      })
    }
  }

  const renderForm = ({ handleSubmit }: FormRenderProps<LoginRequestModel>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
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
              Enter
            </Button>
          </Cell>
        </Grid>
      </form>
    )
  }

  return (
    <VFlow style={{ margin: "1rem" }}>
      <Heading level={1}>Login</Heading>
      <Link href={CREATE_USER_URL}>Create a new user</Link>
      <Form<LoginRequestModel> onSubmit={handleSubmit} render={renderForm} />
    </VFlow>
  )
}
