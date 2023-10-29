import { useEffect, useState } from 'react'
import { StaySearchBar } from './StaySearchBar'
import { NavHamburger } from './NavHamburger'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBarForm } from './SearchBarForm'
import { SearchFormOptions } from './SearchFormOptions'
import { setFilter } from '../store/actions/stay.actions'
import { useSelector } from 'react-redux'
import useEventListener from '../customHooks/useEventListener'

export function AppHeader({ isSecondaryLayout }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [selectedInput, setSelectedInput] = useState(null)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [searchPreview, setSearchPreview] = useState({
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: {}
    })

    useEffect(() => {
        setFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleScroll() {
        if (window.scrollY > 0) setIsSearchBarOpen(false)
    }

    // function handleChange({ field, value }, newSearchPreview) {
    //     setFilter({ ...filterBy, [field]: value })
    //     setSearchPreview(newSearchPreview)
    // }

    useEventListener('scroll', handleScroll)

    return (
        <header className={`app-header full ${isSecondaryLayout ? 'secondary-layout' : 'main-layout sticky'}`}>
            <div className='header-container'>
                <Logo />
                {!isSearchBarOpen &&
                    <StaySearchBar
                        setIsSearchBarOpen={setIsSearchBarOpen}
                        setSelectedInput={setSelectedInput}
                    />}
                {isSearchBarOpen &&
                    <SearchFormOptions
                        isSearchBarOpen={isSearchBarOpen}
                    />}
                <div className="nav-container" style={{ position: 'relative' }}>
                    <NavHamburger
                        isNavMenuOpen={isNavMenuOpen}
                        setIsNavMenuOpen={setIsNavMenuOpen}
                    />
                    {isNavMenuOpen &&
                        <NavMenu
                            isNavMenuOpen={isNavMenuOpen}
                            setIsNavMenuOpen={setIsNavMenuOpen}
                        />}
                </div>
            </div>
            {isSearchBarOpen &&
                <SearchBarForm
                    setIsSearchBarOpen={setIsSearchBarOpen}
                    selectedInput={selectedInput}
                    setSelectedInput={setSelectedInput}
                    filterByToEdit={filterByToEdit}
                    setFilterByToEdit={setFilterByToEdit}
                />}
        </header>
    )
}