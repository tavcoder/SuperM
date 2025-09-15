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
        <div className="navbar">

            <Link className="logo" to="/">
                SuperM
            </Link>

            <nav className="nav-wrapper">
                <button className="theme-switcher" onClick={handleToggleTheme}>
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
                <Link to="/checkout">
                    <CartIcon />
                </Link>
            </nav>
        </div>
    );
}
