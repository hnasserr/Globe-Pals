import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useState, useContext } from "react";
import ProfileModal from "./ProfileModal";
import Sidebar from "./SideBar";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const auth = useContext(AuthContext); // Access the auth context

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileModal = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    auth?.logout(); // Trigger logout function from AuthContext
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

      <div className="navbar-links">
        <NavLink
          to="/all-trips"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          All Trips
        </NavLink>
        <NavLink
          to="/how-it-works"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          How It Works
        </NavLink>
      </div>

      <div className="navbar-auth">
        {!auth?.user ? ( // If no user is logged in, show Sign Up button
          <>
            <Link to="/signup" className="signup-button">
              Sign Up
            </Link>
            <FontAwesomeIcon
              className="profile-icon"
              icon={faUser}
              onClick={toggleProfileModal}
            />
            <ProfileModal isOpen={isProfileOpen} onClose={toggleProfileModal} />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              className="profile-icon"
              icon={faUser}
              onClick={toggleProfileModal}
            />
            <ProfileModal isOpen={isProfileOpen} onClose={toggleProfileModal} />

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      {menuOpen && <Sidebar isOpen={menuOpen} onClose={toggleMenu} />}

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default NavBar;
