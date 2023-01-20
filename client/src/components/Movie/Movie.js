import React from "react";
import "./Movie.css";
import noimage from "../../assets/no-image.png";

const Movie = (props) => {
  const words = props.overview.split(" ");
  const reducedWords = words.slice(0, 50);
  const reducedDescription = reducedWords.join(" ");
  return (
    <div className="movie-card">
      <div className="m-poster-container">
        <img
          className="m-poster"
          src={
            props.poster_path
              ? "https://image.tmdb.org/t/p/original/" + props.poster_path
              : noimage
          }
          alt={props.title}
        />
      </div>
      <div className="m-info-container">
        <div className="m-title-rating">
          <div className="m-title">
            {props.title} ({props.release_date})
          </div>
          <div className="m-rating">{props.vote_average}</div>
        </div>
        <div className="m-genre">{props.genres.split("-").join(", ")}</div>
        <div className="m-description">
          {props.overview}
        </div>
      </div>
    </div>
  );
};

export default Movie;
