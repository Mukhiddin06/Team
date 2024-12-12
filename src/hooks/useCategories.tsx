import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddCategoryType, UpdateCategoryType } from "../types";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../api/categories";

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories({
        search: "",
        limit: 10,
        page: 1,
      }),
    enabled: true,
  });
};

export const useAddCategoriesQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (data: AddCategoryType) => addCategory(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export const useDeleteCategoryQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export const useUpdateCategoryQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (data?: UpdateCategoryType) => updateCategory(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
