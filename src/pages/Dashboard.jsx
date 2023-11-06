import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadOrders } from "../store/actions/order.actions"
import { orderService } from "../services/order.service"
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
    const [orderToUpdate, setOrderToUpdate] = useState(null)

    useEffect(() => {
        if (!user) return
        loadOrders({ hostId: user._id })
        loadStays({ pageIdx: 0, hostListing: user._id })
        socketService.on(SOCKET_EVENT_NEW_ORDER, () => {
            loadOrders({ hostId: user._id })
        })

        return () => {
            socketService.off(SOCKET_EVENT_NEW_ORDER)
        }
    }, [])

    async function onOrderRespond(order, status) {
        order.status = status
        try {
            const updatedOrder = await orderService.save(order)
            showSuccessMsg('Order ' + status)
            setOrderToUpdate(updatedOrder)
        } catch (error) {
            console.log('Error while updating order:', err)
            showErrorMsg('Cannot update order')
        }
    }

    if (!orders || !user) return <div>is loading...</div>

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