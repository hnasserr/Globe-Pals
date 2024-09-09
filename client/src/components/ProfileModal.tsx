import React from "react";
import { Link } from "react-router-dom";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="modal-body">
          <h3>
            Start chatting with like-minded travelers and planning your next big
            trip.
          </h3>
          <Link to="/login" className="btn-login">
            Log In
          </Link>
          <p>or still need to join?</p>
          <Link to="/signup" className="btn-signup">
            Sign Up
          </Link>
        </div>
        <div className="modal-footer">
          <Link to="/help">Help & FAQ</Link>
          <Link to="/currency">Currency: € EUR</Link>
          <Link to="/language">Language: English</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
