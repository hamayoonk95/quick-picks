import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import SearchedMovies from "../SearchedMovies/SearchedMovies";
import searchMovie from "../../api/searchMovie";

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  let timeoutId;

  const debounce = (func, delay) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  }

  const handle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleKeyPress = async (e) => {
    setSearchInput(e.target.value);
  
    debounce(async () => {
      try {
        const response = await searchMovie(searchInput);
        setMovies(response.data.results.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    }, 1000);
      
  };

  const closeSearchedMovies = () => {
    setIsSearchOpen(false);
  }

  return (
    <div className="search">
      <div className="search-container">
        <input
          className={`search-input ${isSearchOpen ? "expanded" : "collapsed"}`}
          type="text"
          value={searchInput}
          onKeyDown={handleKeyPress}
          onChange={handleKeyPress}
          placeholder="Search"
        />
        <FaSearch className="search-icon" onClick={handle} />
      </div>
      <SearchedMovies movies={movies} isSearchOpen={isSearchOpen} closeSearchedMovies={closeSearchedMovies}/>
    </div>
  );
};

export default Searchbar;
