import { useState } from "react"
import { setFilter } from "../store/actions/stay.actions"
import { useSearchParams } from "react-router-dom"

export function ButtonSearch({selectedInput, fields, filterBy , setIsSearchBarOpen}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isSecondaryLayout, setIsSecondaryLayout] = useState(false)



    function onSetFilter(searchFormIputs) {
        const { pageIdx } = filterBy
        setFilter({ ...searchFormIputs, txt: searchFormIputs.destination, pageIdx })
        setSearchParams(searchFormIputs)
        const searchString = new URLSearchParams(searchFormIputs)
        if (isSecondaryLayout) navigate(`/?${searchString}`)
    }

    function onSearch() {
        const { adults = 0, children = 0 } = fields.guests
        const totalGuests = adults + children
        const { destination, checkIn, checkOut, guests } = fields
        const searchFormIputs = {
            destination,
            checkIn,
            checkOut,
            guests: (totalGuests === 0) ? '' : totalGuests,
            ...guests
        }
        onSetFilter(searchFormIputs)
        setIsSearchBarOpen(false)
    }
    return (
        <button className={`btn-search${selectedInput ? ' expand' : ''}`} onClick={onSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
            <span className="txt-search">Search</span>
        </button>
    )
}