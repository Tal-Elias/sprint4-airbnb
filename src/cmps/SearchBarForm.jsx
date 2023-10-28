import { useEffect, useState } from "react"
import { Backdrop } from "./Backdrop"
import { RegionSelect } from "./RegionSelect"
import { DatePickerModal } from "./stay-details/DatePickerModal"
import { GuestSelectModal } from "./stay-details/GuestSelectModal"
import { useForm } from "../customHooks/useForm"

export function SearchBarForm({ setIsSearchBarOpen, selectedInput, setSelectedInput }) {
    const [expanded, setExpanded] = useState(false)
    const [fields, setFields, handleChange] = useForm({ destination, checkIn, checkOut, guests })
    useEffect(() => {
        setExpanded(prevState => !prevState)
    }, [])

    function handleOnClick(input) {
        setSelectedInput(input)

    }
    function handleChange({ target }) {
        console.log(target)
    }
    return (
        <div className="search-bar-form">
            <div className={`form-container ${expanded && 'expanded'}`}>
                <div className="input-destination">
                    <button className="destination btn-input dest" onClick={() => handleOnClick('destination')}>
                        <div className="label">Where</div>
                        {/* <input type="text" className="sub-label">Search destinations</input> */}
                        <input type="text" placeholder="Search destinations" name="destination" id="" onClick={(e) => e.stopPropagation()} onChange={handleChange} />
                    </button>
                    {selectedInput === 'destination' && <RegionSelect />}
                </div>
                <div className="form-seperator"></div>
                <div className="input-dates">
                    <button className="check-in btn-input" onClick={() => handleOnClick('check-in')}>
                        <div className="label">Check in</div>
                        <div className="sub-label">Add dates</div>
                    </button>
                    <div className="form-seperator"></div>
                    <button className="check-out btn-input" onClick={() => handleOnClick('checkout')}>
                        <div className="label">Check out</div>
                        <div className="sub-label">Add dates</div>
                    </button>
                    {(selectedInput === 'check-in' || selectedInput === 'checkout') && <DatePickerModal formLayout='form-layout' />}
                </div>
                <div className="form-seperator"></div>
                <div className="input-guests-search">
                    <div className="flex space-between align-center">
                        <button className="guests btn-input" onClick={() => handleOnClick('guests')}>
                            <div className="label">Who</div>
                            <div className="sub-label">Add guests</div>
                        </button>
                        <button className="btn-search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                        </button>
                    </div>
                    {selectedInput === 'guests' && <GuestSelectModal formLayout='form-layout' />}
                </div>
            </div>
            <Backdrop setIsSearchBarOpen={setIsSearchBarOpen} />
        </div>
    )
}