import { useState } from 'react'
import { StaySearchBar } from './StaySearchBar'
import { useSelector } from 'react-redux'
import { login, logout, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { NavHamburger } from './NavHamburger'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBarForm } from './SearchBarForm'
import { SearchFormOptions } from './SearchFormOptions'
import useEventListener from '../customHooks/useEventListener'

export function AppHeader({ isSecondaryLayout }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function handleScroll() {
        if (window.scrollY > 0) setIsSearchBarOpen(false)
    }

    useEventListener('scroll', handleScroll)

    return (
        <header className={`app-header full ${isSecondaryLayout ? 'secondary-layout' : 'main-layout sticky'}`}>
            <div className='header-container'>
                <Logo />
                {!isSearchBarOpen && <StaySearchBar setIsSearchBarOpen={setIsSearchBarOpen} />}
                {isSearchBarOpen && <SearchFormOptions isSearchBarOpen={isSearchBarOpen} />}
                <div className="nav-container" style={{ position: 'relative' }}>
                    <NavHamburger
                        isNavMenuOpen={isNavMenuOpen}
                        setIsNavMenuOpen={setIsNavMenuOpen}
                    />
                    {isNavMenuOpen &&
                        <NavMenu
                            user={user}
                            onLogin={onLogin}
                            onSignup={onSignup}
                            onLogout={onLogout}
                            isNavMenuOpen={isNavMenuOpen}
                            setIsNavMenuOpen={setIsNavMenuOpen}
                        />}
                </div>
            </div>
            {isSearchBarOpen && <SearchBarForm setIsSearchBarOpen={setIsSearchBarOpen} />}
        </header>
    )
}