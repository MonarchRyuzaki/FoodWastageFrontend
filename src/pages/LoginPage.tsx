import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import FormTextField from "../components/FormTextField";
import { LoginData, LoginErrors } from "../interface/loginForm";
import { loginFields, validate } from "../utils/loginForm";

export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (field: keyof LoginData, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(loginData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Logging in with", loginData);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "80vh" }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {loginFields.map((field) => (
            <FormTextField
              key={field.name}
              config={field}
              value={loginData[field.name] as string}
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
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
