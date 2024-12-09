export interface LoginType {
  phone_number: string;
  password: string;
}

export interface SignupType extends LoginType {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserDataTypes {
  email?: string;
  first_name?: string;
  id?: number;
  last_name?: string;
  phone_number?: number;
}
