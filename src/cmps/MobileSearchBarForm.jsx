import { useEffect } from "react";
import { useForm } from "../customHooks/useForm";
import { ButtonSearch } from "./ButtonSearch";
import { DatePicker } from "./DatePicker";
import { MobileClosedSearchTab } from "./MobileClosedSearchTab";
import { RegionOptions } from "./RegionOptions";
import { DatePickerModal } from "./stay-details/DatePickerModal";
import { GuestSelectModal } from "./stay-details/GuestSelectModal";

export function MobileSearchBarForm({
    setIsMobileSearchBarOpen,
    filterBy,
    selectedInput,
    setSelectedInput,
    onSearch
}) {
    const [fields, setFields, handleChange] = useForm({
        destination: filterBy.txt || '',
        checkIn: filterBy.checkIn || '',
        checkOut: filterBy.checkOut || '',
        guests: {}
    })

    useEffect(() => {
        setSelectedInput('destination')
    }, [])

    useEffect(() => {
        console.log(fields)
    }, [fields])

    function onSetField(field, value) {
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
        // if (field === 'destination') setSelectedInput('check-in')
        // if (field === 'checkIn') setSelectedInput('checkout')


        // if (field === 'checkOut') setSelectedInput('guests')
    }

    return (
        <div className="mobile-search-bar-form">
            <button onClick={() => { setIsMobileSearchBarOpen(false); setSelectedInput(null) }} >close</button>
            {selectedInput === 'destination' ?
                <div className="where tab">
                    <h2>Where to?</h2>
                    <div className="search">
                        <label >
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" ><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search destinations"
                                name="destination"
                                value={fields.destination}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <RegionOptions onSetField={onSetField} />
                </div> :
                <MobileClosedSearchTab input={'Where'} setSelectedInput={setSelectedInput} />
            }
            {selectedInput === 'dates' ?
                <div className="when tab">
                    <h2>When's your trip?</h2>
                    <DatePickerModal detailsLayout='details-layout' onSetField={onSetField} />
                </div> :
                < MobileClosedSearchTab input={'When'} setSelectedInput={setSelectedInput} />}

            {selectedInput === 'guests' ?
                // <div className="who tab">
                //     <h2>Who's coming?</h2>
                    <GuestSelectModal
                        formLayout='form-layout mobile'
                        guestCount={fields.guests}
                        onSetField={onSetField}
                    />
                // </div> 
                :

                <MobileClosedSearchTab input={'Who'} setSelectedInput={setSelectedInput} />}

            {/* <div className="footer"> */}
                <ButtonSearch selectedInput={selectedInput} fields={fields} filterBy={filterBy} setIsSearchBarOpen={setIsMobileSearchBarOpen} />
            {/* </div> */}
        </div>
    )
}