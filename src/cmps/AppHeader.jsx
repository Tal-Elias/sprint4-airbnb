import { useState } from 'react'
import { StaySearchBar } from './StaySearchBar'
import { NavHamburger } from './NavHamburger'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBarForm } from './SearchBarForm'
import { SearchFormOptions } from './SearchFormOptions'
import useEventListener from '../customHooks/useEventListener'

export function AppHeader({ isSecondaryLayout }) {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [selectedInput, setSelectedInput] = useState('destination')

    function handleScroll() {
        if (window.scrollY > 0) setIsSearchBarOpen(false)
    }

    useEventListener('scroll', handleScroll)

    return (
        <header className={`app-header full ${isSecondaryLayout ? 'secondary-layout' : 'main-layout sticky'}`}>
            <div className='header-container'>
                <Logo />
                {!isSearchBarOpen && <StaySearchBar setIsSearchBarOpen={setIsSearchBarOpen} setSelectedInput={setSelectedInput} />}
                {isSearchBarOpen && <SearchFormOptions isSearchBarOpen={isSearchBarOpen} />}
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
                />}
        </header>
    )
}