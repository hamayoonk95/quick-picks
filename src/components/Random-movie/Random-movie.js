import React, { useState, useEffect } from "react";
import "./Random-movie.css";
import { FaRandom, FaArrowLeft } from "react-icons/fa";
import getRandomMovie from "../../api/randomMovie";
import { useNavigate } from "react-router-dom";

const RandomMovie = () => {
  const navigate = useNavigate();
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
    setMovie(movieData);
  };

  const goToPrev = () => {
    if (currentIdx > 0 && prevMovies.length > 0) {
      setCurrentIdx(currentIdx - 1);
      setMovie(prevMovies[currentIdx - 1]);
    }
  };
  if (movie) {
    const words = movie.overview.split(" ");
    const reducedWords = words.slice(0, 20);
    const reducedDescription = reducedWords.join(" ");
    const {poster_path, title, release_date, overview, vote_average, genre, id} = movie;
    const state = {poster_path, title, release_date, overview, vote_average, genre, id}
    return (
      <div className="card">
        <div className="poster-container">
          <img src={'https://image.tmdb.org/t/p/w500/'+ poster_path} alt={title} className="poster" />
        </div>
        <div className="info-container">
          <div onClick={() => navigate('/movie-page', {state} )}  className="info">
            <h2 className="title">
              {title} ({release_date.substring(0, 4)})
            </h2>
            <div className="rating">{vote_average.toFixed(1)}</div>
            <div className="genre">{genre.join(", ")}</div>
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
