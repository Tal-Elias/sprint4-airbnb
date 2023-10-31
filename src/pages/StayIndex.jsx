import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useSearchParams } from 'react-router-dom'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [searchParams, setSearchParams] = useSearchParams()
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        // console.log('filterByIndex:', filterBy)
        setFilter({ ...filterByParams })
    }, [])

    useEffect(() => {
        try {
            loadStays(filterBy)
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [filterBy])

    function setFilterByParams() {
        if (!searchParams.size) return
        const filterByParams = {
            ...filterBy,
            txt: searchParams.get('destination') || '',
            label: searchParams.get('label') || '',
            guests: +searchParams.get('guests') || 0,
            checkIn: +searchParams.get('checkIn') || '',
            checkOut: +searchParams.get('checkOut') || ''
        }
        setFilter({ ...filterByParams })
    }

    // const filterByParams = {
    //     ...filterBy,
    //     txt: searchParams.get('destination') || '',
    //     label: searchParams.get('label') || '',
    //     guests: +searchParams.get('guests') || '',
    //     checkIn: +searchParams.get('checkIn') || '',
    //     checkOut: +searchParams.get('checkOut') || ''
    // }

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
        if (!user) return showErrorMsg('Please log in')
        const newUser ={ ...user, wishlist: [...user.wishlist] }
        const stayIndex = newUser.wishlist.indexOf(stayId)
        if (stayIndex !== -1) newUser.wishlist.splice(stayIndex, 1)
        else newUser.wishlist.unshift(stayId)
      
        // setUserToEdit(prevUser => ({ ...prevUser, wishlist: [...prevUser.wishlist] }))
        try {
            saveUser(newUser)
        } catch (err) {
            console.log('Cannot update user', err)
            showErrorMsg('Cannot update user')
        }
    }

    // if (!stays) return <div>loading</div>

    return (
        <section className="stay-index">
        <StayLabels handleChange={handleChange} />
        {isLoading && <IndexLoader />}
        {!!stays && <StayList stays={stays} updatedSearchParams={updatedSearchParams} onWishlist={onWishlist} user={user} />}
    </section>
    )
}