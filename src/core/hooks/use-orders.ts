import {
    getOrder,
    addOrder,
    deleteOrder,
    updateOrder
} from "@/services/order-service";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotificationAntd } from "@/components/toast";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { OrderType } from "@/plugins/types/sales-type";
import { useMutationBase } from "./mutation-base";

export function useGetOrder(page: number, perPage: number) {
    return useQuery({
        queryKey: ['orders', page, perPage],
        queryFn: async () => getOrder({ page, perPage }),
    });
}

export function useCreateOrder() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addOrder,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            router.push(routes.eCommerce.order)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateOrder(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: OrderType) => updateOrder(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            router.push(routes.eCommerce.order)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteOrder() {
    const { queryClient, setNotification } = useMutationBase();

    return useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: (error: any) => {
            console.error('masuk erorr', error)
            setNotification(error?.response?.data?.message)
        }
    })
}
