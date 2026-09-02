import "./HeroSection.scss";

export function HeroSection({ image, children, height = "50vh" }) {
  return (
    <div className="hero-section" style={{ height }}>
      <img src={image} alt="Hero" className="hero-image" />
      {children && <div className="hero-content">{children}</div>}
    </div>
  );
}
