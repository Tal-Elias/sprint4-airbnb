import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useSearchParams } from 'react-router-dom'
import { saveUser } from '../store/actions/user.actions.js'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const user = useSelector(storeState => storeState.userModule.user)
    const [userToEdit, setUserToEdit] = useState()

    useEffect(() => {
        setUserToEdit(user)
        try {
            console.log('userToEdit', userToEdit)
            saveUser(userToEdit)
        } catch (err) {
            console.log('Cannot update user', err)
            showErrorMsg('Cannot update user')
        }
        setFilter({ ...filterByParams })
    }, [userToEdit])

    useEffect(() => {
        // console.log(user)
        try {
            loadStays(filterBy)
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [filterBy])

    const filterByParams = {
        ...filterBy,
        txt: searchParams.get('destination') || '',
        label: searchParams.get('label') || '',
        guests: +searchParams.get('guests') || ''
    }

    const updatedSearchParams = {
        destination: searchParams.get('destination') || '',
        checkIn: searchParams.get('checkIn') || '',
        checkOut: searchParams.get('checkOut') || '',
        guests: +searchParams.get('guests') || '',
        adults: +searchParams.get('adults') || '',
        children: +searchParams.get('children') || '',
        infants: +searchParams.get('infants') || '',
        pets: +searchParams.get('pets') || ''
    }

    function handleChange({ field, value }) {
        setFilter({ ...filterBy, [field]: value })
        setSearchParams({ ...updatedSearchParams, [field]: value })
    }

    async function onWishlist(stayId) {
        // console.log(stayId)
        if (!user) return showErrorMsg('Please log in')
        // console.log(user)
        const stayIndex = user.wishlist.indexOf(stayId)
        // console.log(stayIndex)
        if (stayIndex !== -1) user.wishlist.splice(stayIndex, 1)
        else user.wishlist.unshift(stayId)
        // console.log('user.whislist:', user.wishlist)
        console.log(userToEdit)

        setUserToEdit(prevUser => ({ ...prevUser, wishlist: [...prevUser.wishlist] }))

    }

    if (!stays) return <div>loading</div>

    return (
        <section className="stay-index">
            <StayLabels handleChange={handleChange} />
            <StayList stays={stays} updatedSearchParams={updatedSearchParams} onWishlist={onWishlist} user={user} />
        </section>
    )
}