import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { stayService } from "../services/stay.service.local";
import { addOrder } from "../store/actions/order.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function StayBook() {
    const queryParams = new URL(window.location.href).searchParams;
    const orderDetails = {};
    for (const [key, value] of queryParams.entries()) {
        orderDetails[key] = value;
    }

    // // // Create a URL object from the current page's URL
    // const orderUrl = ;

    // console.log(url.searchParams.get('startDate'))
    const [stay, setStay] = useState(null)

    const { stayId } = useParams()


    useEffect(() => {

        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
            // navigate('/stay')
        }
    }
    // console.log(window.location.href);
    // console.log('Hostname:', window.location.hostname);
    // console.log('Pathname:', window.location.pathname);
    // console.log('Query:', window.location.search);
    // console.log('Hash:', window.location.hash);

    async function onBook() {
        const order = {
            hostId: stay.host._id,
            totalPrice: stay.price,
            startDate: orderDetails.startDate,
            endDate: orderDetails.endDate,
            guests: {
                adults: orderDetails.adults,
                kids: orderDetails.kids
            },
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,

            },
            msgs: [],
            status: 'pending'
        }
        try {
            const savedOrder = await addOrder(order)
            showSuccessMsg(`Order added (id: ${savedOrder._id})`)
        } catch (err) {
            showErrorMsg('Cannot add order')
        }

    }

    return (
        <div>
            {stay && <section>

                <img className="order-stay-img" src={stay.imgUrls[0]} />
                <h5>{stay.type}</h5>
                <h5 className="stay-summary">{stay.summary}</h5>

                <h4>Your trip</h4>
                <h5>{orderDetails.startDate}</h5>
                <h5>{orderDetails.endDate}</h5>
                <button onClick={onBook}>Confirm and pay</button>

            </section>}

        </div>
    )
}


// const orders = [
//     {
//         "_id": "o1225",
//         "hostId": "u102",
//         "buyer": {
//             "_id": "u101",
//             "fullname": "User 1"
//         },
//         "totalPrice": 160,
//         "startDate": "2025/10/15",
//         "endDate": "2025/10/17",
//         "guests": {
//             "adults": 1,
//             "kids": 2
//         },
//         "stay": {
//             "_id": "h102",
//             "name": "House Of Uncle My",
//             "price": 80.00
//         },
//         "msgs": [],
//         "status": "pending" // approved, rejected
//     }
// ]