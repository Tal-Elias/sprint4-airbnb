import { useEffect, useState } from "react"
import { Backdrop } from "./Backdrop"

export function SearchBarForm({ setIsSearchBarOpen }) {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(prevState => !prevState)
    }, [])

    return (
        <div className="search-bar-form">
            <div className={`form-container ${expanded && 'expanded'}`} onClick={() => setIsSearchBarOpen(false)}>
                <div className="input-destination">
                    <button className="destination btn-input dest">
                        <div className="label">Where</div>
                        {/* <input type="text" className="sub-label">Search destinations</input> */}
                        <input type="text" placeholder="Search destinations" name="" id="" onClick={(e) => e.stopPropagation()} />
                    </button>
                    <div className="by-region-modal"></div>
                </div>
                <div className="form-seperator"></div>
                <div className="input-dates">
                    <button className="check-in btn-input">
                        <div className="label">Check in</div>
                        <div className="sub-label">Add dates</div>
                    </button>
                    <div className="form-seperator"></div>
                    <button className="check-out btn-input">
                        <div className="label">Check out</div>
                        <div className="sub-label">Add dates</div>
                    </button>
                    <div className="form-date-modal"></div>
                </div>
                <div className="form-seperator"></div>
                <div className="input-guests-search">
                    <div className="flex space-between align-center">
                        <button className="guests btn-input">
                            <div className="label">Who</div>
                            <div className="sub-label">Add guests</div>
                        </button>
                        <button className="btn-search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                        </button>
                    </div>
                    <div className="form-guest-modal"></div>
                </div>
            </div>
            <Backdrop setIsSearchBarOpen={setIsSearchBarOpen} />
        </div>
    )
}