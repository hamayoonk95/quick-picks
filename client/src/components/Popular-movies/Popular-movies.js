import React from "react";
import './Popular-movies.css';
import { useNavigate } from "react-router-dom";

const PopularMovies = ({ title, poster_path, release_date, vote_average, overview, genres, id }) => {
  const navigate = useNavigate();
  // const state = {title, poster_path, release_date, vote_average,overview, genres, id};
  return (
    <div className="movie" onClick={() => navigate(`/movie/${id}`)}>
      <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      <div className="movie-info">
        <div className="movie-title">{title}</div>
        <div className="movie-year">{release_date}</div>
      </div>
    </div>
  );
};


export default PopularMovies;