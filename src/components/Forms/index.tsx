import { Button, TextField, Select } from "@material-ui/core";
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
}

export const TextInput: React.FC<TextInputProps> = ({id, value, label, onChange, error, helperText, type, select, multiple, children}) => {
  return (<TextField
    required
    select={select || false}
    multiple={multiple || false}
    error={error}
    id={id}
    label={label}
    // defaultValue={name || ""}
    value={value}
    onChange={e => onChange(e.target.value)}
    helperText={error ? helperText || "Você precisa preencher esse valor." : ""}
    variant="filled"
    type={type || ""}
    style={{width: "500px"}}
  >
    {children}
  </TextField>)
}

export const TextSelect: React.FC<TextInputProps> = ({id, value, label, onChange, error, helperText, type, select, multiple, children}) => {
  return (<Select
    required
    select={select || false}
    multiple={multiple || false}
    error={error}
    id={id}
    label={label}
    // defaultValue={name || ""}
    value={value}
    onChange={e => onChange(e.target.value)}
    helperText={error ? helperText || "Você precisa preencher esse valor." : ""}
    variant="filled"
    type={type || ""}
    style={{width: "500px"}}
  >
    {children}
  </Select>)
}