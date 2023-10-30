import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export function StaySearchBar({ setIsSearchBarOpen, setSelectedInput, filterBy }) {

    function handleOnClick(input) {
        setIsSearchBarOpen(true)
        setSelectedInput(input)
    }

    const destination = filterBy.txt ? filterBy.txt : 'Anywhere'
    const checkIn = filterBy.checkIn ? filterBy.checkIn : 'Any week'
    const guests = filterBy.guests ? filterBy.guests + ' Guests' : 'Add guests'

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
                    onClick={() => handleOnClick('check-in')}>{checkIn}</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button
                    className="add-guests btn-search-bar"
                    onClick={() => handleOnClick('guests')}>{guests}</button>
            </div>
            <button className="search"><FaSearch /></button>
        </div>
    )
}