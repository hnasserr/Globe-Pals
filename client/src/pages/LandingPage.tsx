import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const navigateTo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate("/all-trips");
  };
  return (
    <div className="hero-background">
      <div className="hero-content">
        <h1 className="hero-title">Discover Your Next Adventure</h1>
        <p className="hero-description">
          Find and connect with like-minded travelers and make your trip
          unforgettable!
        </p>
        <button className="hero-button" onClick={navigateTo}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
