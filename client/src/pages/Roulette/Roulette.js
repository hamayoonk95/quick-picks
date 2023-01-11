import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouletteWheel from "../../components/Roulette/RouletteWheel";
import "./Roulette.css";

const Roulette = () => {
  const navigate = useNavigate();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [values, setValues] = useState("");
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState([]);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const onChange = async (e) => {
    setValues(e.target.value);
    try {
      const response = await fetch(`/search?query=${values}`);
      const movies = await response.json();
      console.log(movies);
      setMovie(movies[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const addToRoulette = async (e) => {
    e.preventDefault();
    setData([...data, { option: movie.title.substring(0, 25), id: movie.id }]);
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

        <button onClick={handleSpinClick}>SPIN</button>
      </div>
      <div className="names">
        <div className="n">
          {data && data.length ? data.map((d) => <div>{d.option}</div>) : null}
        </div>
        <form className="roulette-form" onSubmit={addToRoulette}>
          <input type="text" value={values} onChange={onChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Roulette;
