import { TextField } from "@mui/material";
import { DonorFieldConfig, FieldConfig } from "../interface/registerForm";
export default function FormTextField({
  config,
  value,
  onChange,
  error,
  helperText,
}: {
  config: FieldConfig | DonorFieldConfig;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
}) {
  return (
    <TextField
      required
      fullWidth
      label={config.label}
      margin="normal"
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={helperText}
      type={config.type || "text"}
      multiline={config.multiline || false}
      rows={config.rows}
    />
  );
}
