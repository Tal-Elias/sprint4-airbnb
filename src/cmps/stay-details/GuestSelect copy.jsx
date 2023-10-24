import { useState } from 'react'
import Select from 'react-select'
import { GuestCounter } from './GuestCounter'

export function GuestSelect() {

    const options = [
        { label: 'Adults', value: 'adults' },
        { label: 'Children', value: 'children' },
        { label: 'Infants', value: 'infants' },
        { label: 'Pets', value: 'pets' },
    ]

    const [selectedOption, setSelectedOption] = useState(options[0])

    const handleOptionChange = (option) => {
        setSelectedOption(option)
    }

    return (
        <div className="guest-select">
            <Select
                options={options}
                value={selectedOption}
                onChange={handleOptionChange}
            />
            {selectedOption.value === 'adults' && <GuestCounter label="Adults" />}
            {selectedOption.value === 'children' && <GuestCounter label="Children" />}
            {selectedOption.value === 'infants' && <GuestCounter label="Infants" />}
            {selectedOption.value === 'pets' && <GuestCounter label="Pets" />}
        </div>
    )
}