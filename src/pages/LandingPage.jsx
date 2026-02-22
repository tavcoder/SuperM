/**
 * Static page with hero section and call-to-action for the store
 */
import { Link } from "react-router";
import landing from '../assets/landing.avif';
import "../styles/LandingPage.css";

export default function Landing() {
    return (
        <>
            <title>SuperM</title>
            <h1 className="landing__title">Online shopping simplified</h1>
            <p className="landing__subtitle">
                Order your groceries from SuperM with our easy to use app, and
                get your products delivered straight to your doorstep.
            </p>
            <Link className="u-btn u-btn--primary" to="/products">
                Start shopping
            </Link>
            <img
                className="landing__image"
                width="816"
                height="380"
                src={landing}
                alt="Display of fruits and vegetables"

            />
        </>
    );
}
