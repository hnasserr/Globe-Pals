import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const auth = useContext(AuthContext);

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
            <div className="sidebar-modal">
              <h3>
                Start chatting with like-minded travelers and planning your next
                big trip.
              </h3>
              <Link to="/login" className="btn-login">
                Log In
              </Link>
              <p>or still need to join?</p>
              <Link to="/signup" className="btn-signup">
                Sign Up
              </Link>
            </div>
          </>
        ) : (
          "hello"
        )}

        <div className="sidebar-links">
          <Link to="/all-trips" onClick={onClose}>
            All Trips
          </Link>
          <Link to="/how-it-works" onClick={onClose}>
            How It Works
          </Link>
        </div>

        <div className="sidebar-footer">
          <Link to="/how-it-works">Help & FAQ</Link>
          <Link to="#">Currency: € EUR</Link>
          <Link to="#">Language: English</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
