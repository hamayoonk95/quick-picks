import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouletteWheel from "../../components/Roulette/RouletteWheel";
import RouletteSearch from "../../components/RouletteSearch/RouletteSearch";
import "./Roulette.css";

const Roulette = () => {
  const navigate = useNavigate();
  // determines if wheel must spin
  const [mustSpin, setMustSpin] = useState(false);
  // number representing the prize index
  const [prizeNumber, setPrizeNumber] = useState(0);
  // input value of movie name
  const [values, setValues] = useState("");
  // array of movie options to spin the wheel
  const [data, setData] = useState([]);
  // array of movies matching search query
  const [movies, setMovies] = useState([]);
  // determines if search dropdown should be open
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  // timeout id for the debounce function
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // function to close the search dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // function to handle the spin button click
  const handleSpinClick = () => {
    if(data.length === 0) {
      alert("Roulette is Empty")
      return;
    }
    // genrate a random number as the prize index
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    // set the prize index in state
    setPrizeNumber(newPrizeNumber);
    // set mustSpin to true to spin the wheel
    setMustSpin(true);
  };

  // function to handle the reset button click
  const handleReset = () => {
    // display message if wheel is spinning else set the data array to empty array to reset the wheel
    if (mustSpin) {
      alert("Please wait for the wheel to stop spinning before resetting.");
    } else {
      setData([]);
    }
  }

  // function to handle the onChange event of the movie name input
  const onChange = async (e) => {
    // open the search dropdown
    setIsDropdownOpen(true);
    // set the input value
    setValues(e.target.value);
    // if the input value is empty, close the search dropdown
    if (!e.target.value) {
      setIsDropdownOpen(false);
    }
    //if debounce timeout is already set, clear the timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // set a new timeout for the debounce effect, waits 5s before executing the function
    setDebounceTimeout(
      setTimeout(async () => {
        try {
          // fetch movies matching the search query
          const response = await fetch(`/rouletteSearch?query=${values}`);
          // parses the response JSON data
          const movies = await response.json();
          // set the movies array with the data
          setMovies(movies);
        } catch (err) {
          // if error then log the error
          console.log(err);
        }
      }, 500)
    );
  };

  // function to add movie to the data array when clicked from the search dropdown
  const addToRoulette = async (e, movie) => {
    e.preventDefault();
    // add the selected movie to the data array
    setData([...data, { option: movie.title.split(" ").slice(0,4).join(" "), id: movie.id }]);
    // clear input field
    setValues("");
  };
  return (
    <div className="roulette-container">
      <div className="wheel">
      {/* Roulette wheel component with props passed down */}
        <RouletteWheel
          mustSpin={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            const selectedItem = data[prizeNumber];
            navigate(`/movie/${selectedItem.id}`);
          }}
        />
      </div>
      
      <div className="form-movies">
      {/* Form with the input field for movies titles */}
      <form className="roulette-form" onSubmit={addToRoulette}>
        <label>Insert Movie</label>
        <input
          className="roulette-input"
          title="movie"
          type="text"
          placeholder="Insert Movie name"
          value={values}
          onChange={onChange}
        />
      </form>
      {/* Buttons that handles spin and reset functionality */}
      <div className="btns">
        <button className="spin-btn" onClick={handleSpinClick}>
          SPIN
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Roulette search dropdown that displays movies from db related to the searched term */}
      <RouletteSearch
        movies={movies}
        addToRoulette={addToRoulette}
        isDropdownOpen={isDropdownOpen}
        closeDropdown={closeDropdown}
      />
      </div>
    </div>
  );
};

export default Roulette;
