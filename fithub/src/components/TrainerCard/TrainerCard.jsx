import "./TrainerCard.scss";

export function TrainerCard({ trainer, height = "180px" }) {
  return (
    <div className="trainer-card" style={{ height }}>
      <img src={trainer?.image?.url || "/imgs/placeholder.svg"} alt={trainer?.name} className="trainer-image" />
      <div className="trainer-info">
        <h3 className="trainer-name">{trainer?.name}</h3>
        <p className="trainer-description">{trainer?.description}</p>
      </div>
    </div>
  );
}
