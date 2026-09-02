import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks";
import { ClassCard } from "./ClassCard";
import { HeroSection } from "../../components";
import "./Classes.scss";

export function Classes() {
  const navigate = useNavigate();
  const { data, isLoading } = useFetch("/teams", { cache: true });
  const teams = data || [];

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
            <ClassCard key={team.id} id={team.id} image={team.image.url} name={team.name} rating={5} variant="carousel" />
          ))}
        </div>
      </section>
    </main>
  );
}
