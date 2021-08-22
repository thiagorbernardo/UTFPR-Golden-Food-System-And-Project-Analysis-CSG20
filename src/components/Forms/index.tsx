import { Button, TextField } from "@material-ui/core";
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
}

export const TextInput: React.FC<TextInputProps> = ({id, value, label, onChange, error, helperText, type}) => {
  return (<TextField
    required
    error={error}
    id={id}
    label={label}
    // defaultValue={name || ""}
    value={value}
    onChange={e => onChange(e.target.value)}
    helperText={error ? helperText || "Você precisa preencher esse valor.": ""}
    variant="filled"
    type={type || ""}
  />)
}
