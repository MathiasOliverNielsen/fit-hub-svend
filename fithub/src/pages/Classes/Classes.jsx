import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks";
import { apiCall } from "../../utils";
import { ClassCard } from "./ClassCard";
import { HeroSection } from "../../components";
import "./Classes.scss";

export function Classes() {
  const navigate = useNavigate();
  const { data, isLoading } = useFetch("/teams", { cache: true });
  const teams = data || [];
  const [teamRatings, setTeamRatings] = useState({});

  useEffect(() => {
    const fetchRatingsForTeams = async () => {
      const ratings = {};
      for (const team of teams) {
        try {
          const data = await apiCall(`/ratings/${team.id}`);
          // Backend returns aggregate format: {"_avg":{"numStars":4}}
          ratings[team.id] = data?._avg?.numStars || 0;
        } catch (err) {
          ratings[team.id] = 0;
        }
      }
      setTeamRatings(ratings);
    };

    if (teams.length > 0) {
      fetchRatingsForTeams();
    }
  }, [teams]);

  const getAverageRating = (teamId) => {
    return Math.round(teamRatings[teamId] || 0);
  };

  const featuredTeam = useMemo(() => {
    if (teams.length > 0) {
      return teams[Math.floor(Math.random() * teams.length)];
    }
    return null;
  }, [teams.length]);

  if (isLoading) return <div className="classes-page">Loading...</div>;

  const handleFeaturedClick = () => {
    if (featuredTeam?.id) {
      navigate(`/classes/${featuredTeam.id}`);
    }
  };

  return (
    <main className="classes-page">
      {featuredTeam && (
        <section className="hero-section" onClick={handleFeaturedClick} style={{ cursor: "pointer" }}>
          <h2 className="section-title">Popular Classes</h2>
          <HeroSection image={featuredTeam.image.url} height="calc(60vh - 60px)">
            <h3 className="featured-class-name">{featuredTeam.name}</h3>
          </HeroSection>
        </section>
      )}

      <section className="carousel-section">
        <h2 className="section-title">Classes for you</h2>
        <div className="carousel-container">
          {teams.map((team) => (
            <ClassCard
              key={team.id}
              id={team.id}
              image={team.image.url}
              name={team.name}
              rating={getAverageRating(team.id)}
              variant="carousel"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
