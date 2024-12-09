import axios from "axios";

export const useAxios = (withAuth = true) => {
  const accessToken = localStorage.getItem("access_token");
  const api = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API,
  });

  if (!!accessToken && withAuth) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return api;
};
