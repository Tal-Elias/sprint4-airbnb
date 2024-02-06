import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayOrder } from './pages/StayOrder.jsx'
import { Toaster } from 'react-hot-toast'
import { StayIndex } from './pages/StayIndex'
import { StayEdit } from './pages/StayEdit'
import { MobileHeader } from './cmps/MobileHeader.jsx'
import { MobileFooter } from './cmps/MobileFooter.jsx'
import routes from './routes'

export function RootCmp() {
    let routeLocation = useLocation()

    const [isSecondaryLayout, setIsSecondaryLayout] = useState(false)
    const [isDetailsPage, setIsDetailsPage] = useState(false)

    useEffect(() => {
        if (routeLocation.pathname.startsWith('/stay/') ||
            routeLocation.pathname.startsWith('/trip') ||
            routeLocation.pathname.startsWith('/wishlist') ||
            routeLocation.pathname.startsWith('/dashboard')) setIsSecondaryLayout(true)
        else setIsSecondaryLayout(false)
        if ((routeLocation.pathname.startsWith('/stay/')) &&
            (!routeLocation.pathname.startsWith('/stay/order'))) {
            setIsDetailsPage(true)
        } else {
            setIsDetailsPage(false)
        }
    }, [routeLocation])

    return (
        <div className={`${isSecondaryLayout ? 'secondary-layout' : 'main-layout'}`}>
            <AppHeader isSecondaryLayout={isSecondaryLayout} routeLocation={routeLocation} isDetailsPage={isDetailsPage}/>
            <main style={{ paddingBottom: '80px' }}>
                <Toaster position='absolute' containerStyle={{ bottom: 60, left: 30, }} />
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="stay/order" element={<StayOrder />} />
                    <Route path="dashboard/stay/edit" element={<StayEdit />} />
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
            </main>
            <MobileFooter />
            <AppFooter isSecondaryLayout={isSecondaryLayout} routeLocation={routeLocation} />
        </div>
    )
}


