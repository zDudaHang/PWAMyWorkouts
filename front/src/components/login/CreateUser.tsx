import React, { useContext } from "react"
import { Button, Cell, Grid, Heading, VFlow } from "bold-ui"
import {
  AuthenticationResponseModel,
  LoginRequestModel,
} from "../../../../model/model"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { Field, Form, FormRenderProps } from "react-final-form"
import { PasswordFieldAdapter, TextFieldAdapter } from "../Adapters"
import { useNavigate } from "react-router-dom"
import { FEED_URL } from "../root/model"
import { isEmpty } from "lodash"
import { StatusCodes } from "http-status-codes"
import { FormApi } from "final-form"

export function CreateUser() {
  const { setUser } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const handleSubmit = (
    values: LoginRequestModel,
    formApi: FormApi<LoginRequestModel>
  ) => {
    if (!isEmpty(values)) {
      const request1Options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
      fetch(
        `api/createUser/${values.username}/${values.password}`,
        request1Options
      ).then((response) => {
        if (response.status === StatusCodes.OK)
          response.json().then((response: AuthenticationResponseModel) => {
            setUser({ id: response.id, username: values.username })
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
              Create
            </Button>
          </Cell>
        </Grid>
      </form>
    )
  }

  return (
    <VFlow style={{ margin: "1rem" }}>
      <Heading level={1}>Creating a new user</Heading>
      <Form<LoginRequestModel> onSubmit={handleSubmit} render={renderForm} />
    </VFlow>
  )
}
