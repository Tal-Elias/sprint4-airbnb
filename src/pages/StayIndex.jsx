import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { StayList } from '../cmps/StayList.jsx'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadStays()
            } catch (err) {
                console.log('err:', err)
                showErrorMsg('Cannot load stays')
            }
        }

        fetchData()
    }, [])


    return (
        <section className="stay-index">
            <StayList stays={stays} />
        </section>
    )
}