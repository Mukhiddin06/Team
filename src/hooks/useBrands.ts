import { useQuery } from "@tanstack/react-query"
import { ParamsType } from "../types"
import { getBrand } from "../api/brands"

export const useGetBrandsQuery = (params?:ParamsType) => {
    return useQuery({
        queryKey:['brands', params],
        queryFn:() => getBrand(params)
    })
}