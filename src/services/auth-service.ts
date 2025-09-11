import baseService from "./base-service";
import { LoginParam } from "@/plugins/types/auth-type";

const apiLogin = '/admin/auth/login'
export async function login(params: LoginParam) {
    const res = await baseService.post(apiLogin, params)
    return res.data
}
