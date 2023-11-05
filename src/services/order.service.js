
import { httpService } from './http.service.js'

const BASE_URL = 'order/'

export const orderService = {
    query,
    getById,
    save,
    getEmptyOrder,
}

window.cs = orderService

async function query(filterBy = { hostId: '', buyerId: '' }) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function save(order) {
    let savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)

    } else {
        savedOrder = await httpService.post('order/', order)
    }
    return savedOrder
}

function getEmptyOrder() {
    return {
        hostId: '',
        totalPrice: '',
        checkIn: '',
        checkOut: '',
        guests: {
            adults: 0,
            children: 0
        },
        stay: {
            _id: '',
            name: '',
            price: 0,
        },
        msgs: [],
    }
}