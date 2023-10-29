import { storageService } from "./async-storage.service"
import { userService } from "./user.service"

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    getEmptyOrder

}

window.cs = orderService

async function query(filterBy = { txt: '', price: 0 }) {
    var orders = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    }
    if (filterBy.price) {
        orders = orders.filter(stay => stay.price <= filterBy.price)
    }

    if (filterBy.hostId) {
        orders = orders.filter(order => order.hostId === filterBy.hostId)
    }
    if (filterBy.buyerId) {
        orders = orders.filter(order => order.buyer._id === filterBy.buyerId)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

// async function remove(stayId) {
//     // throw new Error('Nope')
//     await storageService.remove(STORAGE_KEY, stayId)
// }

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        const { _id, fullname } = userService.getLoggedinUser()
        order.buyer = { _id, fullname }
        order.status = 'pending'
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

function getEmptyOrder() {
    return {
        hostId: '',
        totalPrice: '',
        startDate: '',
        endDate: '',
        guests: {
            adults: null,
            children: null
        },
        stay: {
            _id: '',
            name: '',
            price: null,
        },
        msgs: [],
    }
}


// async function addStayMsg(stayId, txt) {
//     // Later, this is all done by the backend
//     const stay = await getById(stayId)
//     if (!stay.msgs) stay.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     stay.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, stay)

//     return msg
// }


