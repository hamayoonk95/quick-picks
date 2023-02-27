import React, { useState, useEffect } from "react";
import "./Home.css";
import { RandomMovie, PopularMovies } from "../../components";

const Home = () => {
  // Initialize movies state with an empty array
  const [movies, setMovies] = useState([]);

  // Fetch popular movies data using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      // Make an API request to the server to get popular movies data
      const response = await fetch("/get-popular-movies");
      // Parse the response data as JSON
      const data = await response.json();
      // Update the movies state with the fetched data
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Render the RandomMovie component */}
      <div className="random-container">
        <RandomMovie className="random-movie" />
      </div>

      {/* Render the heading for Popular Movies section */}
      <div className="heading">Popular Movies</div>

      {/* Render the PopularMovies component for each movie */}
      <div className="popular-movies">
        {/* Check if there are movies in the state */}
        {movies.length > 0 &&
          movies.map((movie) => (
            // Render the PopularMovies component for each movie
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
