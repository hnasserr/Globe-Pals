import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`user-modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="user-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="user-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="user-profile-header">
          <div className="user-profile-info">
            <div className="profile-icon-placeholder">
              {user && user.avatar && user.avatar.url ? (
                <img src={user.avatar.url} />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}{" "}
            </div>
            <div className="username-section">
              <h3 className="username">{username}</h3>
              <Link to="/edit-profile" className="edit-profile-link">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <hr className="modal-divider" />
        <div className="user-profile-links">
          <Link to="/chat">Chat</Link>
          <Link to="/my-trips">My Trips</Link>
          <Link to="/create-trip">Create a Trip</Link>
          <Link to="/personal-info">Personal Information</Link>
          <Link to="/notification-settings">Notification Settings</Link>
          <Link to="/payments">Payments & Payouts</Link>
          <Link to="/refer">Refer & Get iPhone</Link>
          <Link to="/partner-offers">Partner Offers</Link>
          <Link to="/help-faq">Help & FAQ</Link>
          <Link to="/signout">Sign Out</Link>
        </div>
        <hr className="modal-divider" />
        <div className="user-profile-footer">
          <p>Currency: € EUR</p>
          <p>Language: English</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
