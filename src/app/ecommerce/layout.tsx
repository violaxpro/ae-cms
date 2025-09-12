'use client';
import { useEffect } from "react";
import { LayoutProps } from "@/plugins/interfaces";
import MainLayout from "@/components/layout"
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { routes } from "@/config/routes";

const publicRoutes = [routes.signIn];
export default function LayoutProvider({ children }: LayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isPublicRoute = publicRoutes.some((path: any) => pathname.startsWith(path));
    useEffect(() => {
        if (status === 'unauthenticated' && !isPublicRoute) {
            router.push(routes.signIn);
        }

    }, [status, isPublicRoute, router]);
    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>

        );
    }
    if (isPublicRoute) {
        return <>{children}</>;
    }
    if (status === 'authenticated' && !isPublicRoute) {
        return <MainLayout>{children}</MainLayout>;

    }
    return null;
}
