import { Button, Cell, Grid, Heading, VFlow } from "bold-ui"
import { Field, Form, FormRenderProps } from "react-final-form"
import { TextAreaAdapter, TextFieldAdapter } from "../Adapters"
import React, { useContext } from "react"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { isEmpty } from "lodash"
import { CreateWorkoutRequestModel } from "../../../../model/model"
import { useNavigate } from "react-router-dom"
import { FEED_URL } from "../root/model"

interface WorkoutFormModel {
  title: string
  description: string
}

export function CreateWorkout() {
  const { user } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const handleSubmit = (values: WorkoutFormModel) => {
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
        alert("Workout created successfully")
        navigate(FEED_URL)
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
