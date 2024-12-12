import { useAxios } from "../hooks/useAxios";
import { ParamsType, AddCategoryType, UpdateCategoryType } from "../types";

export const getCategories = async (params?: ParamsType) => {
  const res = await useAxios().get("/category/search", {
    params: params,
  });
  return res.data;
};

export const addCategory = async (data?: AddCategoryType) => {
  const res = await useAxios().post("/category/create", data);
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await useAxios().delete(`/category/delete/${id}`);
  return res.data;
};

export const updateCategory = async (data?: UpdateCategoryType) => {
  const res = await useAxios().patch(
    `/category/update/${data?.id}`,
    data?.data
  );
  return res.data;
};
