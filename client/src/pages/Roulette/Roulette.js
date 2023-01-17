import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouletteWheel from "../../components/Roulette/RouletteWheel";
import RouletteSearch from "../../components/RouletteSearch/RouletteSearch";
import "./Roulette.css";

const Roulette = () => {
  const navigate = useNavigate();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [values, setValues] = useState("");
  const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleSpinClick = () => {
    if(data.length == 0) {
      alert("Roulette is Empty")
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const onChange = async (e) => {
    setIsDropdownOpen(true);
    setValues(e.target.value);
    if (!e.target.value) {
      setIsDropdownOpen(false);
    }
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(
      setTimeout(async () => {
        try {
          const response = await fetch(`/rouletteSearch?query=${values}`);
          const movies = await response.json();
          console.log(movies);
          setMovies(movies);
        } catch (err) {
          console.log(err);
        }
      }, 500)
    );
  };

  const addToRoulette = async (e, movie) => {
    e.preventDefault();
    setData([...data, { option: movie.title.substring(0, 20), id: movie.id }]);
    setValues("");
  };
  return (
    <div className="roulette-container">
      <div className="wheel">
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
      <div>
        <button className="spin-btn" onClick={handleSpinClick}>
          SPIN
        </button>
      </div>
      <form className="roulette-form" onSubmit={addToRoulette}>
        <label>Insert Movie</label>
        <input
          className="roulette-input"
          type="text"
          value={values}
          onChange={onChange}
        />
      </form>
      <RouletteSearch
        movies={movies}
        addToRoulette={addToRoulette}
        isDropdownOpen={isDropdownOpen}
        closeDropdown={closeDropdown}
      />
    </div>
  );
};

export default Roulette;
