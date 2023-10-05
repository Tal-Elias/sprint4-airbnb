import { Dashboard } from './pages/Dashboard.jsx'
import { StayEdit } from './pages/StayEdit.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { UserOrders} from './pages/UserOrders.jsx'
import { UserWishList } from './pages/UserWishlist.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StayIndex />,
        label: '',
    },
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
    },
    {
        path: 'dashboard/stay/edit',
        component: <StayEdit />,
        label: 'edit'
    }
]

export default routes