import React, { useState, useEffect } from "react";
import "./Home.css";
import { RandomMovie, PopularMovies } from "../../components";
import getPopularMovies from "../../api/getPopularMovies";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await getPopularMovies();
      setMovies(moviesData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="random-container">
        <RandomMovie className="random-movie" />
      </div>

      <div className="heading">Popular Movies</div>

      <div className="popular-movies">
        {movies.length > 0 &&
          movies.map((movie) => (
            <PopularMovies
              className="movie-container"
              key={movie.id}
              {...movie}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
