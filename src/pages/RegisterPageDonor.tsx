import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormTextField from "../components/FormTextField";
import { DonorFormData, DonorFormErrors, ErrorResponse } from "../interface/registerForm";
import { useRegisterAsDonorMutation } from "../store/slices/authApi";
import { donorTextFields, validateRegisterDonor } from "../utils/registerForm";

export default function RegisterPageDonor() {
  const [formData, setFormData] = useState<DonorFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<DonorFormErrors>({});
  const [responseError, setResponseError] = useState<string | null>(null);
  const [registerAsDonor, { isLoading: isSubmitting }] =
    useRegisterAsDonorMutation();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterDonor(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Submitting form", formData);
    try {
      const result = await registerAsDonor(formData).unwrap();
      console.log("Registration result:", result);
      if (result.message === "User registered successfully.") {
        navigate("/login?type=donor&registered=true");
        return;
      }
    } catch (e) {
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
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Donor Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {donorTextFields.map((field) => (
            <FormTextField
              key={field.name}
              config={field}
              value={formData[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={errors[field.name]}
              helperText={errors[field.name]}
            />
          ))}
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
