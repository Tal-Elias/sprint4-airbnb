
export function AppFooter({ isSecondaryLayout, routeLocation }) {

    const isDetailsLayout = isSecondaryLayout ? 'secondary-layout' : 'main-layout'

    let isFixed
    if ((!routeLocation.pathname.startsWith('/stay/')) ||
        (!routeLocation.pathname.startsWith('/stay/order/'))) {
        isFixed = 'fixed'
    } else {
        isFixed = ''
    }

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