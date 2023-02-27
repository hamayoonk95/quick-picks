import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import SearchedMovies from "../SearchedMovies/SearchedMovies";

const Searchbar = () => {
  // Set up state for searchbar input and searched movies
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Toggle searchbar expansion
  const toggleSearchOpen = () => {
    setIsSearchOpen((prev) => !prev);
  };

  // Handle input changes and search movies
  const handleInput = async (e) => {
    // Update search input state
    setSearchInput(e.target.value);

    // If there is a debounce timeout, clear it to prevent multiple searches
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // Set a new debounce timeout to search after 500ms
    setDebounceTimeout(
      setTimeout(async () => {
        try {
          // Search for the movie in the DB using searchInput
          const response = await fetch(`/search?query=${searchInput}`);
          const data = await response.json();
          // Update searched Movies state with the returned data
          setMovies(data);
        } catch (err) {
          console.log(err);
        }
      }, 500)
    );
  };

  // function handles searchMovie close
  const closeSearchedMovies = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="search">
      {/* Search input and search icon */}
      <div className="search-container">
        <input
          className={`search-input ${isSearchOpen ? "expanded" : "collapsed"}`}
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="Search"
        />
        <FaSearch
          className="search-icon"
          onClick={toggleSearchOpen}
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleSearchOpen();
            }
          }}
        />
      </div>
      {/* Searched movies dropdown */}
      <SearchedMovies
        movies={movies}
        isSearchOpen={isSearchOpen}
        closeSearchedMovies={closeSearchedMovies}
      />
    </div>
  );
};

export default Searchbar;
