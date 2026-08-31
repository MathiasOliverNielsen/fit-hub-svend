import { useNavigate } from "react-router-dom";
import "./Welcome.scss";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <section className="welcome-top">
        <figure className="welcome-figure">
          <img src="/imgs/WorkoutUpper.svg" alt="Fitness training motivation" className="workout-image" />
          <figcaption className="welcome-text">
            <h1>
              Believe <br /> Yourself
            </h1>
            <h2>
              <strong></strong> Train like a pro
            </h2>
          </figcaption>
        </figure>
      </section>

      <section className="welcome-bottom">
        <figure className="welcome-figure">
          <img src="/imgs/WorkoutLower.png" alt="Ready to start your fitness journey" className="workout-image" />
        </figure>
        <button onClick={() => navigate("/home")} className="start-button" aria-label="Start training now">
          Start training
        </button>
      </section>
    </main>
  );
}
