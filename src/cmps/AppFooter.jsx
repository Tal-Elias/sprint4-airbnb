
export function AppFooter({ isSecondaryLayout, routeLocation }) {

    const isDetailsLayout = isSecondaryLayout ? 'secondary-layout' : 'main-layout'
    const isFixed = !routeLocation.pathname.startsWith('/stay/') ? 'fixed' : ''
    
    return (
        <footer className={`app-footer full ${isDetailsLayout} ${isFixed}`}>
            <div className="site-info">
                <span> © 2023 Hairbnb, Inc.</span>
                <span className="seperator">·</span>
                <a href="#">Terms</a>
                <span className="seperator">·</span>
                <a href="#">Sitemap</a>
                <span className="seperator">·</span>
                <a href="#">Privacy</a>
                <span className="seperator">·</span>
                <a href="#">Your Privacy Choices</a>
            </div>
        </footer>
    )
}