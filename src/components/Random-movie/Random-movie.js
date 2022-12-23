import React from "react";
import "./Random-movie.css";
import { FaRandom } from 'react-icons/fa';

const RandomMovie = ({ posterUrl, title, rating, description }) => {
    const words = description.split(' ');
    const reducedWords = words.slice(0,15);
    const reducedDescription = reducedWords.join(' ');

  return (
    <div className="card">
      <div className="poster-container">
        <img src={posterUrl} alt={title} className="poster" />
      </div>
      <div className="info-container">
        <h2 className="title">{title}</h2>
        <div className="rating">{rating}</div>
        <p className="description">{reducedDescription} {words.length > 10 && '...'}</p>
        <FaRandom className="random-icon"/>
      </div>
    </div>
  );
};

export default RandomMovie;
