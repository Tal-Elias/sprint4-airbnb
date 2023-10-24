import routes from '../routes'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/img/logo.png'
import { FiSearch } from 'react-icons/fi'
import { StaySearchBar } from './StaySearchBar'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup'
import { login, logout, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { FaSearch } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'

export function AppHeader({ isDetailsPage }) {
    const user = useSelector(storeState => storeState.userModule.user)

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
        <header className={`app-header full ${isDetailsPage ? 'details-layout' : 'main-layout'}`}>
            <div className='container'>
                <Link to={'/'}>
                    <div className='logo-container'>
                        <img src={Logo} alt='' />
                        <h1 className='logo'>hairbnb</h1>
                    </div>
                </Link>
                {/* <div className='header-search-bar'>
                </div> */}
                {/* <div className='search-bar-buttons flex' >
                    <div className='fw600'>Anywhere</div>
                    <span className="seperator"></span>
                    <div className='fw600'>Any week</div>
                    <span className="seperator"></span>
                    <div>Add guests</div>
                    <button><FaSearch /></button>
                </div> */}

               

                {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                } */}
                {/* {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}
                <div className='burger-menu'>
                    <FiMenu className='icon-menu' />
                    <div className='avatar'>
                        <FaUser className='avatar-icon' />
                    </div>
                </div>
                {/* <nav>
                    {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
                </nav> */}
            </div>
            <div className='exp-search-bar'>
                    <div className='where choose'>
                        <div className='label'>Where</div>
                        <div className='input'>Add destination</div>
                    </div>
                    <div className='exp-seperator'></div>
                    <div className='when'>
                        <div className='check-in choose'>
                            <div className='label'>Check in</div>
                            <div className='input'>Add dates</div>
                        </div>
                        <div className='exp-seperator'></div>
                        <div className='check-out choose'>
                            <div className='label'>Check out</div>
                            <div className='input'>Add dates</div>
                        </div>
                    </div>
                    <div className='exp-seperator'></div>
                    <div className='search-section choose'>
                        <div className='who '>
                            <div className='label'>Who</div>
                            <div className='input'>Add guests</div>
                        </div>
                        <button className='search'><FaSearch /></button>

                    </div>

                </div>
        </header>
    )
}