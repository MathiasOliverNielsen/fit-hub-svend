import { useState, useMemo, useEffect } from "react";
import { useFetch } from "../../hooks";
import { ClassCard } from "../Classes/ClassCard";
import { TrainerCard } from "../../components";
import { apiCall } from "../../utils";
import { validateNoScriptTags } from "../../utils/validation";
import "./Search.scss";

const getRandomHeight = () => {
  return Math.random() * 100 + 150;
};

export function Search() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [classResults, setClassResults] = useState([]);
  const [trainerResults, setTrainerResults] = useState([]);
  const [randomTrainers, setRandomTrainers] = useState([]);

  const { data: allTeams } = useFetch("/teams", { cache: true });
  const { data: userIds } = useFetch("/users", { cache: true });

  const teams = allTeams || [];
  const users = userIds || [];
  const [teamRatings, setTeamRatings] = useState({});

  const getAverageRating = (teamId) => {
    return Math.round(teamRatings[teamId] || 0);
  };

  const fetchRatingsForTeams = async (teamIds) => {
    const ratings = {};
    for (const teamId of teamIds) {
      try {
        const data = await apiCall(`/ratings/${teamId}`);
        // Backend returns aggregate format: {"_avg":{"numStars":4}}
        ratings[teamId] = data?._avg?.numStars || 0;
      } catch (err) {
        ratings[teamId] = 0;
      }
    }
    setTeamRatings(ratings);
  };

  // Fetch individual trainers by ID and ratings for all teams
  useEffect(() => {
    if (userIds && userIds.length > 0) {
      const selectedIds = userIds
        .filter((u) => u.id !== 1)
        .map((u) => u.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      Promise.all(selectedIds.map((id) => apiCall(`/users/${id}`)))
        .then((trainers) => setRandomTrainers(trainers))
        .catch((err) => console.error("Error fetching trainers:", err));
    }

    if (teams.length > 0) {
      fetchRatingsForTeams(teams.map((t) => t.id));
    }
  }, [userIds, teams.length]);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && query.trim() && validateNoScriptTags(query)) {
      const searchLower = query.toLowerCase();

      const filteredTeams = teams.filter((team) => {
        const name = team?.name?.toLowerCase() || "";
        const userName = team?.user?.name?.toLowerCase() || "";
        const userDesc = team?.user?.description?.toLowerCase() || "";
        return name.includes(searchLower) || userName.includes(searchLower) || userDesc.includes(searchLower);
      });

      // Filter by name first, exclude admin (id 1), then fetch individual details for descriptions
      const filteredUserIds = users
        .filter((user) => {
          const name = user?.name?.toLowerCase() || "";
          return user.id !== 1 && name.includes(searchLower);
        })
        .map((u) => u.id);

      // Fetch full user details to get descriptions
      const filteredUsersFull = await Promise.all(filteredUserIds.map((id) => apiCall(`/users/${id}`))).catch((err) => {
        console.error("Error fetching trainer details:", err);
        return [];
      });

      // Fetch ratings for search results
      await fetchRatingsForTeams(filteredTeams.map((t) => t.id));

      setClassResults(filteredTeams);
      setTrainerResults(filteredUsersFull);
      setHasSearched(true);
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-header">
        <h1>Search</h1>
        <p className="search-subtitle">Enter a keyword and press enter</p>
      </div>

      <div className="search-input-wrapper">
        <img src="/imgs/Search.svg" alt="Search" className="search-icon" />
        <input type="text" className="search-input" placeholder="Search classes or trainers..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={handleSearch} autoFocus />
      </div>

      {hasSearched ? (
        <>
          {classResults.length === 0 && trainerResults.length === 0 ? (
            <div className="no-results">
              <p>Your search did not give any results. Try to search for something else.</p>
            </div>
          ) : (
            <>
              {classResults.length > 0 && (
                <div className="results-section">
                  <h2 className="section-title">Classes</h2>
                  <div className="classes-list">
                    {classResults.map((team) => (
                      <ClassCard key={team.id} id={team.id} image={team.image.url} name={team.name} instructor={team.user.name} rating={getAverageRating(team.id)} variant="carousel" />
                    ))}
                  </div>
                </div>
              )}

              {trainerResults.length > 0 && (
                <div className="results-section">
                  <h2 className="section-title">Trainers</h2>
                  <div className="trainers-grid">
                    {trainerResults.map((trainer) => (
                      <TrainerCard key={trainer.id} trainer={trainer} height={`${getRandomHeight()}px`} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="results-section">
            <h2 className="section-title">Public classes</h2>
            <div className="classes-list">
              {teams.map((team) => (
                <ClassCard key={team.id} id={team.id} image={team.image.url} name={team.name} instructor={team.user.name} rating={getAverageRating(team.id)} variant="carousel" />
              ))}
            </div>
          </div>

          <div className="results-section">
            <h2 className="section-title">Popular trainers</h2>
            <div className="trainers-grid">
              {randomTrainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} height={`${getRandomHeight()}px`} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
