import { useNavigate } from "react-router-dom";
import { Box, FlexContainer } from "../../components";
import "./ClassCard.scss";

export function ClassCard({ id, image, name, instructor, rating = 5, variant = "default" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/classes/${id}`);
    }
  };

  if (variant === "hero") {
    return (
      <Box className={`class-card class-card-${variant}`} onClick={handleClick} style={{ cursor: id ? "pointer" : "default", position: "relative" }}>
        <img src={image} alt={name} className="class-card-image" />
        <h3 className="class-card-name">{name}</h3>
      </Box>
    );
  }

  return (
    <Box className={`class-card class-card-${variant}`} onClick={handleClick} style={{ cursor: id ? "pointer" : "default" }}>
      <img src={image} alt={name} className="class-card-image" />
      <FlexContainer direction="column" className="class-card-content" gap={0}>
        <h3 className="class-card-name">{name}</h3>

        {variant === "carousel" && (
          <div className="class-card-rating">
            <div className="rating-stars">{"⭐".repeat(rating)}</div>
          </div>
        )}
      </FlexContainer>
    </Box>
  );
}
