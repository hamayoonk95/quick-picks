import React from "react";
import "./RouletteSearch.css";

// Destructure the props passed down by parent
const RouletteSearch = ({ movies, addToRoulette, isDropdownOpen ,closeDropdown }) => {
  return (
    <div className="rouletteMovies">
    {/* Render the component only if dropdown is open and there are results */}
      {isDropdownOpen && movies.length > 0
        ? movies.map((movie) => (
            <div
              className={`searched-movie ${isDropdownOpen ? "open" : ""}`}
              key={movie.id}
              // add click event handler to add movie to roulette and close dropdown
                onClick={(e) => {addToRoulette(e, movie); closeDropdown()}}
                tabIndex="0"
                aria-label={`Add ${movie.title} to roulette`}
                // onKeyDown handler to add movie using keyboard
                onKeyDown={(e) => {
                  if(e.key === "Enter") {
                    addToRoulette(e, movie);
                    closeDropdown();
                  }
                }}
            >
            {/* Renders movie-poster */}
              <img
                className="search-poster"
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                alt={movie.title}
              />
              {/* Renders movie title and release date */}
              <div>
                {movie.title} ({movie.release_date})
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default RouletteSearch;
