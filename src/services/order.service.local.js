import { storageService } from "./async-storage.service"
import { userService } from "./user.service"

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
   
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
        // const buyer = userService.getLoggedinUser()
        // savedOrder.buyer = { _id, fullname } = buyer
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
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




// function getEmptyStay() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }