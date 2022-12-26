import React from "react";
import './Popular-movies.css'

const PopularMovies = ({ original_title, backdrop_path, release_date }) => {

  return (
    <div className="movie">
      <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={original_title} />
      <div className="movie-info">
        <div className="movie-title">{original_title}</div>
        <div className="movie-year">{release_date}</div>
      </div>
    </div>
  );
};


export default PopularMovies;