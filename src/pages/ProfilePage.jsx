/**
 * User profile page managing account information and logout.
 * Redirects to /login when user is not authenticated.
 * @param {Object|null} user - Authenticated user object, or null if not logged in
 * @param {Function} onUserLogout - Callback to log out the current user
 * @param {Function} onUpdateProfile - Callback to update the user profile in App state
 */

import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import ShippingForm from "../components/ShippingForm";
import "../styles/ProfilePage.css";

export default function Profile({ user, onUserLogout, onUpdateProfile }) {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const profile = user?.profile || {};

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleSubmit = (data) => {
        onUpdateProfile(data);
        setIsEditing(false);
        navigate('/profile-success');
    };

    return (
        <>
            <div className="profile">
                <title>Profile | SuperM</title>
                <p className="u-text-dimmed">
                    Welcome, <strong>{user.username}</strong>. Here’s your info — we’ll use it to make shipping easier.
                </p>
                {isEditing ? (
                    <div className="profile__form">
                        <ShippingForm
                            user={user}
                            onSubmit={handleSubmit}
                            buttonText="Save Profile"
                            showPrivacy={false}
                            showTitle={false}
                            cancelButton={<button type="button" className="u-btn u-btn--tertiary" onClick={() => setIsEditing(false)}>Cancel</button>}
                        />
                    </div>
                ) : (
                    <div className="profile__data">
                        <div className="profile__header">
                            <h2>Profile Information</h2>
                            <button className="u-btn u-btn--tertiary" onClick={() => setIsEditing(true)}><FaEdit /> Edit Profile</button>
                        </div>
                        <div className="u-row">
                            <p><strong>First Name:</strong> {profile.firstName}</p>
                            <p><strong>Last Name:</strong> {profile.lastName}</p>
                        </div>
                        <div className="u-row">
                            <p><strong>Address:</strong> {profile.address}</p>
                            <p><strong>Apt:</strong> {profile.apt}</p>
                        </div>
                        <div className="u-row">
                            <p><strong>City:</strong> {profile.city}</p>
                            <p><strong>Country:</strong> {profile.country}</p>
                        </div>
                        <div className="u-row">
                            <p><strong>State:</strong> {profile.state}</p>
                            <p><strong>Postal Code:</strong> {profile.postalCode}</p>
                        </div>
                        <div className="u-row">
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Phone:</strong> {profile.phone}</p>
                        </div>
                        <div className="profile__actions">
                            <input
                                type="button"
                                value="Logout"
                                className="u-btn u-btn--primary"
                                onClick={onUserLogout}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
