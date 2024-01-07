// import { useRef } from "react"
// import useClickOutside from "../customHooks/useClickOutside"

export function AmenitiesModal({ amenities, isAmenetiesModalOpen, setAmenetiesModalOpen }) {
    // const elAmenitiesModal = useRef()

    // useClickOutside(elAmenitiesModal, () => {
    //     if (isAmenetiesModalOpen) setAmenetiesModalOpen(false)
    // })

    return (
        <div
            //  ref={elAmenitiesModal}
            //  onClick={(e) => e.stopPropagation()}
            className="ameneties-modal "
        >
            <div className="overlay" onClick={() => setAmenetiesModalOpen(false)}></div>
            <div className="modal-content">
                <button onClick={() => setAmenetiesModalOpen(false)}>close</button>
                <h2 className="pb24">What this place offers</h2>
                <ul className="clean-list">
                    {amenities.map(amenity =>
                        <li key={amenity}>
                            <div className="amenity-container flex align-center ptb24">
                                <img className="w24" src={`../assets/img/amenities/${amenity.toLowerCase()}.svg`} alt="" />
                                <span>{amenity}</span>
                            </div>
                            <div className="line"></div>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}