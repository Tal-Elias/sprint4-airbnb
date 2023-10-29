import { FaSearch } from "react-icons/fa";

export function StaySearchBar({ setIsSearchBarOpen, setSelectedInput }) {

    function handleOnClick(input) {
        setIsSearchBarOpen(true)
        setSelectedInput(input)
    }

    return (
        <div className="stay-search-bar flex">
            <div className="btn-container">
                <button
                    className="anywhere btn-search-bar"
                    onClick={() => handleOnClick('destination')}>Anywhere</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button
                    className="any-week btn-search-bar"
                    onClick={() => handleOnClick('check-in')}>Any week</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button
                    className="add-guests btn-search-bar"
                    onClick={() => handleOnClick('guests')}>Add guests</button>
            </div>
            <button className="search"><FaSearch /></button>
        </div>
    )
}