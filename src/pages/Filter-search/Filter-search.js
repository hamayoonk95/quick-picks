import React, { useState } from "react";
import getMovies from '../../api/getMovies';
import { useNavigate } from 'react-router-dom';

const FilterSearch = () => {
  const [mood, setMood] = useState("happy");
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [ratings, setRatings] = useState("9");
  const [occassion, setOccassion] = useState("couple");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const movie = await getMovies(mood, timeOfDay, ratings, occassion);
    const {poster_path, title, release_date, overview,vote_average, genre} = movie;
    const state = {poster_path, title, release_date, overview, vote_average, genre};
    navigate('/movie-page', {state} );
  };

  return (
    <>
      <h1>Movie Recommendation Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mood">Mood:</label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="excited">Excited</option>
          <option value="relaxed">Relaxed</option>
        </select><br />
        <label htmlFor="timeofday">Time of Day:</label>
        <select
          id="timeofday"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="late">Late Night</option>
        </select><br />
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={ratings}
          onChange={(e) => setRatings(e.target.value)}
        >
          <option value="9">&gt; 9</option>
          <option value="8">&gt; 8</option>
          <option value="7">&gt; 7</option>
          <option value="any">Any</option>
        </select><br />
        <label htmlFor="occassion">Mood:</label>
        <select
          id="occassion"
          value={occassion}
          onChange={(e) => setOccassion(e.target.value)}
        >
          <option value="couple">Couples night</option>
          <option value="friends">Friends</option>
          <option value="family">Family</option>
        </select><br />
        <button>Submit</button>
      </form>
    </>
  );
};

export default FilterSearch;
