import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayOrder } from './pages/StayOrder.jsx'
import { Toaster } from 'react-hot-toast'
import { StayIndex } from './pages/StayIndex'
import { StayEdit } from './pages/StayEdit'

export function RootCmp() {
    let location = useLocation()

    const [isSecondaryLayout, setIsSecondaryLayout] = useState(false)

    useEffect(() => {
        if (location.pathname.startsWith('/stay/') ||
            location.pathname.startsWith('/trip') ||
            location.pathname.startsWith('/wishlist') ||
            location.pathname.startsWith('/dashboard')) setIsSecondaryLayout(true)
        else setIsSecondaryLayout(false)
    }, [location])

    return (
        <div className={`${isSecondaryLayout ? 'secondary-layout' : 'main-layout'}`}>
            <AppHeader isSecondaryLayout={isSecondaryLayout} />
            <main style={{ paddingBottom: '80px' }}>
                <Toaster position='absolute' containerStyle={{ bottom: 60, left: 30, }} />
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="stay/:stayId/:order" element={<StayOrder />} />
                    <Route path="dashboard/stay/edit" element={<StayEdit />} />
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
            </main>
            <AppFooter isSecondaryLayout={isSecondaryLayout} />
        </div>
    )
}


