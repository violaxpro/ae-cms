import axios from 'axios'
import { env } from '@/env.mjs'
import { getSession } from 'next-auth/react'

const baseService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
})
// const bearerToken = process.env.NEXT_PUBLIC_AUTHORIZATION

// baseService.interceptors.request.use(
//     (config) => {
//         config.headers.Authorization = `Bearer ${bearerToken}`
//         config.headers.accept = 'application/json'
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

baseService.interceptors.request.use(
    async (config) => {
        const session: any = await getSession(); // <-- ambil session dari NextAuth client
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        config.headers.accept = "application/json";
        return config;
    },
    (error) => Promise.reject(error)
);

export default baseService
