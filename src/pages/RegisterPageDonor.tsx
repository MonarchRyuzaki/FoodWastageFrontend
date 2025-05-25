import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

export default function RegisterPageDonor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    // Add further email regex check if needed
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
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
          <TextField
            required
            fullWidth
            label="Name"
            margin="normal"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          <TextField
            required
            fullWidth
            label="Phone"
            margin="normal"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            required
            fullWidth
            label="Address"
            margin="normal"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            error={Boolean(errors.address)}
            helperText={errors.address}
          />
          <TextField
            required
            fullWidth
            label="City"
            margin="normal"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={Boolean(errors.city)}
            helperText={errors.city}
          />
          <TextField
            required
            fullWidth
            label="State"
            margin="normal"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            error={Boolean(errors.state)}
            helperText={errors.state}
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
