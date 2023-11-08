import { orderService } from '../../services/order.service.js';
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_ORDER, REMOVE_ORDER, SET_CURR_ORDER, SET_ORDERS, UNDO_REMOVE_ORDER, UPDATE_ORDER } from "../reducers/order.reducer.js";

// Action Creators:
export function getActionRemoveOrder(orderId) {
    return {
        type: REMOVE_ORDER,
        orderId
    }
}
export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order
    }
}

export async function loadOrders(filterBy) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch({
            type: SET_ORDERS,
            orders
        })

    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }

}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch(getActionRemoveOrder(orderId))
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionUpdateOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}

export function setCurrOrder(order) {
    store.dispatch({ type: SET_CURR_ORDER, currOrder: order })
    // console.log(newOrder)
    // return newOrder
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export async function onRemoveOrderOptimistic(orderId) {
    store.dispatch({
        type: REMOVE_ORDER,
        orderId
    })
    showSuccessMsg('Order removed')
    try {
        await orderService.remove(orderId)
        console.log('Server Reported - Deleted Succesfully');
    } catch (err) {
        showErrorMsg('Cannot remove order')
        console.log('Cannot load orders', err)
        store.dispatch({
            type: UNDO_REMOVE_ORDER,
        })
    }
}
