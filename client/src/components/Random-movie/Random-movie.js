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
      const response = await fetch("/get-random-movie");
      const data = await response.json();
      setMovie(data[0]);
    };
    fetchData();
  }, []);

  const getRandom = async () => {
    const response = await fetch("/get-random-movie");
    const movieData = await response.json();
    setPrevMovies([...prevMovies, movie]);
    setCurrentIdx(currentIdx + 1);
    setMovie(movieData[0]);
  };

  const goToPrev = () => {
    if (currentIdx > 0 && prevMovies.length > 0) {
      setCurrentIdx(currentIdx - 1);
      setMovie(prevMovies[currentIdx - 1]);
    }
  };
  if (movie) {
    const {
      poster_path,
      title,
      release_date,
      overview,
      vote_average,
      genres,
      id,
    } = movie;

    const words = overview.split(" ");
    const reducedWords = words.slice(0, 30);
    const reducedDescription = reducedWords.join(" ");
    return (
      <div className="card flex-center">
        <div
          onClick={() => navigate(`/movie/${id}`)}
          className="poster-container"
        >
          {poster_path ? (
            <img
              src={"https://image.tmdb.org/t/p/w500/" + poster_path}
              alt={title}
              className="poster"
            />
          ) : (
            <img src={noimage} alt={title} className="poster" />
          )}
        </div>
        <div className="info-container">
            <div className="title-rating">
              <h2 onClick={() => navigate(`/movie/${id}`)} className="title">
                {title.split(" ").slice(0,5).join(" ")} ({release_date})
              </h2>
              {vote_average > 0 ? (
                <div className="rating">{vote_average}</div>
              ) : null}
            </div>
            <div className="genre">{genres.split("-").join(", ")}</div>
            <p className="description">
              {reducedDescription} {words.length > 30 && "..."}
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
    );
  }
};
export default RandomMovie;
