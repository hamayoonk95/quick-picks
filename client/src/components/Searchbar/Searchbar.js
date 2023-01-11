import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import SearchedMovies from "../SearchedMovies/SearchedMovies";

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [ movies, setMovies] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const toggleSearchOpen = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleInput = async (e) => {
    setSearchInput(e.target.value);
    if(debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(
      setTimeout(async () => {
        try {
          const response = await fetch(`/search?query=${searchInput}`);
          const data = await response.json();
          console.log(data);
          setMovies(data);
        } catch (err) {
          console.log(err);
        }
      }, 500)
    );
      
  };

  const closeSearchedMovies = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="search">
      <div className="search-container">
        <input
          className={`search-input ${isSearchOpen ? "expanded" : "collapsed"}`}
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="Search"
        />
        <FaSearch className="search-icon" onClick={toggleSearchOpen} />
      </div>
      <SearchedMovies movies={movies} isSearchOpen={isSearchOpen} closeSearchedMovies={closeSearchedMovies} />
    </div>
  );
};

export default Searchbar;