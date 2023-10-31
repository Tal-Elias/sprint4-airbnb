import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useSearchParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local.js'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFilterByParams()
        // setFilter({ ...filterByParams })
        return (() => {
            setFilter(stayService.getDefaultFilter())
        })
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

    // if (!stays) return <div>loading</div>

    return (
        <section className="stay-index">
            <StayLabels handleChange={handleChange} />
            {isLoading && <IndexLoader />}
            {!!stays && <StayList stays={stays} updatedSearchParams={updatedSearchParams} />}
        </section>
    )
}