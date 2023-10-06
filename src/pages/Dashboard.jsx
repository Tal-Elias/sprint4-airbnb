import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadOrders } from "../store/actions/order.actions"
import { orderService } from "../services/order.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

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
            showSuccessMsg('Order ' + status)
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
                {orders.map(order => <li key={order._id}>
                    <h2>Guest: {order.buyer.fullname}</h2>
                    <h2>Check-in: {order.startDate}</h2>
                    <h2>Checkout: {order.endDate}</h2>
                    <h2>Listing: {order.stay.name}</h2>
                    <h2>Total: ${order.totalPrice}</h2>
                    <h2>Status: {order.status}</h2>
                    <button onClick={() => onApprove(order, 'approved')}>Approve</button>
                    <button onClick={() => onApprove(order, 'declined')}>Decline</button>
                </li>)}
            </ul>
        </section>
    )
}