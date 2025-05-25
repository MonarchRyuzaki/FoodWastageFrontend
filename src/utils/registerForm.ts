import { DonorFieldConfig, DonorFormData, FieldConfig, FormData, FormErrors } from "../interface/registerForm";

export const textFields: FieldConfig[] = [
    { name: "registrationNumber", label: "Registration Number" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
    { name: "name", label: "Name" },
    { name: "cause", label: "Cause" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone" },
    { name: "address", label: "Address" },
    { name: "description", label: "Description", multiline: true, rows: 3 },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
  ];
  
export function validate(formData: FormData): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.registrationNumber.trim())
        newErrors.registrationNumber = "Registration number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm Password is required.";
    else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.cause.trim()) newErrors.cause = "Cause is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.description.trim())
        newErrors.description = "Description is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (formData.prefersFoodType.length === 0)
        newErrors.prefersFoodType = "At least one preferred food type is required.";
    if (formData.rejectsFoodType.length === 0)
        newErrors.rejectsFoodType = "At least one rejected food type is required.";
    if (formData.avoidsAllergen.length === 0)
        newErrors.avoidsAllergen = "At least one allergen avoidance is required.";
    if (!formData.registrationProof)
        newErrors.registrationProof = "Registration proof (JPEG) is required.";

    return newErrors;
}

export function validateRegisterDonor(formData: DonorFormData): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm Password is required.";
    else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";

    return newErrors;
}

export const donorTextFields: DonorFieldConfig[] = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
    { name: "phone", label: "Phone" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
  ];