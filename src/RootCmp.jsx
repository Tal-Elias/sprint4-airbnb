import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayOrder } from './pages/StayOrder.jsx'
import { StaySearchBar } from './cmps/StaySearchBar'
import { UserMsg } from './cmps/UserMsg'
// import { UserDetails } from './pages/UserDetails'

export function RootCmp() {
    let location = useLocation()
    console.log('location:', location)

    const [isDetailsPage, setIsDetailsPage] = useState(false)

    useEffect(() => {
        if (location.pathname.startsWith('/stay/')) setIsDetailsPage(true)
        else setIsDetailsPage(false)
    }, [location])

    return (
        <div className={`${isDetailsPage ? 'details-layout' : 'main-layout'}`}>
            <AppHeader isDetailsPage={isDetailsPage} />
            <main>
                <UserMsg />
                {/* <StaySearchBar /> */}
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="stay/order" element={<StayOrder />} />
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                </Routes>
            </main>
            {/* <AppFooter isDetailsPage={isDetailsPage} /> */}
        </div>
    )
}


