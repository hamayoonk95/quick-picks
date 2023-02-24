import React from "react";
import "./Movie.css";
import noimage from "../../assets/no-image.png";

const Movie = ({poster_path, title, release_date, vote_average, genres, overview}) => {
  
  // Render movie card on movie page
  return (
    // movie card container
    <div className="movie-card">
      <div className="m-poster-container">
      {/* Render movie poster, if no poster then render no-Image from assets */}
        <img
          className="m-poster"
          src={
            poster_path
              ? "https://image.tmdb.org/t/p/original/" + poster_path
              : noimage
          }
          alt={title + " poster"}
        />
      </div>
      {/* Movie information container */}
      <div className="m-info-container">
      {/* Movie title and rating container */}
        <div className="m-title-rating">
          <div className="m-title">
            {title} ({release_date})
          </div>
          <div className="m-rating">{vote_average}</div>
        </div>
        {/* Movie genre container */}
        <div className="m-genre">{genres.split("-").join(", ")}</div>
        {/* Movie description container */}
        <div className="m-description">
          {overview}
        </div>
      </div>
    </div>
  );
};

export default Movie;
