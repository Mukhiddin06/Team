import { useQuery } from "@tanstack/react-query"
import { getBrand, getProducts } from "../api/dashboard"
import { ParamsType } from "../types"


export const useGetProductsQuery = (params?:ParamsType) => {
    return useQuery<ParamsType | Error>({
        queryKey: ['products'],
        queryFn: () =>  getProducts(params)
    })
}

export const useGetBrandsQuery = (params?:ParamsType) => {
    return useQuery({
        queryKey:['brands'],
        queryFn:() => getBrand(params)
    })
}