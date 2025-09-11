
import { login } from "@/services/auth-service";
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useLogin() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['logins'] })
            router.push(routes.eCommerce.products)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}