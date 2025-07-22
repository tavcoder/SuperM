import { resetCookieConsentValue } from "react-cookie-consent";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/cookies-policy">Cookies Policy</Link>
                    <button className="cookie-btn" onClick={resetCookieConsentValue}>
                        Change cookie preferences
                    </button>
                </div>

                <div className="footer-info">
                    <p>&copy; {new Date().getFullYear()} SuperM. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


