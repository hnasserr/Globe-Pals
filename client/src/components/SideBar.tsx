import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <div
      className={`sidebar-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
        <button className="sidebar-close" onClick={onClose}>
          &times;
        </button>

        {!auth?.user ? (
          <>
            <div className="sidebar-header">
              <div className="sidebar-modal">
                <h3>
                  Start chatting with like-minded travelers and planning your
                  next big trip.
                </h3>
                <Link to="/login" className="btn-login">
                  Log In
                </Link>
                <p>or still need to join?</p>
                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </div>
            </div>
            <hr className="modal-divider" />
            <div className="sidebar-links">
              <Link to="/all-trips" onClick={onClose}>
                JOIN A TRIP
              </Link>
              <Link to="/how-it-works" onClick={onClose}>
                HOW IT WORKS
              </Link>
            </div>
            <hr className="modal-divider" />
          </>
        ) : (
          <>
            <div className="user-profile-header">
              <div className="user-profile-info">
                <div className="profile-icon-placeholder">
                  <FontAwesomeIcon icon={faUser} />{" "}
                </div>
                <div className="username-section">
                  <h3 className="username">{auth.user.username}</h3>
                  <Link to="/edit-profile" className="edit-profile-link">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
            <hr className="modal-divider" />
            <div className="sidebar-links">
              <div className="sidebar-chat">
                <Link to="/chat">CHAT</Link>
              </div>
              <hr className="modal-divider" />
              <div className="sidebar-trips">
                <Link to="/my-trips">MY TRIPS</Link>
                <Link to="/create-trip">CREATE A TRIP</Link>
              </div>
              <hr className="modal-divider" />
              <div className="sidebar-personal">
                <Link to="/personal-info">PERSONAL INFORMATION</Link>
                <Link to="/notification-settings">NOTIFICATION SETTINGS</Link>
                <Link to="/payments">PAYMENTS & PAYOUTS</Link>
              </div>
              <hr className="modal-divider" />
              <div className="sidebar-extra">
                <Link to="/refer">REFER & GET A PHONE</Link>
                <Link to="/partner-offers">PARTNER OFFERS</Link>
                <Link to="/help-faq">HELP & FAQ</Link>
              </div>
              <hr className="modal-divider" />

              <button onClick={handleLogout} className="sidebar-btn">
                Sign Out
              </button>
            </div>
          </>
        )}

        <div className={`sidebar-footer ${auth?.user ? "active" : ""}`}>
          <Link to="#">Currency: € EUR</Link>
          <Link to="#">Language: English</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
