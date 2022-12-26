import React, { useState, useEffect } from "react";
import "./Random-movie.css";
import { FaRandom, FaArrowLeft } from "react-icons/fa";
import getRandomMovie from "../../api/randomMovie";

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [prevMovies, setPrevMovies] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getRandomMovie();
      setMovie(movieData);
    };
    fetchData();
  }, []);

  const getRandom = async () => {
    const movieData = await getRandomMovie();
    setPrevMovies([...prevMovies, movie]);
    setCurrentIdx(currentIdx + 1);
    console.log(prevMovies);
    setMovie(movieData);
  };

  const goToPrev = () => {
    if (currentIdx > 0 && prevMovies.length > 0) {
      setCurrentIdx(currentIdx - 1);
      setMovie(prevMovies[currentIdx - 1]);
    }
  };

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
          <div className="icons">
            <div className="random-icon" onClick={getRandom}>
              <FaRandom className="icon" />
              Get Movie
            </div>
            <div className="back-icon" onClick={goToPrev}>
              <FaArrowLeft className="icon" />
              Previous
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default RandomMovie;
