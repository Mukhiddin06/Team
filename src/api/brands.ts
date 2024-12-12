import { useAxios } from "../hooks/useAxios";
import { ParamsType } from "../types";

export const getBrand = async (params?: ParamsType) => {
  const res = await useAxios().get("/brand/search", {
    params: params,
  });
  return res.data.data;
};
