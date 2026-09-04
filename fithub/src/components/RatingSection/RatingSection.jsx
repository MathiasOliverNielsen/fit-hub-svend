import { useState } from "react";
import "./RatingSection.scss";

export function RatingSection({ teamId, averageRating, onSubmitRating, isAuthenticated, isLoading, error }) {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleSubmit = async () => {
    if (selectedStars > 0) {
      const result = await onSubmitRating(selectedStars);
      if (result.success) {
        setSelectedStars(0);
      }
    }
  };

  return (
    <section className="rating-section">
      <div className="rating-header">
        <h2 className="rating-title">Ratings</h2>
        <p className="rating-count">
          {"⭐".repeat(averageRating)} {averageRating > 0 ? averageRating : "No ratings yet"}
        </p>
      </div>

      {isAuthenticated && (
        <div className="rating-form">
          <p className="rating-prompt">Rate this class</p>
          <div className="star-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className={`star-button ${selectedStars >= star ? "active" : ""}`} onClick={() => setSelectedStars(star)} disabled={isLoading}>
                ⭐
              </button>
            ))}
          </div>
          <button className="submit-rating-button" onClick={handleSubmit} disabled={selectedStars === 0 || isLoading}>
            {isLoading ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      )}

      {!isAuthenticated && <p className="login-to-rate">Log in to rate this class</p>}

      {error && <p className="rating-error">{error}</p>}
    </section>
  );
}
