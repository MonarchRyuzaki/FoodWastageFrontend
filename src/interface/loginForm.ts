export interface LoginData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export interface LoginConfig {
  name: keyof LoginData;
  label: string;
  type?: string;
}