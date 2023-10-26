import { Dashboard } from './pages/Dashboard.jsx'
import { UserOrders } from './pages/UserOrders.jsx'
import { UserWishList } from './pages/UserWishlist.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: 'trip',
        component: <UserOrders />,
        label: 'Trips'
    },
    {
        path: 'wishlist',
        component: <UserWishList />,
        label: 'Wishlist'
    },
    {
        path: 'dashboard',
        component: <Dashboard />,
        label: 'Dashboard'
    }
]

export default routes