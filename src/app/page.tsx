import Dashboard from '@/features/pages/dashboard'
import LayoutProvider from './ecommerce/layout'
export default async function Home() {
    return <div>
        <LayoutProvider>
            <Dashboard />
        </LayoutProvider>
    </div>
}