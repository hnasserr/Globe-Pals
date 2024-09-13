import React, { useContext, useEffect, useState } from "react";
import { baseURL } from "../utils/baseURL";
import { Trip } from "../@types";
import { AuthContext } from "../context/AuthContext";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trips: React.FC = () => {
  const { token, loading } = useContext(AuthContext);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      // if (!token) {
      //   setError("Unauthorized: Token is missing.");
      //   setLoadingTrips(false);
      //   return;
      // }

      try {
        const response = await fetch(`${baseURL}/api/trips/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Invalid token.");
          }
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        setTrips(data.trips);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingTrips(false);
      }
    };

    // Wait until the auth context is done loading
    if (!loading) {
      fetchTrips();
    }
  }, [token, loading]);

  if (loading || loadingTrips) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Slider settings for React-Slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="trips-page">
      <h1 className="trips-title">Explore Our Trips</h1>
      <div className="trips-grid">
        {trips &&
          trips.map((trip) => (
            <div key={trip._id} className="trip-card">
              <div className="trip-image">
                {/* Use Slider for trip media images */}
                <Slider {...sliderSettings}>
                  {trip.media.photos && trip.media.photos.length > 0 ? (
                    trip.media.photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          src={photo.url}
                          alt={`Image ${index + 1} of ${trip.title}`}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="no-photo">No photo available</div>
                  )}
                </Slider>
              </div>
              <div className="trip-info">
                <h2 className="trip-title">{trip.title}</h2>
                <p className="trip-description">{trip.description}</p>
                <div className="trip-details">
                  <span className="trip-price">
                    ${trip.budget.totalCost.total}
                  </span>
                  <span className="trip-duration">
                    {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trips;
