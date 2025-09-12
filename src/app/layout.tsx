import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from './fonts';
import cn from '@/core/utils/class-names';
import { ThemeProvider } from '@/context/ThemeContext';
import { Providers } from './provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import NextProgress from '@/core/components/next-progress';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/global.css';

export const metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};

const queryClient = new QueryClient()

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    return (
        <html
            lang="en"
            dir="ltr"
            // required this one for next-themes, remove it if you are not using next-theme
            suppressHydrationWarning
        >
            <body
                // to prevent any warning that is caused by third party extensions like Grammarly
                suppressHydrationWarning
                className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
            >
                {/* <AuthProvider session={session}> */}
                {/* <ThemeProvider>
                    {children}
                </ThemeProvider> */}
                {/* </AuthProvider> */}
                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html >
    );
}
