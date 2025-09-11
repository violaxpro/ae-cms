'use client'

import { getServerSession } from 'next-auth/next';
import { ThemeProvider } from '@/context/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider'

const queryClient = new QueryClient()

export function Providers({ children, session }: { children: React.ReactNode, session: any }) {
    return (
        <AuthProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {/* kalau mau pakai next-auth */}
                    {children}
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AuthProvider>

    )
}
