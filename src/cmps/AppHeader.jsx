import routes from '../routes'
import { NavLink } from 'react-router-dom'
import Logo from '../../public/assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { StaySearchBar } from './StaySearchBar'

export function AppHeader() {
    const navigate = useNavigate()
    return (
        <header className='app-header main-layout full'>
            <div className='container'>
                <div className='logo-container' onClick={() => navigate('/')}>
                    <img src={Logo} alt='' />
                    <h1 className='logo'>airbnb</h1>
                </div>
                <div className='header-search-bar'>
                    <StaySearchBar />
                </div>
                <nav>
                    {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
                </nav>
            </div>
        </header>
    )
}