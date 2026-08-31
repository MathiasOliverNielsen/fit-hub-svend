import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components";
import "./ClassDetail.scss";

export function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch class details from API
    setLoading(false);
  }, [id]);

  if (loading) return <div className="class-detail-page">Loading...</div>;
  if (!classData) return <div className="class-detail-page">Hold ikke fundet</div>;

  return (
    <div className="class-detail-page">
      <h1>Class Detail page</h1>
    </div>
  );
}
