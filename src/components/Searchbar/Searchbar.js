import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  //   const [searchInput, setSearchInput] = useState("");

  //opens and closes search bar
  const handleChange = (e) => {
    // setSearchInput(e.target.value);
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <div className="search-container">
      <input
        className={`search-input ${isSearchOpen ? "expanded" : "collapsed"}`}
        type="text"
        //   value={searchInput}
        //   onChange={handleChange}
        placeholder="Search"
      />
      <FaSearch className="search-icon" onClick={handleChange} />
    </div>
  );
};

export default Searchbar;
