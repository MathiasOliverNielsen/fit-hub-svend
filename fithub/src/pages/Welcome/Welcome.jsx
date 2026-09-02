import { useNavigate } from "react-router-dom";
import { HeroSection } from "../../components";
import "./Welcome.scss";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <HeroSection image="/imgs/WorkoutUpper.svg" height="50vh">
        <div className="welcome-text">
          <h1>
            Believe <br /> Yourself
          </h1>
          <h2>
            <strong></strong> Train like a pro
          </h2>
        </div>
      </HeroSection>

      <HeroSection image="/imgs/WorkoutLower.png" height="50vh">
        <button onClick={() => navigate("/home")} className="start-button" style={{ position: 'absolute', bottom: '20%', right: '-5%' }} aria-label="Start training now">
          Start training
        </button>
      </HeroSection>
    </main>
  );
}
