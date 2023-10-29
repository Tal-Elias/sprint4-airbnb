import { useEffect, useRef, useState } from "react"
import { Backdrop } from "./Backdrop"
import { RegionSelect } from "./RegionSelect"
import { DatePickerModal } from "./stay-details/DatePickerModal"
import { GuestSelectModal } from "./stay-details/GuestSelectModal"
import { useForm } from "../customHooks/useForm"
import { useNavigate } from "react-router"
import useClickOutside from "../customHooks/useClickOutside"
import { utilService } from "../services/util.service"

export function SearchBarForm({
    setIsSearchBarOpen,
    selectedInput,
    setSelectedInput,
    filterByToEdit,
    setFilterByToEdit }) {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)
    const elSearchBarForm = useRef(null)
    const [fields, setFields, handleChange] = useForm({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: {},
    })

    useEffect(() => {
        setExpanded(prevState => !prevState)
    }, [])

    /*** WIP ***/
    // useClickOutside(elSearchBarForm, () => {
    //     setSelectedInput(null)
    // })

    function handleOnClick(input) {
        setSelectedInput(input)
    }

    function onSetField(field, value) {
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
        if (field === 'destination') setSelectedInput('check-in')
        if (field === 'check-in') setSelectedInput('checkout')
        if (field === 'checkout') setSelectedInput('guests')
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
 
        const {destination, checkIn, checkOut, guests}= fields
        const searchParams = new URLSearchParams({destination,checkIn,checkOut,...guests}).toString()
        navigate(`/?${searchParams}`)
    }

    function countGuests(guests) {
        const { adults, children, infants, pets } = guests

        const totalGuests = adults + children
        const guestString = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : ''
        const infantString = infants > 0 ? `${infants} infant${infants > 1 ? 's' : ''}` : ''
        const petString = pets > 0 ? `${pets} pet${pets > 1 ? 's' : ''}` : ''

        const resultArray = [guestString, infantString, petString].filter(Boolean)
        const result = resultArray.join(', ')

        return !result ? 'Add guests' : result
    }

    const fromDate = fields['check-in'] ? utilService.formatToMonthDay(fields['check-in']) : 'Add date'
    const toDate = fields['checkout'] ? utilService.formatToMonthDay(fields['checkout']) : 'Add date'

    return (
        <div className="search-bar-form">
            <div className={`form-container ${expanded && 'expanded'}`} ref={elSearchBarForm}>
                <div className="input-destination">
                    <button
                        className={"destination btn-input dest" + checkForActiveClass('destination')}
                        onClick={() => handleOnClick('destination')}>
                        <div className="label">Where</div>
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
                    <button
                        className={"check-in btn-input" + checkForActiveClass('check-in')}
                        onClick={() => handleOnClick('check-in')}>
                        <div style={{ position: 'relative' }}>
                            <div className="label">Check in</div>
                            <div className="sub-label">{fromDate}</div>
                            {fromDate !== 'Add date' && selectedInput === 'check-in' &&
                                <span
                                    className="btn-close"
                                    onClick={() => {
                                        onSetField('check-in', '');
                                        onSetField('checkout', '')
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path d="m6 6 20 20M26 6 6 26"></path></svg>
                                </span>}
                        </div>
                    </button>
                    <div className="form-seperator"></div>
                    <button
                        className={"check-out btn-input" + checkForActiveClass('checkout')}
                        onClick={() => handleOnClick('checkout')}>
                        <div style={{ position: 'relative' }}>
                            <div className="label">Check out</div>
                            <div className="sub-label">{toDate}</div>
                            {toDate !== 'Add date' && selectedInput === 'checkout' &&
                                <span
                                    className="btn-close"
                                    onClick={() => {
                                        onSetField('check-in', '');
                                        onSetField('checkout', '')
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path d="m6 6 20 20M26 6 6 26"></path></svg>
                                </span>}
                        </div>
                    </button>
                    {(selectedInput === 'check-in' || selectedInput === 'checkout') &&
                        <DatePickerModal formLayout='form-layout' onSetField={onSetField} />
                    }
                </div>
                <div className="form-seperator"></div>
                <div className={"input-guests-search" + checkForActiveClass('guests')}>
                    <div className="flex space-between align-center">
                        <button className="guests btn-input" onClick={() => handleOnClick('guests')}>
                            <div className="label">Who</div>
                            <div className="sub-label">{countGuests(fields.guests)}</div>
                        </button>
                        <button className="btn-search" onClick={onSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                        </button>
                    </div>
                    {selectedInput === 'guests' &&
                        <GuestSelectModal
                            formLayout='form-layout'
                            guestsCount={fields.guests}
                            onSetField={onSetField}
                        />
                    }
                </div>
            </div>
            <Backdrop setIsSearchBarOpen={setIsSearchBarOpen} />
        </div>
    )
}