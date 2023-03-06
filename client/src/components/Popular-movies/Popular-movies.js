import React from "react";
import "./Popular-movies.css";
import { useNavigate } from "react-router-dom";

// destructure props to extract necessary movie information
const PopularMovies = ({ title, poster_path, release_date, id }) => {
  // initialise navigation function using the useNavigate hook
  const navigate = useNavigate();
  // returns the movie component with an onClick event that navigates to movie details page
  return (
    <div
      data-testid="popular-component"
      className="movie"
      onClick={() => navigate(`/movie/${id}`)}
      aria-label={`${title}`}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/movie/${id}`)
        }
      }}
    >
      {/* Render an image of the movie poster with alt text */}
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
      />
      {/* Display the movie title and release year */}
      <div className="movie-info">
        <div className="movie-title">{title}</div>
        <div className="movie-year">{release_date}</div>
      </div>
    </div>
  );
};

export default PopularMovies;
