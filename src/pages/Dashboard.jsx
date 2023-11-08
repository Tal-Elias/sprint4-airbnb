import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadOrders, updateOrder } from "../store/actions/order.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { Listings } from "../cmps/Listings"
import { Performance } from "../cmps/Performance"
import { loadStays } from "../store/actions/stay.actions"
import { HostOrder } from "../cmps/HostOrder"
import { SOCKET_EVENT_NEW_ORDER, socketService } from "../services/socket.service"

export function Dashboard() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const [activePage, setActivePage] = useState('reservations')

    useEffect(() => {
        if (!user) return showErrorMsg('Please login')
        loadOrders({ hostId: user._id })
        loadStays({ pageIdx: 0, hostListing: user._id })
        socketService.on(SOCKET_EVENT_NEW_ORDER, () => {
            loadOrders({ hostId: user._id })
        })
    }, [])

    async function onOrderRespond(order, status) {
        order.status = status
        try {
            updateOrder(order)
            showSuccessMsg('Order ' + status)
        } catch (err) {
            console.log('Error while updating order:', err)
            showErrorMsg('Cannot update order')
        }
    }

    if (!orders || !user) return <div></div>

    return (
        <section className="dashboard">
            <nav className="dashboard-nav">
                <button className={"btn underline " + (activePage === 'reservations' ? 'active-page' : '')} onClick={() => setActivePage('reservations')}>Reservations</button>
                <button className={"btn underline " + (activePage === 'listings' ? 'active-page' : '')} onClick={() => setActivePage('listings')}>Listings</button>
                <button className={"btn underline " + (activePage === 'performance' ? 'active-page' : '')} onClick={() => setActivePage('performance')}>Performance</button>
            </nav>
            {activePage === 'reservations' && <HostOrder orders={orders} onOrderRespond={onOrderRespond} />}
            {activePage === 'listings' && <Listings stays={stays} />}
            {activePage === 'performance' && <Performance />}

        </section>
    )
}