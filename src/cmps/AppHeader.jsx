import routes from '../routes'
import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header main-layout full">
            <div className="container">
                <Link to={'/'}>
                    <div className='logo-container'>
                        <img src="../../../../public/assets/img/bnb_logo.png" alt="" />
                        <h1 className="logo">airbnb</h1>
                    </div>
                </Link>
                <div className="main-search">I'm search bar</div>
                <nav>
                    {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
                </nav>
            </div>
        </header>
    )
}