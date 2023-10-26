import { GuestCounter } from "./GuestCounter"

export function GuestSelectModal({ setGuestSelectModalOpen }) {

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

    function onModalClick(ev) {
        ev.stopPropagation()
    }

    return (
        <div className="guest-select-modal" onClick={onModalClick}>
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
            <button onClick={() => setGuestSelectModalOpen(false)}>Close</button>
        </div>
    )
}