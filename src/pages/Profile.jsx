// User profile page for viewing account information and logout
import { Navigate } from "react-router";
import "../styles/ProfilePage.css";

export default function Profile({ user, onUserLogout }) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <div className="profile-wrapper">
                <h1>Profile</h1>
                <title>Profile | SuperM</title>
                <p className="text-dimmed">
                    You are logged in as <strong>{user.username}</strong>.
                </p>
                <div className="profile-buttons">
                    <input
                        type="button"
                        value="Logout"
                        className="btn btn--level1"
                        onClick={onUserLogout}
                    />
                </div>
            </div>
        </>
    );
}
