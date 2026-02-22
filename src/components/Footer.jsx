import { resetCookieConsentValue } from "react-cookie-consent";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer__content">
                <nav className="site-footer__links" aria-label="Legal and preferences">
                    <Link to="/privacy-policy" className="site-footer__link">Privacy Policy</Link>
                    <Link to="/cookies-policy" className="site-footer__link">Cookies Policy</Link>
                    <button className="site-footer__link site-footer__link--button" onClick={resetCookieConsentValue}>
                        Change cookie preferences
                    </button>
                </nav>

                <div className="site-footer__info">
                    <p className="site-footer__copy">&copy; {new Date().getFullYear()} SuperM. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


