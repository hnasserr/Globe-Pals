import React from "react";
import { Link } from "react-router-dom";

interface BurgerMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenuModal: React.FC<BurgerMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`brgr-modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="brgr-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="brgr-modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="brgr-modal-body">
          <h3>
            Start chatting with like-minded travelers and planning your next big
            trip.
          </h3>
          <Link to="/login" className="brgr-btn-login">
            Log In
          </Link>
          <p>or still need to join?</p>
          <Link to="/signup" className="brgr-btn-signup">
            Sign Up
          </Link>
        </div>

        <div className="brgr-modal-links">
          <Link to="/all-trips">All Trips</Link>
          <Link to="/how-it-works">How It Works</Link>
        </div>

        <div className="brgr-modal-footer">
          <Link to="/help">Help & FAQ</Link>
          <Link to="/currency">Currency: € EUR</Link>
          <Link to="/language">Language: English</Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenuModal;
