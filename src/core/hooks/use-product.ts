

import { getProduct, getProductById, addProduct, updateProduct, deleteProduct } from '@/services/products-service';
import { ProductDataType } from '@/data/products-data';
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetProduct(page?: number, perPage?: number) {
    return useQuery({
        queryKey: ['products', page, perPage],
        queryFn: async () => getProduct({ page, perPage }),
    });
}

export function useGetProductById(slug: string) {
    return useQuery({
        queryKey: ['products', slug],
        queryFn: async () => getProductById(slug),
        enabled: !!slug,
    });
}

export function useCreateProduct() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addProduct,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['products'] })
            router.push(routes.eCommerce.products)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateProduct(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: ProductDataType) => updateProduct(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['products'] })
            router.push(routes.eCommerce.products)

        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteProduct() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}
