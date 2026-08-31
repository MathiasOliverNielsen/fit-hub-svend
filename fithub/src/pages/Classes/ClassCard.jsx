import "./ClassCard.scss";

export function ClassCard({ image, name, instructor, rating = 5, variant = "default" }) {
  return (
    <div className={`class-card class-card-${variant}`}>
      <img src={image} alt={name} className="class-card-image" />
      <div className="class-card-content">
        <h3 className="class-card-name">{name}</h3>

        {variant === "carousel" && <div className="class-card-rating">{"⭐".repeat(rating)}</div>}
      </div>
    </div>
  );
}
