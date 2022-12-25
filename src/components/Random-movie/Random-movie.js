import React, { useState, useEffect } from "react";
import "./Random-movie.css";
import { FaRandom, FaArrowLeft } from "react-icons/fa";
import getRandomMovie from "../../api/randomMovie";

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [prevMovie, setPrevMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getRandomMovie();
      setMovie(movieData);
    };
    fetchData();
  }, []);

  const getRandom = async () => {
    const movieData = await getRandomMovie();
    setPrevMovie(movie);
    setMovie(movieData);
  };

  const goToPrev = () => {
    setMovie(prevMovie);
  }

  if (movie) {
    const words = movie.description.split(" ");
    const reducedWords = words.slice(0, 20);
    const reducedDescription = reducedWords.join(" ");

    return (
      <div className="card">
        <div className="poster-container">
          <img src={movie.posterURL} alt={movie.title} className="poster" />
        </div>
        <div className="info-container">
          <div className="info">
            <h2 className="title">
              {movie.title} ({movie.year.substring(0, 4)})
            </h2>
            <div className="rating">{movie.rating.toFixed(1)}</div>
            <div className="genre">{movie.genre.join(", ")}</div>
            <p className="description">
              {reducedDescription} {words.length > 20 && "..."}
            </p>
          </div>
          <div className='icons'>
          <div className="random-icon" onClick={getRandom}>
            <FaRandom className="icon" />
            Random Movie
          </div>
          <div className="back-icon" onClick={goToPrev}>
            <FaArrowLeft className="icon" />
            Go back
          </div>
          </div>
        </div>
      </div>
    );
  }
};
export default RandomMovie;
