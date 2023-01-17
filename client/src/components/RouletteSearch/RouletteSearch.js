import React, { useState } from "react";
import "./RouletteSearch.css";

const RouletteSearch = ({ movies, addToRoulette, isDropdownOpen ,closeDropdown }) => {
  return (
    <div className="rouletteMovies">
      {isDropdownOpen && movies.length > 0
        ? movies.map((movie) => (
            <div
              className={`searched-movie ${isDropdownOpen ? "open" : ""}`}
              key={movie.id}
                onClick={(e) => {addToRoulette(e, movie); closeDropdown()}}
            >
              <img
                className="search-poster"
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                alt={movie.title}
              />
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
