import { useEffect, useState } from 'react'
import { StaySearchBar } from './StaySearchBar'
import { NavHamburger } from './NavHamburger'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBarForm } from './SearchBarForm'
import { SearchFormOptions } from './SearchFormOptions'
import { setFilter } from '../store/actions/stay.actions'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import useEventListener from '../customHooks/useEventListener'

export function AppHeader({ isSecondaryLayout }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [selectedInput, setSelectedInput] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    // const [searchFormIputs, setSearchFormIputs] = useState({})

    useEffect(() => {
        setFilter(filterByParams)
    }, [])

    const filterByParams = {
        ...filterBy,
        txt: searchParams.get('destination') || '',
        label: searchParams.get('label') || '',
        guests: +searchParams.get('guests') || ''
    }

    // const updatedSearchParams = {
    //     destination: searchParams.get('destination') || '',
    //     checkIn: searchParams.get('checkIn') || '',
    //     checkOut: searchParams.get('checkOut') || '',
    //     guests: +searchParams.get('guests') || '',
    //     adults: +searchParams.get('adults') || '',
    //     children: +searchParams.get('children') || '',
    //     infants: +searchParams.get('infants') || '',
    //     pets: +searchParams.get('pets') || ''
    // }

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
                        filterBy={filterBy}
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
                // filterByToEdit={filterByToEdit}
                // setFilterByToEdit={setFilterByToEdit}
                // setSearchFormIputs={setSearchFormIputs}
                />}
        </header>
    )
}