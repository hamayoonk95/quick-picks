import React from "react";
import "./SearchedMovies.css";
import { useNavigate } from "react-router-dom";

const SearchedMovies = (props) => {
  // destructure props passed by the parent component
  const { movies, isSearchOpen, closeSearchedMovies } = props;
  const navigate = useNavigate();

  // handle click on a movie when user clicks in the search results
  // closes search results dropdown and navigates to movie details page
  const handleMovieClick = (movie) => {
    closeSearchedMovies();
    navigate(`/movie/${movie.id}`);
  };

  return (
    // searched movies component that renders a list of movies whose title matches searched term
    <div className={`searched-movies ${isSearchOpen ? "open" : ""}`}>
      {/* Render each movie in the search result as a div with a poster image and title */}
      {isSearchOpen && movies.length > 0
        ? movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="searched-movie"
              tabIndex={0}
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                  handleMovieClick(movie)
                }
              }}
            >
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
        : // if no search results then render nothing
          null}
    </div>
  );
};

export default SearchedMovies;
