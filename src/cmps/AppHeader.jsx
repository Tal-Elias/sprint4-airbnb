import routes from '../routes'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../public/assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { StaySearchBar } from './StaySearchBar'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup'
import { login, logout, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { HamburgerMenu } from './HamburgerMenu'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate()

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
        <header className='app-header main-layout full'>
            <div className='container'>
                <div className='logo-container' onClick={() => navigate('/')}>
                    <img src={Logo} alt='' />
                    <h1 className='logo'>airbnb</h1>
                </div>
                <div className='header-search-bar'>
                </div>
                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {/* {user.imgUrl && <img src={user.imgUrl} />} */}
                            {user.fullname}
                        </Link>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
                <nav>
                    {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
                </nav>
                {/* <HamburgerMenu /> */}
            </div>
        </header>
    )
}