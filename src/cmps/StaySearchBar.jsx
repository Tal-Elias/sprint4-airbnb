import { FaSearch } from "react-icons/fa";

export function StaySearchBar({ setIsSearchBarOpen }) {
    return (
        <div className="stay-search-bar flex" onClick={setIsSearchBarOpen}>
            <div className="btn-container">
                <button className="anywhere btn-search-bar">Anywhere</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button className="any-week btn-search-bar">Any week</button>
            </div>
            <span className="seperator"></span>
            <div className="btn-container">
                <button className="add-guests btn-search-bar">Add guests</button>
            </div>
            <button className="search"><FaSearch /></button>
        </div>
    )
}