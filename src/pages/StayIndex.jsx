import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useSearchParams } from 'react-router-dom'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    // const [searchParams, setSearchParams] = useSearchParams()

    // useEffect(() => {
    //     console.log('filterByIndex:', filterBy)
    //     setFilter({ ...filterByParams })
    // }, [])

    useEffect(() => {
        try {
            loadStays(filterBy)
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [filterBy])

    // const filterByParams = {
    //     ...filterBy,
    //     txt: searchParams.get('destination') || '',
    //     label: searchParams.get('label') || '',
    //     guests: +searchParams.get('guests') || ''
    // }

    // const updatedSearchParams = {
    //     destination: searchParams.get('destination') || '',
    //     checkIn: searchParams.get('checkIn') || '',
    //     checkOut: searchParams.get('checkOut') || '',
    //     guests: +searchParams.get('guests') || '',
    //     adults: +searchParams.get('adults') || '',
    //     children: +searchParams.get('children') || '',
    //     infants: +searchParams.get('infants') || '',
    //     pets: +searchParams.get('pets') || ''
    // }

    function handleChange({ field, value }) {
        setFilter({ ...filterBy, [field]: value })
        // setSearchParams({ ...updatedSearchParams, [field]: value })
    }

    if (!stays) return <div>loading</div>

    return (
        <section className="stay-index">
            <StayLabels handleChange={handleChange} />
            <StayList stays={stays} />
        </section>
    )
}