import React from "react";
import "./Movie.css";

const Movie = (props) => {
    const words = props.overview.split(" ");
    const reducedWords = words.slice(0, 40);
    const reducedDescription = reducedWords.join(" ");
  return (
    <div className="m-movie">
    <div className="m-poster-container">
      <img
        className="m-poster"
        src={"https://image.tmdb.org/t/p/original/" + props.poster_path}
        alt={props.title}
      />
      </div>
      <div className="m-info">
      <div className="m-title">
        {props.title} ({props.release_date.substring(0, 4)})
      </div>
      <div className="m-rating">{props.vote_average}</div>
      <div className="m-genre">{props.genres}</div>
      <div className="m-overview">{reducedDescription} {words.length > 40 && "..."}</div>
      </div>
    </div>
  );
};

export default Movie;
