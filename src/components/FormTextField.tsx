import { TextField } from "@mui/material";
import {
  DonorFormData,
  FieldConfig,
  NGOFormData,
} from "../interface/registerForm";
export default function FormTextField({
  config,
  value,
  onChange,
  error,
  helperText,
}: {
  config: FieldConfig<DonorFormData> | FieldConfig<NGOFormData>;
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
