import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks";
import { apiCall } from "../../utils";
import { TrainerCard, HeroSection } from "../../components";
import "./ClassDetail.scss";

export function ClassDetail() {
  const { id } = useParams();
  const { data: classData, isLoading } = useFetch(`/teams/${id}`);
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    if (classData?.userId) {
      apiCall(`/users/${classData.userId}`)
        .then(data => setTrainer(data))
        .catch(err => console.error("Error fetching trainer details:", err));
    }
  }, [classData?.userId]);

  if (isLoading) return <div className="class-detail-page">Loading...</div>;
  if (!classData) return <div className="class-detail-page">Class not found</div>;

  const getRandomHeight = () => {
    return Math.random() * 100 + 150;
  };

  return (
    <div className="class-detail-page">
      <HeroSection image={classData.image?.url} height="50vh">
        <h1 className="class-detail-title">{classData.name}</h1>
      </HeroSection>

      <div className="class-detail-card">
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
