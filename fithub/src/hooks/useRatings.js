import { useState, useEffect } from 'react';
import { apiCall } from '../utils/api.js';
import { useAuthContext } from '../context/AuthContext.jsx';

export function useRatings(teamId) {
  const { user } = useAuthContext();
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(`/ratings/${teamId}`);
      // Backend returns aggregate format: {"_avg":{"numStars":4}}
      const avgRating = data?._avg?.numStars || 0;
      setAverageRating(Math.round(avgRating));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchRatings();
    }
  }, [teamId]);

  const submitRating = async (numStars) => {
    try {
      setLoading(true);
      setError(null);
      await apiCall('/ratings', {
        method: 'POST',
        body: { teamId, numStars, userId: user?.id },
      });
      setError(null);
      return { success: true };
    } catch (err) {
      // Handle unique constraint error (user already rated)
      const errorMessage = err.message || '';
      const errorDetails = JSON.stringify(err.details || '');

      if (errorMessage.includes('Unique constraint failed') || errorMessage.includes('P2002') || errorDetails.includes('Unique constraint failed') || errorDetails.includes('P2002')) {
        const message = 'You already rated this class';
        setError(message);
        await fetchRatings(); // Refresh to update the UI
        return { success: false, error: message };
      }

      const message = errorMessage || 'Failed to submit rating';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (ratingId) => {
    try {
      setLoading(true);
      setError(null);
      await apiCall(`/ratings/${ratingId}`, { method: 'DELETE' });
      await fetchRatings();
      return { success: true };
    } catch (err) {
      const message = err.message || 'Failed to delete rating';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    return averageRating;
  };

  return {
    averageRating,
    loading,
    error,
    submitRating,
    getAverageRating,
    refetchRatings: fetchRatings,
  };
}
