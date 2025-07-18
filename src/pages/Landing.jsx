import { Link } from "react-router";
import "../styles/LandingPage.css";

export default function Landing() {
    return (
        <>
            <title>SuperM</title>
            <h1>Online shopping simplified</h1>
            <p className="tagline text-dimmed">
                Order your groceries from SuperM with our easy to use app, and
                get your products delivered straight to your doorstep.
            </p>
            <Link className="btn btn--level1" to="/products">
                Start shopping
            </Link>
            <img
                className="landing-cover"
                width="816"
                height="380"
                src={`${import.meta.env.BASE_URL}landing.jpg`}
                alt="Display of fruits and vegetables"

            />
        </>
    );
}
