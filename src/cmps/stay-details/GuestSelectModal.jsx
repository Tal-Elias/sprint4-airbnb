import { GuestCounter } from "./GuestCounter"
import useClickOutside from "../../customHooks/useClickOutside"
import { useRef } from "react"

export function GuestSelectModal({
    isGuestSelectModalOpen,
    setGuestSelectModalOpen,
    onSetField,
    guestCount,
    formLayout
}) {
    const elGuestSelectModal = useRef()

    function handleChange(field, value) {
        if (value <= 0) value = 0
        if (field === 'adults') {
            onSetField('guests', { ...guestCount, adults: value })
        }
        if (field === 'children') {
            onSetField('guests', { ...guestCount, children: value })
        }
        if (field === 'infants') {
            onSetField('guests', { ...guestCount, infants: value })
        }
        if (field === 'pets') {
            onSetField('guests', { ...guestCount, pets: value })
        }
    }

    const guestTypes = [
        {
            label: 'Adults',
            subLabel: 'Ages 13 or above',
            field: 'adults'
        },
        {
            label: 'Children',
            subLabel: 'Ages 2-12',
            field: 'children'
        },
        {
            label: 'Infants',
            subLabel: 'Under 2',
            field: 'infants'
        },
        {
            label: 'Pets',
            subLabel: <a href="">Bringing a Service Animal?</a>,
            field: 'pets'
        }
    ]

    useClickOutside(elGuestSelectModal, () => {
        if (isGuestSelectModalOpen) setGuestSelectModalOpen(false)
    })

    function onModalClick(ev) {
        ev.stopPropagation()
    }

    return (
        <div className={`guest-select-modal ${formLayout ? formLayout : ''}`} onClick={onModalClick} ref={elGuestSelectModal}>
            {guestTypes.map((type, idx) => {
                return (
                    <div className="guest-select-row flex space-between" key={idx}>
                        <div className="guest-select-labels">
                            <div className="guest-select-label">{type.label}</div>
                            <div className="guest-select-sub-label">{type.subLabel}</div>
                        </div>
                        <GuestCounter field={type.field} value={guestCount[type.field]} onChange={handleChange} />
                    </div>
                )
            })}
            <button className="btn btn-close scale underline grey-bg" onClick={() => setGuestSelectModalOpen(false)}>Close</button>
        </div>
    )
}