import React, { useState, useEffect } from "react";
import "./Random-movie.css";
import { FaRandom, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noimage from "../../assets/no-image.png";

const RandomMovie = () => {
  // Declare and initialize variable with useState hook
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null); // stores the current movie
  const [prevMovies, setPrevMovies] = useState([]); // stores previous movies
  const [currentIdx, setCurrentIdx] = useState(0); // sstores the index of the current movie

  // fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/get-random-movie"); // get request to fetch a random movie
      const data = await response.json(); // extract the JSON data from the response
      setMovie(data); // update the movie state with the fetched data
    };
    fetchData();
  }, []);

  // function to get a random movie
  const getRandom = async () => {
    const response = await fetch("/get-random-movie"); // GET request to fetch a random movie
    const movieData = await response.json(); // extract the JSON data from response
    setPrevMovies([...prevMovies, movie]); // add the current movie to the list of previous movies
    setCurrentIdx(currentIdx + 1); // increment the index of the current movie
    setMovie(movieData); // update the movie state with the fetched data
  };

  // function to go to the previous movie
  const goToPrev = () => {
    if (currentIdx > 0 && prevMovies.length > 0) {
      setCurrentIdx(currentIdx - 1);
      setMovie(prevMovies[currentIdx - 1]);
    }
  };

  // if movie is fetched
  if (movie) {
    // destructure the movie object to get its properties
    const {
      poster_path,
      title,
      release_date,
      overview,
      vote_average,
      genres,
      id,
    } = movie;

    // split the overview into words, reduce the number of words to 30
    const words = overview.split(" ");
    const reducedWords = words.slice(0, 30);
    const reducedDescription = reducedWords.join(" ");

    return (
      // render the movie details
      <div className="random-movie-container flex-center">
        {/* back-icon button that handles the getting the previous movie functionality */}
        <div className="icons">
          <div
            className="back-icon"
            onClick={goToPrev}
            role="button"
            aria-label="Go to previous movie"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                goToPrev();
              }
            }}
          >
            <FaArrowLeft className="icon" />
            Previous
          </div>
        </div>

        {/* movie-card cotainer that displays the movie information */}
        <div className="card">
          {/* movie-poster, links to moviepage onClick with movie ID as parameter  */}
          <div
            onClick={() => navigate(`/movie/${id}`)}
            className="poster-container"
          >
            {poster_path ? (
              // If poster_path is not empty, render movie poster
              <img
                src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                alt={title}
                className="poster"
              />
            ) : (
              // render noImage from assets if movie poster is null
              <img src={noimage} alt={title} className="poster" />
            )}
          </div>
          {/* Movie information container */}
          <div className="info-container">
            <div className="title-rating">
              <h2 onClick={() => navigate(`/movie/${id}`)} className="title">
                {title.split(" ").slice(0, 5).join(" ")} ({release_date})
              </h2>
              {vote_average > 0 ? (
                <div className="rating">{vote_average}</div>
              ) : null}
            </div>
            {/* render genres, split genre by '-' and join by ', ' */}
            <div className="genre">{genres.split("-").join(", ")}</div>
            {/* render description, if word count > 30 display three dots ... */}
            <p className="description">
              {reducedDescription} {words.length > 30 && "..."}
            </p>
          </div>
        </div>

        {/* random-icon button that handles the getting the previous movie functionality */}
        <div className="icons">
          <div
            className="random-icon"
            onClick={getRandom}
            role="button"
            aria-label="Go to next movie"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getRandom();
              }
            }}
          >
            <FaRandom className="icon" />
            Get Movie
          </div>
        </div>
      </div>
    );
  }
};
export default RandomMovie;
