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