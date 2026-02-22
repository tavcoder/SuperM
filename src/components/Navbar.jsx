/**
 * Displays a navigation bar with logo, menu links, cart icon, and theme switcher.
 * @param {Object|null} props.user - Authenticated user object, or null if not logged in
 */

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import CartIcon from "./CartIcon.jsx";

export default function Navbar({ user }) {
    const [light, setLight] = useState(true);


    function handleToggleTheme() {
        const newValue = !light;
        setLight(newValue);
        document.body.classList.toggle("dark");
    }

    return (
        <nav className="navbar" aria-label="Main navigation">

            <Link className="navbar__logo" to="/" aria-label="SuperM home">
                SuperM
            </Link>

            <div className="navbar__wrapper">
                <button className="navbar__theme-switcher" onClick={handleToggleTheme} aria-label="Toggle dark mode">
                    {light ? (
                        <FaSun className="u-icon" title="Light theme" />
                    ) : (
                        <FaMoon className="u-icon" title="Dark theme" />
                    )}
                </button>
                <ul className="navbar__menu">
                    <li className="navbar__menu-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="navbar__menu-item">
                        {user ? <NavLink to="/profile">Profile</NavLink> : <NavLink to="/login">Login</NavLink>}
                    </li>
                    <li className="navbar__menu-item">
                        <NavLink to="/products">Products</NavLink>
                    </li>
                </ul>
                <Link to="/checkout" aria-label="Shopping cart with 2 items">
                    <CartIcon />
                </Link>
            </div>
        </nav>
    );
}
