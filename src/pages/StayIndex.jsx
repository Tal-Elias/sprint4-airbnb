import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, getActionAddStay, getActionRemoveStay } from '../store/actions/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'
import { SOCKET_EVENT_STAY_ADDED, SOCKET_EVENT_STAY_REMOVED, socketService } from '../services/socket.service.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const dispatch = useDispatch()

    useEffect(() => {
        loadStays()

        socketService.on(SOCKET_EVENT_STAY_ADDED, stay => {
            dispatch(getActionAddStay(stay))
        })

        socketService.on(SOCKET_EVENT_STAY_REMOVED, stayId => {
            dispatch(getActionRemoveStay(stayId))
        })

        return () => {
            socketService.off(SOCKET_EVENT_STAY_ADDED)
            socketService.off(SOCKET_EVENT_STAY_REMOVED)
        }
    }, [])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.vendor = prompt('Vendor?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onAddStayMsg(stay) {
        console.log(`TODO Adding msg to stay`)
    }
    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return stay.owner?._id === user._id
    }

    return (
        <div>
            <h3>Stays App</h3>
            <main>
                <button onClick={onAddStay}>Add Stay ⛐</button>
                <ul className="stay-list">
                    {stays.map(stay =>
                        <li className="stay-preview" key={stay._id}>
                            <h4>{stay.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${stay.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{stay.owner && stay.owner.fullname}</span></p>
                            {shouldShowActionBtns(stay) && <div>
                                <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                                <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
                            </div>}

                            <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}