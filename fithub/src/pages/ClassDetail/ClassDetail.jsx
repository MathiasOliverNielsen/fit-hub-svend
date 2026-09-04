import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch, useBookings, useRatings } from "../../hooks";
import { useAuthContext } from "../../context/AuthContext";
import { apiCall } from "../../utils";
import { TrainerCard, HeroSection, ConfirmModal, RatingSection } from "../../components";
import "./ClassDetail.scss";

export function ClassDetail() {
  const { id } = useParams();
  const { data: classData, isLoading } = useFetch(`/teams/${id}`);
  const { isAuthenticated } = useAuthContext();
  const { isEnrolledInClass, getBookingId, signUpForClass, leaveClass, loading: bookingLoading } = useBookings();
  const { averageRating, submitRating, loading: ratingLoading, error: ratingError } = useRatings(parseInt(id));
  const [trainer, setTrainer] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    if (classData?.userId) {
      apiCall(`/users/${classData.userId}`)
        .then(data => setTrainer(data))
        .catch(err => console.error("Error fetching trainer details:", err));
    }
  }, [classData?.userId]);

  const handleSignUp = async () => {
    const result = await signUpForClass(parseInt(id));
    if (!result.success) {
      console.error("Sign up failed:", result.error);
    }
  };

  const handleLeaveClick = () => {
    setShowLeaveModal(true);
  };

  const handleConfirmLeave = async () => {
    const bookingId = getBookingId(parseInt(id));
    if (bookingId) {
      const result = await leaveClass(bookingId);
      if (result.success) {
        setShowLeaveModal(false);
      }
    }
  };

  if (isLoading) return <div className="class-detail-page">Loading...</div>;
  if (!classData) return <div className="class-detail-page">Class not found</div>;

  const getRandomHeight = () => {
    return Math.random() * 100 + 150;
  };

  const isEnrolled = isEnrolledInClass(parseInt(id));

  return (
    <div className="class-detail-page">
      <HeroSection image={classData.image?.url} height="50vh">
        <div className="class-hero-content">
          <h1 className="class-detail-title">{classData.name}</h1>
          {isAuthenticated && (
            <button
              className="signup-button"
              onClick={isEnrolled ? handleLeaveClick : handleSignUp}
              disabled={bookingLoading}
            >
              {bookingLoading ? "Loading..." : isEnrolled ? "Leave" : "Sign up"}
            </button>
          )}
        </div>
      </HeroSection>

      <ConfirmModal
        isOpen={showLeaveModal}
        title="Leave Class"
        message="Are you sure you want to leave this class?"
        confirmText="Leave"
        cancelText="Cancel"
        onConfirm={handleConfirmLeave}
        onCancel={() => setShowLeaveModal(false)}
        loading={bookingLoading}
      />

      <div className="class-detail-card">
        <RatingSection
          teamId={parseInt(id)}
          averageRating={averageRating}
          onSubmitRating={submitRating}
          isAuthenticated={isAuthenticated}
          isLoading={ratingLoading}
          error={ratingError}
        />
        <section className="schedule-section">
          <h2 className="schedule-title">Schedule</h2>
          <div className="schedule-info">
            <span className="schedule-day">{classData.day}</span>
            <span className="schedule-time">{classData.time}</span>
          </div>
          <p className="class-description">{classData.description}</p>
        </section>

        <section className="trainer-section">
          <TrainerCard trainer={trainer || classData.user} height={`${getRandomHeight()}px`} />
        </section>
      </div>
    </div>
  );
}
