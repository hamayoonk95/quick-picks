import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Filter-search.css";
import CircleLoader from "react-spinners/CircleLoader";

const FilterSearch = () => {
  const [mood, setMood] = useState("happy");
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [ratings, setRatings] = useState("9");
  const [occassion, setOccassion] = useState("alone");
  const [releaseDate, setReleaseDate] = useState("2020-2023");
  const [loading, setLoading] = useState(false);
  let id;

  const getMovie = async (mood, timeOfDay, ratings, occassion) => {
    const response = await fetch(
      `/filter-movies?mood=${mood}&timeOfDay=${timeOfDay}&ratings=${ratings}&occassion=${occassion}&releaseDate=${releaseDate}`
    );
    const movie = await response.json();
    id = movie.id;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    getMovie(mood, timeOfDay, ratings, occassion).then(() => {
     navigate(`/movie/${id}`);
    });
  };


  return (
    <div className="form-container">
      <h1>Movie Recommendation Form</h1>
      {loading ? (
        <div className="loader-container">
          <CircleLoader className="loader" size={40} color="#0e3a76" />
          <p>Searching...</p>
        </div>
      ) : (
        <form className="filter-search-form" onSubmit={handleSubmit}>
          <label htmlFor="mood">What is your current mood?</label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="relaxed">Relaxed</option>
          </select>
          <br />
          <label htmlFor="timeofday">What is the time of day?</label>
          <select
            id="timeofday"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="late">Late Night</option>
          </select>
          <br />
          <label htmlFor="occassion">What is the occasion?</label>
          <select
            id="occassion"
            value={occassion}
            onChange={(e) => setOccassion(e.target.value)}
          >
            <option value="alone">Alone</option>
            <option value="couple">Couples night</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
          </select>
          <br />
          <label htmlFor="rating">Minimum movie rating:</label>
          <select
            id="rating"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
          >
            <option value="9">&gt; 9</option>
            <option value="8">&gt; 8</option>
            <option value="7">&gt; 7</option>
            <option value="6">&gt; 6</option>
            <option value="0">Any</option>
          </select>
          <br />
          <label htmlFor="rating">Release Date:</label>
          <select
            id="release"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          >
            <option value="2020-2023">2020-Present</option>
            <option value="2010-2019">2010-2019</option>
            <option value="2000-2009">2000-2009</option>
            <option value="1990-1999">1990-1999</option>
            <option value="1980-1989">1980-1989</option>
            <option value="1950-2023">Any</option>
          </select>
          <br />
          <button className="submit">Search</button>
        </form>
      )}
    </div>
  );
};

export default FilterSearch;
