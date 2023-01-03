import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import SearchedMovies from "../SearchedMovies/SearchedMovies";

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  // let timeoutId;

  // const debounce = (func, delay) => {
  //   clearTimeout(timeoutId);
  //   timeoutId = setTimeout(func, delay);
  // }

  const handleSearchOpen = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleKeyPress = async (e) => {
    setSearchInput(e.target.value);
    if(e.key === "Enter") {
      try {
        console.log(searchInput);
        const response = await fetch(`/search?query=${searchInput}`);
        const data = await response.json();
        console.log(data.slice(0,4));
        setMovies(data);
      } catch (err) {
        console.log(err);
      }
    }      
  };

  const onChange = async (e) => {
    
  }

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
        <FaSearch className="search-icon" onClick={handleSearchOpen} />
      </div>
      <SearchedMovies movies={movies} isSearchOpen={isSearchOpen} closeSearchedMovies={closeSearchedMovies}/>
    </div>
  );
};

export default Searchbar;
