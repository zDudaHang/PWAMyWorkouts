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
import { CREATE_USER_URL, FEED_URL } from "../root/model"
import { isEmpty } from "lodash"
import { FormApi } from "final-form"
import { StatusCodes } from "http-status-codes"
import { LOCAL_STORAGE_LOGGED_USER, ServerStatusCode } from "../../constants"

interface UserFormProps {
  fetchUrl: string
  title: string
  isLogin?: boolean
}

export function UserForm(props: UserFormProps) {
  const { fetchUrl, title, isLogin = false } = props
  const { setUser } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const handleSubmit = (
    values: LoginRequestModel,
    formApi: FormApi<LoginRequestModel>
  ) => {
    if (!isEmpty(values)) {
      const { username } = values
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      }
      fetch(fetchUrl, requestOptions).then((response) => {
        if (response.status === StatusCodes.OK)
          response.json().then((response: AuthenticationResponseModel) => {
            setUser({ id: response.id, username })
            window.localStorage.setItem(
              LOCAL_STORAGE_LOGGED_USER,
              JSON.stringify({ id: response.id, username })
            )
            navigate(FEED_URL)
          })
        else if (response.status === ServerStatusCode.KEY_ALREADY_EXISTS) {
          alert(`Ops ! The username ${username} is already used`)
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
              {isLogin ? "Enter" : "Save"}
            </Button>
          </Cell>
        </Grid>
      </form>
    )
  }

  return (
    <VFlow style={{ margin: "1rem" }}>
      <Heading level={1}>{title}</Heading>
      {isLogin && <Link href={CREATE_USER_URL}>Create a new user</Link>}
      <Form<LoginRequestModel> onSubmit={handleSubmit} render={renderForm} />
    </VFlow>
  )
}
