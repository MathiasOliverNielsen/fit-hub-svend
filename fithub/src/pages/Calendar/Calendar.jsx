import { useState } from "react";
import { Card } from "../../components";
import "./Calendar.scss";

export function Calendar() {
  const [events, setEvents] = useState([]);

  return (
    <div className="calendar-page">
      <h1>Calendar page</h1>
    </div>
  );
}
