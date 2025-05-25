import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import FormTextField from "../components/FormTextField.tsx";
import { MultiSelectField } from "../components/MultiSelectField.tsx";
import { allergens, foodTypes } from "../constants/foodOptions.ts";
import { FormData, FormErrors } from "../interface/registerForm.ts";
import { textFields, validate } from "../utils/registerForm.ts";

export default function RegisterPageNGO() {
  const [formData, setFormData] = useState<FormData>({
    registrationNumber: "",
    password: "",
    confirmPassword: "",
    name: "",
    cause: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    city: "",
    state: "",
    prefersFoodType: [],
    rejectsFoodType: [],
    avoidsAllergen: [],
    registrationProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    field: keyof FormData,
    value: string | string[] | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Submitting NGO registration form", formData);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, marginBottom: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          NGO Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {textFields.map((field) => (
            <FormTextField
              key={field.name}
              config={field}
              value={formData[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={errors[field.name]}
              helperText={errors[field.name]}
            />
          ))}

          {/* File Upload for Registration Proof */}
          <FormControl
            fullWidth
            required
            margin="normal"
            error={Boolean(errors.registrationProof)}
          >
            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: green[700] }}
            >
              Upload Registration Proof (JPEG only)
              <input
                type="file"
                accept="image/jpeg"
                hidden
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleChange("registrationProof", e.target.files[0]);
                  }
                }}
              />
            </Button>
            {formData.registrationProof && (
              <Typography variant="body2">
                Selected file: {formData.registrationProof.name}
              </Typography>
            )}
            {errors.registrationProof && (
              <Typography color="error" variant="caption">
                {errors.registrationProof}
              </Typography>
            )}
          </FormControl>

          {/* MultiSelect Fields */}
          <MultiSelectField
            label="Preferred Food Type"
            value={formData.prefersFoodType}
            options={foodTypes}
            error={errors.prefersFoodType}
            onChange={(e) =>
              handleChange("prefersFoodType", e.target.value as string[])
            }
          />

          <MultiSelectField
            label="Rejected Food Type"
            value={formData.rejectsFoodType}
            options={foodTypes}
            error={errors.rejectsFoodType}
            // Disable an option in Rejected if it's selected in Preferred.
            getDisabled={(option) => formData.prefersFoodType.includes(option)}
            onChange={(e) =>
              handleChange("rejectsFoodType", e.target.value as string[])
            }
          />

          <MultiSelectField
            label="Avoids Allergen"
            value={formData.avoidsAllergen}
            options={allergens}
            error={errors.avoidsAllergen}
            onChange={(e) =>
              handleChange("avoidsAllergen", e.target.value as string[])
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: green[700] }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
