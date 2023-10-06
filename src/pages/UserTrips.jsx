import { useSelector } from "react-redux"
import { orderService } from "../services/order.service.local"
import { useEffect, useState } from "react"

export function UserTrips () {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        loadOrders()
    }, [])

    async function loadOrders() {
        try {
            const orders = await orderService.query({ buyerId: user._id })
            setOrders(orders)
        } catch (err) {
            console.log('Error while getting orders:', err)
            showErrorMsg('Cannot get orders')
        }
    }

    if (!orders) return <div>Loading...</div>

    return (
        <section className="user-trips">
            <ul className="clean-list">
            {orders.map(order => <li key={order._id}>
                    <h2>Listing: {order.stay.name}</h2>
                    <h2>Host: {order.hostId}</h2>
                    <h2>Check-in: {order.startDate}</h2>
                    <h2>Checkout: {order.endDate}</h2>
                    <h2>Total: ${order.totalPrice}</h2>
                    <h2>Status: {order.status}</h2>
                </li>)}
            </ul>
        </section>
    )
}