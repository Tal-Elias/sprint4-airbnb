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
            {orders.map(o => <li key={o._id}>
                    <h2>Listing: {o.stay.name}</h2>
                    <h2>Host: {o.hostId}</h2>
                    <h2>Check-in: {o.startDate}</h2>
                    <h2>Checkout: {o.endDate}</h2>
                    <h2>Total: ${o.totalPrice}</h2>
                    <h2>Status: {o.status}</h2>
                </li>)}
            </ul>
        </section>
    )
}