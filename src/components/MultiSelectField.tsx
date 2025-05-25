import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";

interface MultiSelectFieldProps {
  label: string;
  value: string[];
  options: string[];
  error?: string;
  // Optional function to disable option, for example in rejected field when option exists in preferred values.
  getDisabled?: (option: string) => boolean;
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

export function MultiSelectField({
  label,
  value,
  options,
  error,
  getDisabled,
  onChange,
}: MultiSelectFieldProps) {
  return (
    <FormControl fullWidth required margin="normal" error={Boolean(error)}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (selected as string[]).join(", ")}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            disabled={getDisabled ? getDisabled(option) : false}
          >
            <Checkbox checked={value.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </FormControl>
  );
}
