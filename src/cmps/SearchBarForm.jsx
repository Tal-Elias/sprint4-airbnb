import { useEffect, useState } from "react"
import { Backdrop } from "./Backdrop"
import { RegionSelect } from "./RegionSelect"
import { DatePickerModal } from "./stay-details/DatePickerModal"
import { GuestSelectModal } from "./stay-details/GuestSelectModal"
import { useForm } from "../customHooks/useForm"
import { useNavigate } from "react-router"

export function SearchBarForm({ setIsSearchBarOpen, selectedInput, setSelectedInput, filterByToEdit, setFilterByToEdit }) {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)
    const [fields, setFields, handleChange] = useForm({
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: {},
    })

    useEffect(() => {
        setExpanded(prevState => !prevState)
    }, [])

    // useEffect(() => {
    //     console.log(fields);
    // }, [fields])

    function handleOnClick(input) {
        setSelectedInput(input)
    }

    function onSetField(field, value) {
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    function checkForActiveClass(input) {
        return (selectedInput === input) ? ' active' : ''
    }

    function onSearch() {
        const { adults = 0, children = 0 } = fields.guests
        const totalGuests = adults + children
        const newFilterBy = {
            ...filterByToEdit,
            txt: fields.destination,
            guests: totalGuests
        }
        setFilterByToEdit(newFilterBy)
        setIsSearchBarOpen(false)
        navigate(`/`)
    }

    return (
        <div className="search-bar-form">
            <div className={`form-container ${expanded && 'expanded'}`}>
                <div className="input-destination">
                    <button className={"destination btn-input dest" + checkForActiveClass('destination')} onClick={() => handleOnClick('destination')}>
                        <div className="label">Where</div>
                        {/* <input type="text" className="sub-label">Search destinations</input> */}
                        <input
                            type="text"
                            placeholder="Search destinations"
                            name="destination"
                            value={fields.destination}
                            onChange={handleChange}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </button>
                    {selectedInput === 'destination' && <RegionSelect onSetField={onSetField} />}
                </div>
                <div className="form-seperator"></div>
                <div className="input-dates">
                    <button className={"check-in btn-input" + checkForActiveClass('check-in')} onClick={() => handleOnClick('check-in')}>
                        <div className="label">Check in</div>
                        <div className="sub-label">Add dates</div>
                    </button>
                    <div className="form-seperator"></div>
                    <button className={"check-out btn-input" + checkForActiveClass('checkout')} onClick={() => handleOnClick('checkout')}>
                        <div className="label">Check out</div>
                        <div className="sub-label">Add dates</div>
                    </button>
                    {(selectedInput === 'check-in' || selectedInput === 'checkout') && <DatePickerModal formLayout='form-layout' />}
                </div>
                <div className="form-seperator"></div>
                <div className={"input-guests-search" + checkForActiveClass('guests')}>
                    <div className="flex space-between align-center">
                        <button className="guests btn-input" onClick={() => handleOnClick('guests')}>
                            <div className="label">Who</div>
                            <div className="sub-label">Add guests</div>
                        </button>
                        <button className="btn-search" onClick={onSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                        </button>
                    </div>
                    {selectedInput === 'guests' && <GuestSelectModal formLayout='form-layout' guestsCount={fields.guests} onSetField={onSetField} />}
                </div>
            </div>
            <Backdrop setIsSearchBarOpen={setIsSearchBarOpen} />
        </div>
    )
}