
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}

const gStays = [
    {
        _id: 't101',
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/1_gkubpt.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/2_mwreys.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/3_ro5oet.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/4_rhxf0x.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403546/Spacious%20SeaView%20villa/5_ku4axy.webp", "otherImg.jpg"],
        price: 80.00,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Cooking basics"
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: "Portugal",
            countryCode: "PT",
            city: "Lisbon",
            address: "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
        },
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional...",
                rate: 4,
                by: {
                    // _id: "u102",
                    fullname: "user2",
                    imgUrl: "/img/img2.jpg"
                }
            }
        ]
    },
    {
        _id: 't102',
        name: "Spacious SeaView villa",
        type: "House",
        imgUrls: ["https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/1_gkubpt.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/2_mwreys.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/3_ro5oet.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/4_rhxf0x.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403546/Spacious%20SeaView%20villa/5_ku4axy.webp"],
        price: 744.00,
        summary: "This spacious and charming villa has everything you need for an amazing holiday. Fully equipped for a self-catering stay for up to 6 guests, you will enjoy a private swimming pool 8x6 m, landscaped garden within your own  gated area for maximum comfort and privacy. Located across the road from Oroklini promenade where there is an open air gym, this beautiful villa is within easy walking distance of many cafes and restaurants and the 5 star Radisson Hotel.   The sunrises are awesome !",
        capacity: 6,
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Cooking basics"
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: "Cyprus",
            countryCode: "CY",
            city: "Oroklini",
            address: "",
            lat: 34.968609,
            lng: 33.664848
        },
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional...",
                rate: 4,
                by: {
                    // _id: "u102",
                    fullname: "user2",
                    imgUrl: "/img/img2.jpg"
                }
            }
        ]
    }
]

const gOrders = [
    {
        "_id": "o1225",
        "hostId": "u102",
        "buyer": {
            "_id": "u101",
            "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "2025/10/15",
        "endDate": "2025/10/17",
        "guests": {
            "adults": 1,
            "kids": 2
        },
        "stay": {
            "_id": "h102",
            "name": "House Of Uncle My",
            "price": 80.00
        },
        "msgs": [],
        "status": "pending" // approved, rejected
    }
]

window.cs = stayService

_createStays()
_createOrders()


async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function _createStays() {
    let stays = utilService.loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        stays = gStays
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}

function _createOrders() {
    let orders = utilService.loadFromStorage('orders')
    if (!orders || !orders.length) {
        orders = gOrders
        utilService.saveToStorage('orders', orders)
    }
}