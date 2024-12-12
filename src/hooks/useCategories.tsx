import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "../types";
import { getCategories } from "../api/categories";

export const useGetCategoriesQuery = (params?: ParamsType) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(params),
  });
};
