import { useAxios } from "../hooks/useAxios";
import { LoginType, SignupType } from "../types";

export const login =  async (data:LoginType) => {
    const res = await useAxios(false).post('auth/sign-in', data);
    return res.data;
};

export const signup =  async (data: SignupType) => {
    const res = await useAxios(false).post('auth/admin/sign-up', data);
    return res.data;
};