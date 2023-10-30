import { GuestSelectModal } from './GuestSelectModal';

export function GuestSelect({
    isGuestSelectModalOpen,
    setGuestSelectModalOpen,
    guestsCount,
    onSetField
}) {
    const pathOpen = "M4 20 15.3 8.7a1 1 0 0 1 1.4 0L28 20";
    const pathClosed = "M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12";

    function handleOnClickGuestSelect(ev) {
        ev.stopPropagation()
        setGuestSelectModalOpen(!isGuestSelectModalOpen)
    }

    return (
        <div className="guest-select flex" onClick={handleOnClickGuestSelect}>
            <div className="guests-preview">
                <span>GUESTS</span>
                <span>1 guest</span>
            </div>
            <div className="arrow" >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                        display: 'block',
                        fill: 'none',
                        height: '16px',
                        width: '16px',
                        stroke: 'currentcolor',
                        strokeWidth: 4,
                        overflow: 'visible',
                    }}
                >
                    <path fill="none" d={isGuestSelectModalOpen ? pathOpen : pathClosed} />
                </svg>
            </div>
            {isGuestSelectModalOpen &&
                <GuestSelectModal
                    isGuestSelectModalOpen={isGuestSelectModalOpen}
                    setGuestSelectModalOpen={setGuestSelectModalOpen}
                    guestsCount={guestsCount}
                    onSetField={onSetField}
                />
            }
        </div>
    );
}