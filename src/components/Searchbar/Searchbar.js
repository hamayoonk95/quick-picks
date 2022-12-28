import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);

  const handle = () => {
    setIsSearchOpen((prev) => !prev);
  }

  //opens and closes search bar
  const handleChange = async (e) => {
    setSearchInput(e.target.value);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}`
      );
      setMovies(response.data.results);
      console.log(movies);
    } catch (err) {
      console.log(movies);
      console.log(err);
    }
  };

  return (
    <>
      <div className="search-container">
        <input
          className={`search-input ${isSearchOpen ? "expanded" : "collapsed"}`}
          type="text"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search"
        />
        <FaSearch className="search-icon" onClick={handle} />
      </div>
      {/* {movies.length > 0 ? movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      )) : null} */}
    </>
  );
};

export default Searchbar;
