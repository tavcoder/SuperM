// Navigation bar component with logo, menu links, cart icon, and theme switcher
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
        <nav className="navbar">

            <Link className="logo" to="/" aria-label="SuperM home">
                SuperM
            </Link>

            <div className="nav-wrapper">
                <button className="theme-switcher" onClick={handleToggleTheme} aria-label="Toggle dark mode">
                    {light ? (
                        <FaSun className="icon" title="Light theme" />
                    ) : (
                        <FaMoon className="icon" title="Dark theme" />
                    )}
                </button>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        {user ? <NavLink to="/profile">Profile</NavLink> : <NavLink to="/login">Login</NavLink>}
                    </li>
                    <li className="nav-item">
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
