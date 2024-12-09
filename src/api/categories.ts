import { useAxios } from "../hooks/useAxios";
import { ParamsType } from "../types";

export const getCategories = async (params?: ParamsType) => {
  const res = await useAxios().get("/category/search", {
    params: params,
  });
  return res.data;
};
