import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useSearchParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.js'
import { IndexLoader } from '../cmps/IndexLoader.jsx'
import { utilService } from '../services/util.service.js'
import { saveUserWishlist } from '../store/actions/user.actions.js'
import useEventListener from '../customHooks/useEventListener.js'
import { FilterLabels } from '../cmps/FilterLabels.jsx'

export function StayIndex() {
    const user = useSelector(storeState => storeState.userModule.user)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageIdx, setPageIdx] = useState(0)

    useEffect(() => {
        setFilterByParams()
        loadStays({ ...filterBy, pageIdx: 0 })
        return (() => {
            setFilter(stayService.getDefaultFilter())
        })
    }, [])

    useEffect(() => {
        try {
            loadStays({ ...filterBy, pageIdx })
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [filterBy, pageIdx])

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

    //****WIP****//
    // function handleScroll() {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop ===
    //         document.documentElement.offsetHeight
    //     ) {
    //         setPageIdx(pageIdx + 1)
    //     }
    // }

    // useEventListener('scroll', handleScroll)

    async function onWishlist(stay) {
        try {
            saveUserWishlist(stay)
        } catch (err) {
            console.log('Cannot update user wishlist', err)
            showErrorMsg('Cannot update user wishlist')
        }
    }

    return (
        <section className="stay-index">
            <StayLabels handleChange={handleChange} />
            {isLoading && <IndexLoader />}
            {!!stays &&
                <StayList
                    user={user}
                    stays={stays}
                    onWishlist={onWishlist}
                    updatedSearchParams={updatedSearchParams}
                />}
        </section>
    )
}