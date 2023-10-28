import { GuestCounter } from "./GuestCounter"
import useClickOutside from "../../customHooks/useClickOutside"
import { useRef } from "react"

export function GuestSelectModal({ isGuestSelectModalOpen, setGuestSelectModalOpen, formLayout }) {
    const elGuestSelectModal = useRef()

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
                        <GuestCounter />
                    </div>
                )
            })}
            <button className="btn-close" onClick={() => setGuestSelectModalOpen(false)}>Close</button>
        </div>
    )
}