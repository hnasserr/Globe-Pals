import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileModal = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/cozoprojects/image/upload/v1725276676/logo_2_sgfl41.jpg"
            alt="app-logo"
            className="logo-img"
          />
        </Link>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <div className="navbar-links">
          <Link to="/all-trips" onClick={toggleMenu}>
            All Trips
          </Link>

          <Link to="/how-it-works" onClick={toggleMenu}>
            How It Works
          </Link>
        </div>
      </div>

      <div className="navbar-auth">
        <Link to="/signup" className="signup-button">
          Sign Up
        </Link>

        <FontAwesomeIcon
          className="profile-icon"
          icon={faUser}
          onClick={toggleProfileModal}
        />

        <ProfileModal isOpen={isProfileOpen} onClose={toggleProfileModal} />

        <button className="logout-button">Logout</button>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
