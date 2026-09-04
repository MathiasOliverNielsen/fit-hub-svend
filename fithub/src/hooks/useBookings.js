import { useState, useEffect } from "react";
import { apiCall } from "../utils/api.js";

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall("/bookings");
      setBookings(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const signUpForClass = async (teamId) => {
    try {
      setLoading(true);
      setError(null);
      await apiCall("/bookings", {
        method: "POST",
        body: { teamId },
      });
      await fetchBookings();
      return { success: true };
    } catch (err) {
      const message = err.message || "Failed to sign up";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const leaveClass = async (bookingId) => {
    try {
      setLoading(true);
      setError(null);
      await apiCall(`/bookings/${bookingId}`, { method: "DELETE" });
      await fetchBookings();
      return { success: true };
    } catch (err) {
      const message = err.message || "Failed to leave class";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const isEnrolledInClass = (teamId) => {
    return bookings.some((booking) => booking.teamId === teamId);
  };

  const getBookingId = (teamId) => {
    const booking = bookings.find((booking) => booking.teamId === teamId);
    return booking?.id;
  };

  return {
    bookings,
    loading,
    error,
    signUpForClass,
    leaveClass,
    isEnrolledInClass,
    getBookingId,
    refetchBookings: fetchBookings,
  };
}
