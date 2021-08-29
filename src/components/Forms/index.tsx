import { Button, TextField, Select, FormHelperText, InputLabel } from "@material-ui/core";
import React from "react";

import FormsStyle from '../../styles/Forms.module.css'

type TextInputProps = {
  id: string,
  value: any,
  label: string,
  onChange: Function
  error: boolean
  type?: string
  helperText?: string
  select?: boolean,
  multiple?: boolean
  disabled?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({ id, value, label, onChange, error, helperText, type, select, multiple, children, disabled }) => {
  return (<TextField
    required
    select={select || false}
    error={error}
    id={id}
    label={label}
    // defaultValue={name || ""}
    value={value}
    onChange={e => onChange(e.target.value)}
    helperText={error ? helperText || "Você precisa preencher esse valor." : ""}
    variant="filled"
    type={type || ""}
    style={{ width: "500px" }}
    disabled={disabled || false}
  >
    {children}
  </TextField>)
}

export const TextSelect: React.FC<TextInputProps> = ({ id, value, label, onChange, error, type, helperText, multiple, children }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        required
        multiple
        error={error}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        variant="filled"
        type={type || ""}
        style={{ width: "500px" }}
      >
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </>
  )
}
