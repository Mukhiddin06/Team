import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/dashboard"
import { ParamsType } from "../types"


export const useGetProductsQuery = (params?:ParamsType) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () =>  getProducts(params)
    })
}