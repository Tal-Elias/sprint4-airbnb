import { useState } from 'react'
import { StaySearchBar } from './StaySearchBar'
import { useSelector } from 'react-redux'
import { login, logout, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { FaSearch } from 'react-icons/fa'
import { NavHamburger } from './NavHamburger'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBarForm } from './SearchBarForm'
import { SearchFormOptions } from './SearchFormOptions'

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
    return (
        <header className={`app-header full ${isSecondaryLayout ? 'secondary-layout' : 'main-layout sticky'}`}>
            <div className='header-container'>
                <Logo />
                {/* <div className="stay-search-form"> */}
                {!isSearchBarOpen && <StaySearchBar setIsSearchBarOpen={setIsSearchBarOpen} />}
                {isSearchBarOpen && <SearchFormOptions isSearchBarOpen={isSearchBarOpen} />}
                {/* </div> */}
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
                        />}
                </div>
            </div>
            {isSearchBarOpen && <SearchBarForm setIsSearchBarOpen={setIsSearchBarOpen} />}
        </header>
    )
}