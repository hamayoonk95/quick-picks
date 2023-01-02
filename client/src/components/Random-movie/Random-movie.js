import React, { useState, useEffect } from "react";
import "./Random-movie.css";
import { FaRandom, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noimage from "../../assets/no-image.png";

const RandomMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [prevMovies, setPrevMovies] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/get-random-movie');
      const data = await response.json();
      let randIdx = Math.floor(Math.random() * data.length);
      setMovie(data[randIdx]);
    };
    fetchData();
  }, []);

  const getRandom = async () => {
    const response = await fetch('/get-random-movie');
    const movieData = await response.json();
    setPrevMovies([...prevMovies, movie]);
    setCurrentIdx(currentIdx + 1);
    let randIdx = Math.floor(Math.random() * movieData.length);
    setMovie(movieData[randIdx]);
  };

  const goToPrev = () => {
    if (currentIdx > 0 && prevMovies.length > 0) {
      setCurrentIdx(currentIdx - 1);
      setMovie(prevMovies[currentIdx - 1]);
    }
  };
  if (movie) {
    const {poster_path, title, release_date, overview, vote_average, genres} = movie;
    
    const words = overview.split(" ");
    const reducedWords = words.slice(0, 20);
    const reducedDescription = reducedWords.join(" ");
    const state = movie;
    return (
      <div className="card">
        <div onClick={() => navigate('/movie-page', {state} )} className="poster-container">
        {poster_path ? (<img src={'https://image.tmdb.org/t/p/w500/'+ poster_path} alt={title} className="poster" />) : (<img src={noimage} alt={title} className="poster" />)}
          
        </div>
        <div className="info-container">
          <div className="info">
            <h2 onClick={() => navigate('/movie-page', {state} )} className="title">
              {title} ({release_date.substring(0, 4)})
            </h2>
            <div className="rating">{vote_average}</div>
            <div className="genre">{genres}</div>
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
