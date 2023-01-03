import React from "react";
import "./SearchedMovies.css";
import { useNavigate } from 'react-router-dom';

const SearchedMovies = (props) => {
  const { movies, isSearchOpen, closeSearchedMovies } = props;
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    closeSearchedMovies();
    // const {title, poster_path, release_date, overview, genre, id} = movie;
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className={`searched-movies ${isSearchOpen ? "open" : ""}`}>
      {isSearchOpen && movies.length > 0
        ? movies.map((movie) => (
              <div key={movie.id} onClick={() => handleMovieClick(movie)} className="searched-movie">
                <img
                  className="search-poster"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt={movie.title}
                />
                <div key={movie.id}>
                  {movie.title} ({movie.release_date})
                </div>
              </div>
          ))
        : null}
    </div>
  );
};

export default SearchedMovies;
