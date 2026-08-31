import { useState } from "react";
import { Link } from "react-router-dom";
import { InputField, Card, Button } from "../../components";
import "./Search.scss";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    // TODO: Implement search logic
  };

  return (
    <div className="search-page">
      <h1>Search page</h1>
    </div>
  );
}
