
export function AppFooter({ isSecondaryLayout }) {
    return (
        <footer className={`app-footer full ${isSecondaryLayout ? 'secondary-layout' : 'main-layout'}`}>
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