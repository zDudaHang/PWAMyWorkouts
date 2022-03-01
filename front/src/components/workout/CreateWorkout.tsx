import { Button, Cell, Grid, Heading, VFlow } from "bold-ui"
import { FormApi } from "final-form"
import { Field, Form, FormRenderProps } from "react-final-form"
import { TextAreaAdapter, TextFieldAdapter } from "../Adapters"
import React, { useContext } from "react"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { isEmpty } from "lodash"
import { CreateWorkoutRequestModel } from "../../../../model/model"

interface WorkoutFormModel {
  title: string
  description: string
}

export function CreateWorkout() {
  const { user } = useContext(LoggedUserContext)

  const handleSubmit = (
    values: WorkoutFormModel,
    formApi: FormApi<WorkoutFormModel>
  ) => {
    if (!isEmpty(values)) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          ...values,
          creatorId: user?.id,
        } as CreateWorkoutRequestModel),
        headers: { "Content-Type": "application/json" },
      }
      fetch("api/createWorkout", requestOptions).then((response) => {
        console.log(response)
      })
    }
  }

  const renderForm = ({ handleSubmit }: FormRenderProps<WorkoutFormModel>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Cell size={6}>
            <Field
              component={TextFieldAdapter}
              name="title"
              label="Title"
              required
              clearable={false}
            />
          </Cell>
          <Cell size={6}>
            <Field
              component={TextAreaAdapter}
              name="description"
              label="Description"
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
      <Heading level={1}>Creating a workout</Heading>
      <Form<WorkoutFormModel> onSubmit={handleSubmit} render={renderForm} />
    </VFlow>
  )
}
