import { TextArea, TextField } from "bold-ui"
import React from "react"

export const TextFieldAdapter = ({ input, meta, ...rest }: any) => {
  return <TextField {...input} error={meta.error} {...rest} />
}

export const TextAreaAdapter = ({ input, meta, ...rest }: any) => {
  return <TextArea {...input} error={meta.error} {...rest} />
}

export const PasswordFieldAdapter = ({ input, meta, ...rest }: any) => {
  return <TextField type="password" {...input} error={meta.error} {...rest} />
}
