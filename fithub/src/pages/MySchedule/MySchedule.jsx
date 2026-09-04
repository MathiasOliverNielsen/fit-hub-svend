import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useBookings } from "../../hooks";
import { apiCall } from "../../utils";
import "./MySchedule.scss";

export function MySchedule() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { bookings, loading } = useBookings();
  const [scheduleItems, setScheduleItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    const fetchScheduleItems = async () => {
      try {
        setItemsLoading(true);
        const items = await Promise.all(
          bookings.map(async (booking) => {
            const teamData = await apiCall(`/teams/${booking.teamId}`);
            return {
              id: booking.id,
              teamId: booking.teamId,
              name: teamData.name,
              day: teamData.day,
              time: teamData.time,
            };
          }),
        );
        setScheduleItems(items);
      } catch (err) {
        console.error("Error fetching schedule items:", err);
      } finally {
        setItemsLoading(false);
      }
    };

    if (bookings.length > 0) {
      fetchScheduleItems();
    } else {
      setScheduleItems([]);
      setItemsLoading(false);
    }
  }, [bookings]);

  const handleClassClick = (teamId) => {
    navigate(`/classes/${teamId}`);
  };

  return (
    <main className="my-schedule-page">
      <div className="schedule-header">
        <h1>My Schedule</h1>
        <p className="welcome-message">Welcome back, {user?.name || "User"}</p>
      </div>

      <section className="schedule-list">
        {itemsLoading || loading ? (
          <p className="loading">Loading your schedule...</p>
        ) : scheduleItems.length > 0 ? (
          <div className="schedule-items">
            {scheduleItems.map((item) => (
              <div key={item.id} className="schedule-item" onClick={() => handleClassClick(item.teamId)}>
                <div className="schedule-item-time">
                  <span className="schedule-item-day">{item.day}</span>
                  <span className="schedule-item-clock">{item.time}</span>
                </div>
                <h3 className="schedule-item-name">{item.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-schedule">
            <p>You haven't signed up for any classes yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
