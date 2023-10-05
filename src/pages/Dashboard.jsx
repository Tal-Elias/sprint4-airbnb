import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadOrders } from "../store/actions/order.actions"
import { orderService } from "../services/order.service.local"
import { showErrorMsg } from "../services/event-bus.service"

export function Dashboard() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        loadOrders()
    }, [])

    async function loadOrders() {
        try {
            const orders = await orderService.query({ hostId: user._id })
            setOrders(orders)
        } catch (err) {
            console.log('Error while getting orders:', err)
            showErrorMsg('Cannot get orders')
        }
    }

    async function onApprove(order, status) {
        order.status = status
        try {
            const updatedOrder = await orderService.save(order)
            console.log('order approval:', updatedOrder)
        } catch (error) {
            console.log('Error while updating order:', err)
            showErrorMsg('Cannot update order')
        }
    }

    if (!orders) return <div>is loading...</div>

    return (
        <section className="dashboard">
            <Link to='stay/edit'>Create Listing</Link>
            <ul className="clean-list">
                {orders.map(o => <li key={o._id}>
                    <h2>Guest: {o.buyer.fullname}</h2>
                    <h2>Check-in: {o.startDate}</h2>
                    <h2>Checkout: {o.endDate}</h2>
                    <h2>Listing: {o.stay.name}</h2>
                    <h2>Total: ${o.totalPrice}</h2>
                    <h2>Status: {o.status}</h2>
                    <button onClick={() => onApprove(o, 'approved')}>Approve</button>
                    <button onClick={() => onApprove(o, 'declined')}>Decline</button>
                </li>)}
            </ul>
        </section>
    )
}