import { DesktopHeader } from "./DesktopHeader"
import { MobileHeader } from "./MobileHeader"
import { SOCKET_EVENT_NEW_ORDER, SOCKET_EVENT_ORDER_UPDATED, socketService } from '../services/socket.service'
import { useSearchParams } from "react-router-dom"
import { setFilter } from "../store/actions/stay.actions"
import { useSelector } from "react-redux"
import { useEffect } from "react"


export function AppHeader({ isSecondaryLayout, routeLocation, isDetailsPage }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    


    useEffect(() => {
        setFilterByParams()
    }, [])

    useEffect(() => {
        if (!user) return
        socketService.on(SOCKET_EVENT_ORDER_UPDATED, () => {
            showSuccessMsg('Order status has been updated')
        })
        socketService.on(SOCKET_EVENT_NEW_ORDER, () => {
            console.log('new order arrived');
            // showSuccessMsg(`New order has arrived`)
        })
        return () => {
            socketService.off(SOCKET_EVENT_ORDER_UPDATED)
            socketService.off(SOCKET_EVENT_NEW_ORDER)
        }
    }, [user])

    function setFilterByParams() {
        if (!searchParams.size) return
        const filterByParams = {
            ...filterBy,
            txt: searchParams.get('destination') || '',
            label: searchParams.get('label') || '',
            guests: +searchParams.get('guests') || 0
        }
        setFilter({ ...filterByParams })
    }

    // function onSetFilter(searchFormIputs) {
    //     const { pageIdx } = filterBy
    //     setFilter({ ...searchFormIputs, txt: searchFormIputs.destination, pageIdx })
    //     setSearchParams(searchFormIputs)
    //     const searchString = new URLSearchParams(searchFormIputs)
    //     if (isSecondaryLayout) navigate(`/?${searchString}`)
    // }

    // function onSearch() {
    //     const { adults = 0, children = 0 } = fields.guests
    //     const totalGuests = adults + children
    //     const { destination, checkIn, checkOut, guests } = fields
    //     const searchFormIputs = {
    //         destination,
    //         checkIn,
    //         checkOut,
    //         guests: (totalGuests === 0) ? '' : totalGuests,
    //         ...guests
    //     }
    //     onSetFilter(searchFormIputs)
    //     setIsSearchBarOpen(false)
    // }
    return (
        <>
            <DesktopHeader isSecondaryLayout={isSecondaryLayout} routeLocation={routeLocation} user={user}  />
            {!isDetailsPage && <MobileHeader />}

        </>

    )
}