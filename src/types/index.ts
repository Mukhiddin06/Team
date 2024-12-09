export interface LoginType {
  phone_number: string;
  password: string;
}

export interface SignupType extends LoginType {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ParamsType {
  search: string;
  limit: number;
  page: number;
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

export interface ProductType {
  brand_id?: number;
  createdAt?: string;
  id: number;
  images?: string[];
  lastUpdatedAt?: string;
  name: string;
  price?: string;
  rate?: number | null;
=======
export interface CategoryTypes {
  id?: number;
  name?: string;
}
