import { FaSearch } from "react-icons/fa";
import { utilService } from "../services/util.service";

export function StaySearchBar({ setIsSearchBarOpen, setSelectedInput, filterBy }) {

    function handleOnClick(input) {
        setIsSearchBarOpen(true)
        setSelectedInput(input)
    }

    // Do we need useEffect so that every time the cmp unloads it will clear the inputs?

    const destination = filterBy.txt ? filterBy.txt : 'Anywhere'
    const checkIn = filterBy.checkIn ? utilService.formatToMonthDay(filterBy.checkIn) : 'Any week'
    const checkOut = filterBy.checkOut ? utilService.formatToMonthDay(filterBy.checkOut) : ''
    const guests = filterBy.guests ? utilService.checkIfPlural(' Guest', (filterBy.guests)) : 'Add guests'

    return (
        <div className="stay-search-bar flex" onClick={(e) => e.stopPropagation()}>
            <div className="btn-container">
                <button
                    className="anywhere btn-search-bar"
                    onClick={() => handleOnClick('destination')}>{destination}</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button
                    className="any-week btn-search-bar"
                    onClick={() => handleOnClick('check-in')}>{`${checkIn} ${checkOut && ` - ${checkOut.slice(4)}`}`}</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button
                    className={`add-guests btn-search-bar ${filterBy.guests ? 'bold' : ''}`}
                    onClick={() => handleOnClick('guests')}>{guests}</button>
            </div>
            <button className="search"><FaSearch /></button>
        </div>
    )
}