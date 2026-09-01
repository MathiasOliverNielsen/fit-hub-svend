import { Box, FlexContainer } from "../../components";
import "./ClassCard.scss";

export function ClassCard({ image, name, instructor, rating = 5, variant = "default" }) {
  return (
    <Box className={`class-card class-card-${variant}`}>
      <img src={image} alt={name} className="class-card-image" />
      <FlexContainer direction="column" className="class-card-content" gap={0}>
        <h3 className="class-card-name">{name}</h3>

        {variant === "carousel" && <div className="class-card-rating">{"⭐".repeat(rating)}</div>}
      </FlexContainer>
    </Box>
  );
}
