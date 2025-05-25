import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import FormTextField from "../components/FormTextField";
import { BaseFormErrors, DonorFormData } from "../interface/registerForm";
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

  const [errors, setErrors] = useState<BaseFormErrors>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterDonor(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Proceed with API call and further processing
    console.log("Submitting form", formData);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
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
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
