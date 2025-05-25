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
import { useNavigate } from "react-router";
import FormTextField from "../components/FormTextField.tsx";
import { MultiSelectField } from "../components/MultiSelectField.tsx";
import { allergens, foodTypes } from "../constants/foodOptions.ts";
import {
  ErrorResponse,
  NGOFormData,
  NGOFormErrors,
} from "../interface/registerForm.ts";
import { useRegisterAsNGOMutation } from "../store/slices/authApi.ts";
import { textFields, validate } from "../utils/registerForm.ts";

export default function RegisterPageNGO() {
  const [formData, setFormData] = useState<NGOFormData>({
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
    idProof: null,
  });

  const [errors, setErrors] = useState<NGOFormErrors>({});
  const [registerAsNGO, { isLoading: isSubmitting }] =
    useRegisterAsNGOMutation();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<string | null>(null);

  const handleChange = (
    field: keyof NGOFormData,
    value: string | string[] | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Submitting NGO registration form", formData);
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSubmit.append("idProof", value);
      } else if (Array.isArray(value)) {
        formDataToSubmit.append(key, value.join(",")); // Join array values for submission
      } else {
        formDataToSubmit.append(key, value);
      }
    });
    console.log("Form data to submit:", formDataToSubmit);
    try {
      const result = await registerAsNGO(formDataToSubmit).unwrap();
      if (result.message === "NGO role added successfully") {
        navigate("/login?type=ngo&registered=true");
        return;
      }
    } catch (e) {
      console.log(e);
      setResponseError((e as ErrorResponse).data.error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      {responseError && (
        <Typography
          variant="body1"
          color="error"
          align="center"
          sx={{ marginTop: 2 }}
        >
          {responseError}
        </Typography>
      )}
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
            error={Boolean(errors.idProof)}
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
                    handleChange("idProof", e.target.files[0]);
                  }
                }}
              />
            </Button>
            {formData.idProof && (
              <Typography variant="body2">
                Selected file: {formData.idProof.name}
              </Typography>
            )}
            {errors.idProof && (
              <Typography color="error" variant="caption">
                {errors.idProof}
              </Typography>
            )}
          </FormControl>

          {/* MultiSelect Fields */}
          <MultiSelectField
            label="Preferred Food Type"
            value={formData.prefersFoodType}
            options={foodTypes}
            error={errors.prefersFoodType}
            getDisabled={(option) => formData.rejectsFoodType.includes(option)}
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
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
