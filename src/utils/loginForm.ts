import { LoginConfig, LoginData, LoginErrors } from "../interface/loginForm";

export const loginFields: LoginConfig[] = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];

export const validate = (loginData: LoginData) => {
  const newErrors: LoginErrors = {};
  if (!loginData.email.trim()) newErrors.email = "Email is required.";
  if (!loginData.password) newErrors.password = "Password is required.";
  return newErrors;
};