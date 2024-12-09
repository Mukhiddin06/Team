export interface LoginType {
    phone_number: string;
    password: string;
}

export interface SignupType extends LoginType  {
    first_name: string;
    last_name: string;
    email: string;
}

export interface ParamsType {
    search: string;
    limit: number;
    page: number;
}