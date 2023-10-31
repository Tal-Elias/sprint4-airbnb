import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useSearchParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local.js'
import { IndexLoader } from '../cmps/IndexLoader.jsx'
import { utilService } from '../services/util.service.js'
import useEventListener from '../customHooks/useEventListener.js'
import { saveUser, saveUserWishlist } from '../store/actions/user.actions.js'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const user = useSelector(storeState => storeState.userModule.user)
    useEffect(() => {
        setFilterByParams()
        loadStays({ ...filterBy, page: 1 })
        return (() => {
            setFilter(stayService.getDefaultFilter())
        })
    }, [])

    useEffect(() => {
        try {
            loadStays({ ...filterBy, page })
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [filterBy, page])

    useEffect(() => {
        console.log('hi');
    }, [handleScroll])

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

    const updatedSearchParams = utilService.getSearchParams(searchParams)

    function handleChange({ field, value }) {
        setFilter({ ...filterBy, [field]: value })
        setSearchParams({ ...updatedSearchParams, [field]: value })
    }

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setPage(page + 1)
        }
    }

    useEventListener('scroll', handleScroll)

    async function onWishlist(stayId) {
        try {
            saveUserWishlist(stayId)
        } catch (err) {
            console.log('Cannot update user wishlist', err)
            showErrorMsg('Cannot update user wishlist')
        }
    }

    return (
        <section className="stay-index">
            <StayLabels handleChange={handleChange} />
            {isLoading && <IndexLoader />}
            {!!stays && <StayList stays={stays} updatedSearchParams={updatedSearchParams} onWishlist={onWishlist} user={user} />}
        </section>
    )
}