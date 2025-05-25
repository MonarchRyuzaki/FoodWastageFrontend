import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import FormTextField from "../components/FormTextField";
import { LoginData, LoginErrors } from "../interface/loginForm";
import { login } from "../store/slices/auth";
import {
  useLoginAsDonorMutation,
  useLoginAsNGOMutation,
} from "../store/slices/authApi";
import { loginFields, validate } from "../utils/loginForm";
import { ErrorResponse } from "../interface/registerForm";

export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [searchParams] = useSearchParams();
  const [loginAsDonor, { isLoading: isSubmitting }] = useLoginAsDonorMutation();
  const [loginAsNGO, { isLoading: isSubmittingNGO }] = useLoginAsNGOMutation(); // Assuming you have a similar mutation for NGO login
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [responseError, setResponseError] = useState<string | null>(null);

  const handleChange = (field: keyof LoginData, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(loginData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Logging in with", loginData);
    let result;
    try {
      if (searchParams.get("type") === "donor") {
        result = await loginAsDonor(loginData).unwrap();
      } else {
        result = await loginAsNGO(loginData).unwrap();
        console.log("Login as NGO result:", result);
      }
      if (result.message === "Login successful") {
        dispatch(
          login({
            user: result.user,
            token: result.token,
          })
        );
        navigate("/donations");
        return;
      }
    } catch (e) {
      console.error("Login error:", e);
      setResponseError((e as ErrorResponse).data.error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "80vh" }}>
      {!responseError && searchParams.get("registered") && (
        <Typography
          variant="body1"
          color="success.main"
          align="center"
          sx={{ marginTop: 4 }}
        >
          Registration successful! You can now log in.
        </Typography>
      )}
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
            disabled={
              searchParams.get("type") === "donor"
                ? isSubmitting
                : isSubmittingNGO
            }
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
