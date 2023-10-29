import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { StayLabels } from '../cmps/StayLabels.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    useEffect(() => {
        try {
            loadStays(filterBy)
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [filterBy])

    function handleChange({ field, value }) {
        setFilter({ ...filterBy, [field]: value })
    }

    if (!stays) return <div>loading</div>

    return (
        <section className="stay-index">
            <StayLabels handleChange={handleChange} />
            <StayList stays={stays} />
        </section>
    )
}