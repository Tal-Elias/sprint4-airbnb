
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { userService } from './user.service.local.js'
import { demoData, mongoStays } from '../../demoData.js'
const STORAGE_KEY = 'stay'
const PAGE_SIZE = 50

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDefaultFilter,
    getLabels,
    getSelectedAmenities,
}

const gStays = mongoStays

function modify(users) {
    console.log(users)
    const updatedGStays = gStays.map(stay => {
        const hostIdx = utilService.getRandomIntInclusive(0, 250)
        console.log(users[hostIdx].picture)
        return {
            ...stay,

            cleaningFee: utilService.getRandomIntInclusive(40, 95),
            host: {
                ...stay.host,
                thumbnailUrl: users[hostIdx].picture.medium,
                pictureUrl: users[hostIdx].picture.large,
                fullname: users[hostIdx].name.first
            },
            // ...stay,
            reviews: stay.reviews.map(review => {
                const guestIdx = utilService.getRandomIntInclusive(250, 5000)
                return {
                    ...review,
                    rate: utilService.getRandomIntInclusive(4, 5),
                    by: {
                        ...review.by,
                        imgUrl: users[guestIdx].picture.medium,
                        fullname: users[guestIdx].name.first
                    }
                }
            },
            )
        }
    })
    console.log(updatedGStays)
}
window.cs = stayService

_createStays()

async function query(filterBy = { txt: '', label: '', guests: '', pageIdx: 0 }) {
    let stays = await storageService.query(STORAGE_KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city))
    }

    if (filterBy.label) {
        const regex = new RegExp(filterBy.label, 'i')
        stays = stays.filter(stay => regex.test(stay.type))
    }

    if (filterBy.guests) {
        stays = stays.filter(stay => filterBy.guests <= stay.capacity)
    }

    if (filterBy.userWishlist) {
        stays = stays.filter(stay => filterBy.userWishlist.includes(stay._id))
    }
    if (filterBy.hostListing) {
        stays = stays.filter(stay => filterBy.hostListing === stay.host._id)
    }

    const startIndex = filterBy.pageIdx * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    const paginatedStays = stays.slice(startIndex, endIndex)

    return paginatedStays
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
        stay.host = userService.getLoggedinUser()
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
        // _id: utilService.makeId(),
        name: '',
        type: '',
        imgUrls: ["https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/2_mwreys.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/1_gkubpt.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/3_ro5oet.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/4_rhxf0x.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403546/Spacious%20SeaView%20villa/5_ku4axy.webp"],
        price: 0,
        summary: '',
        capacity: 0,
        amenities: [],
        labels: [],
        host: {},
        loc: {
            country: '',
            countryCode: "PT",
            city: '',
            address: '',
            lat: -8.61308,
            lng: 41.1413,
        },
        reviews: []
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        checkIn: '',
        checkOut: '',
        guests: 0,
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
        label: '',
        pageIdx: 0
    }
}

function getLabels() {
    return [
        {
            title: 'National parks',
            url: 'nationalParks'
        },
        {
            title: 'Beachfront',
            url: 'beachfront'
        },
        {
            title: 'Cabins',
            url: 'cabins'
        },
        {
            title: 'Design',
            url: 'design'
        },
        {
            title: 'Farms',
            url: 'farms'
        },
        {
            title: 'Mansions',
            url: 'mansions'
        },
        {
            title: 'Amazing views',
            url: 'amazingViews'
        },
        {
            title: 'Tropical',
            url: 'tropical'
        },
        {
            title: 'Vineyards',
            url: 'vineyards'
        },
        {
            title: 'Lake',
            url: 'lake'
        },
        {
            title: 'Treehouses',
            url: 'treehouses'
        },
        {
            title: 'OMG!',
            url: 'omg'
        },
        {
            title: 'Countryside',
            url: 'countryside'
        },
        {
            title: 'Amazing pools',
            url: 'amazingPools'
        },
        {
            title: 'Castles',
            url: 'castles'
        },
        {
            title: 'Rooms',
            url: 'rooms'
        },
        {
            title: 'Islands',
            url: 'islands'
        },
        {
            title: 'A-frames',
            url: 'aFrames'
        },
        {
            title: 'Iconic cities',
            url: 'iconicCities'
        },
        {
            title: 'LakeFront',
            url: 'lakeFront'
        },
        {
            title: 'Off-the-grid',
            url: 'offTheGrid'
        },
        {
            title: 'Play',
            url: 'play'
        },
        {
            title: 'Skiing',
            url: 'skiing'
        }
    ]
}

function getSelectedAmenities() {
    return [
        {
            title: 'Self check-in',
            url: 'self-check-in',
            desc: 'Check yourself in with the lockbox'
        },
        {
            title: 'Great location',
            url: 'great-location',
            desc: '92% of recent guests gave the location a 5-star rating'
        },
        {
            title: 'Great check-in experience',
            url: 'great-check-in',
            desc: '100% of recent guests gave the check-in process a 5-star rating'
        }
    ]
}

function _createStays() {
    let stays = utilService.loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        stays = gStays
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}