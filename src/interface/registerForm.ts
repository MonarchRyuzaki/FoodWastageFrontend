export interface FormErrors {
  registrationNumber?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  cause?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  city?: string;
  state?: string;
  prefersFoodType?: string;
  rejectsFoodType?: string;
  avoidsAllergen?: string;
  registrationProof?: string;
}

export interface FormData {
  registrationNumber: string;
  password: string;
  confirmPassword: string;
  name: string;
  cause: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  city: string;
  state: string;
  prefersFoodType: string[];
  rejectsFoodType: string[];
  avoidsAllergen: string[];
  registrationProof: File | null;
}

export interface FieldConfig {
  name: keyof Omit<
    FormData,
    | "prefersFoodType"
    | "rejectsFoodType"
    | "avoidsAllergen"
    | "registrationProof"
  >;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export interface DonorFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

export interface DonorFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

export interface DonorFieldConfig {
  name: keyof DonorFormData;
  label: string;
  type?: string;
  multiline?: boolean;  
  rows?: number;
}