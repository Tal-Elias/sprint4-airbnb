
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
window.cs = stayService


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


// // TEST DATA
// storageService.post(STORAGE_KEY, {
//     name: "Ribeira Charming Duplex",
//     type: "House",
//     imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
//     price: 80.00,
//     summary: "Fantastic duplex apartment...",
//     capacity: 8,
//     amenities: [
//         "TV",
//         "Wifi",
//         "Kitchen",
//         "Smoking allowed",
//         "Pets allowed",
//         "Cooking basics"
//     ],
//     labels: [
//         "Top of the world",
//         "Trending",
//         "Play",
//         "Tropical"
//     ],
//     host: {
//         _id: "u101",
//         fullname: "Davit Pok",
//         imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//     },
//     loc: {
//         country: "Portugal",
//         countryCode: "PT",
//         city: "Lisbon",
//         address: "17 Kombo st",
//         lat: -8.61308,
//         lng: 41.1413
//     },
//     reviews: [
//         {
//             id: "madeId",
//             txt: "Very helpful hosts. Cooked traditional...",
//             rate: 4,
//             by: {
//                 _id: "u102",
//                 fullname: "user2",
//                 imgUrl: "/img/img2.jpg"
//             }
//         }
//     ]
// }).then(x => console.log(x))




