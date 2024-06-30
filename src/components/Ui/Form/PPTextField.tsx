import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// text field props
interface ITextFieldProps {
  name: string;
  type?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  multiline?: boolean;
  // val?: string | undefined;
}
const PPTextField = ({
  name,
  type = "text",
  fullWidth,
  size = "small",
  placeholder,
  label,
  disabled = false,
  multiline = false,
}: // val,
ITextFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            id={name}
            key={name}
            {...field}
            label={label}
            placeholder={placeholder}
            type={type}
            fullWidth={fullWidth}
            size={size}
            multiline={multiline}
            error={!!error?.message}
            disabled={disabled}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};

export default PPTextField;
