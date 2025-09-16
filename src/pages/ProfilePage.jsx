// User profile page for viewing account information and logout
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
            <div className="profile-wrapper">
                <title>Profile | SuperM</title>
                <p className="text-dimmed">
                    Welcome, <strong>{user.username}</strong>. Here’s your info — we’ll use it to make shipping easier.
                </p>
                {isEditing ? (
                      <div className="profile-form">
                          <ShippingForm
                              user={user}
                              onSubmit={handleSubmit}
                              buttonText="Save Profile"
                              showPrivacy={false}
                              showTitle={false}
                              cancelButton={<button type="button" className="btn btn--level3" onClick={() => setIsEditing(false)}>Cancel</button>}
                          />
                      </div>
                 ) : (
                     <div className="profile-data">
                         <div className="profile-header">
                             <h2>Profile Information</h2>
                              <button className="btn btn--level3" onClick={() => setIsEditing(true)}><FaEdit /> Edit Profile</button>
                         </div>
                         <div className="row">
                             <p><strong>First Name:</strong> {profile.firstName}</p>
                             <p><strong>Last Name:</strong> {profile.lastName}</p>
                         </div>
                         <div className="row">
                             <p><strong>Address:</strong> {profile.address}</p>
                             <p><strong>Apt:</strong> {profile.apt}</p>
                         </div>
                         <div className="row">
                             <p><strong>City:</strong> {profile.city}</p>
                             <p><strong>Country:</strong> {profile.country}</p>
                         </div>
                         <div className="row">
                             <p><strong>State:</strong> {profile.state}</p>
                             <p><strong>Postal Code:</strong> {profile.postalCode}</p>
                         </div>
                          <div className="row">
                              <p><strong>Email:</strong> {profile.email}</p>
                              <p><strong>Phone:</strong> {profile.phone}</p>
                          </div>
                          <div className="profile-buttons">
                              <input
                                  type="button"
                                  value="Logout"
                                  className="btn btn--level1"
                                  onClick={onUserLogout}
                              />
                          </div>
                      </div>
                 )}
            </div>
        </>
    );
}
