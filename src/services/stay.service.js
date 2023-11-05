
import { httpService } from './http.service.js'

const BASE_URL = 'stay/'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    getDefaultFilter,
    getLabels,
    getSelectedAmenities,
    addStayMsg
}

window.cs = stayService

async function query(filterBy = { txt: '', label: '', guests: 0, pageIdx: 0 }) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    let savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}

function getEmptyStay() {
    return {
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