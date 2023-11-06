import { storageService } from "./async-storage.service"
import { userService } from "./user.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'order'
const gOrders=[
    {
        "hostId": "SzgiV",
        "totalPrice": 30,
        "checkIn": 1699707191955,
        "checkOut": 1700139191955,
        "guestCount": 2,
        "guests": {},
        "stay": {
            "_id": "622f337a75c7d36e498aaaf9",
            "name": "Belle chambre à côté Metro Papineau",
            "price": 30
        },
        "msgs": [],
        "status": "pending",
        "buyer": {
            "_id": "dhbsb",
            "fullname": "Renderella",
            "imgUrl": "https://randomuser.me/api/portraits/med/women/19.jpg"
        },
        "_id": "3xy3Y"
    },
    {
        "hostId": "SzgiV",
        "totalPrice": 65,
        "checkIn": 1699707256044,
        "checkOut": 1700139256044,
        "guestCount": 3,
        "guests": {},
        "stay": {
            "_id": "622f337a75c7d36e498aaafa",
            "name": "M&M Space MM2  Apartamento no centro da cidade",
            "price": 65
        },
        "msgs": [],
        "status": "pending",
        "buyer": {
            "_id": "dhbsb",
            "fullname": "Renderella",
            "imgUrl": "https://randomuser.me/api/portraits/med/women/19.jpg"
        },
        "_id": "auyog"
    },
    {
        "hostId": "SzgiV",
        "totalPrice": 79,
        "checkIn": 1699707266389,
        "checkOut": 1700139266389,
        "guestCount": 5,
        "guests": {},
        "stay": {
            "_id": "622f337a75c7d36e498aaafb",
            "name": "Fresh and modern 1BR in Bed-Stuy",
            "price": 79
        },
        "msgs": [],
        "status": "pending",
        "buyer": {
            "_id": "dhbsb",
            "fullname": "Renderella",
            "imgUrl": "https://randomuser.me/api/portraits/med/women/19.jpg"
        },
        "_id": "Aix8a"
    }
]

export const orderService = {
    query,
    getById,
    save,
    getEmptyOrder
}
_createOrders()
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
        const { _id, fullname , imgUrl} = userService.getLoggedinUser()
        order.buyer = { _id, fullname , imgUrl}
        order.status = 'pending'
        savedOrder = await storageService.post(STORAGE_KEY, order)
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

function _createOrders() {
    let orders = utilService.loadFromStorage('order')
    if (!orders || !orders.length) {
        orders = gOrders
        utilService.saveToStorage('order', orders)
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


