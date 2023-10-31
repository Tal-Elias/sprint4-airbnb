import { GuestCounter } from "./GuestCounter"
import useClickOutside from "../../customHooks/useClickOutside"
import { useEffect, useRef } from "react"

export function GuestSelectModal({
    isGuestSelectModalOpen,
    setGuestSelectModalOpen,
    onSetField,
    guestsCount,
    formLayout
}) {
    const elGuestSelectModal = useRef()

    function handleChange(field, value) {
        if (value <= 0) value = 0
        if (field === 'adults') {
            onSetField('guests', { ...guestsCount, adults: value })
        }
        if (field === 'children') {
            onSetField('guests', { ...guestsCount, children: value })
        }
        if (field === 'infants') {
            onSetField('guests', { ...guestsCount, infants: value })
        }
        if (field === 'pets') {
            onSetField('guests', { ...guestsCount, pets: value })
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
                        <GuestCounter field={type.field} value={guestsCount[type.field]} onChange={handleChange} />
                    </div>
                )
            })}
            <button className="btn-close" onClick={() => setGuestSelectModalOpen(false)}>Close</button>
        </div>
    )
}