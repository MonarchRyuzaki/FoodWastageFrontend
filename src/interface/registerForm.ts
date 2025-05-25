// Base interfaces for common fields
export interface BaseFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

export interface BaseFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

// NGO-specific interfaces extend the common base.
export interface NGOFormData extends BaseFormData {
  registrationNumber: string;
  cause: string;
  description: string;
  prefersFoodType: string[];
  rejectsFoodType: string[];
  avoidsAllergen: string[];
  registrationProof: File | null;
}

export interface NGOFormErrors extends BaseFormErrors {
  registrationNumber?: string;
  cause?: string;
  description?: string;
  prefersFoodType?: string;
  rejectsFoodType?: string;
  avoidsAllergen?: string;
  registrationProof?: string;
}

// Donor-specific interfaces reuse the base fields.
export interface DonorFormData extends BaseFormData {}

export interface DonorFormErrors extends BaseFormErrors {}

// A generic FieldConfig to configure form fields.
export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}