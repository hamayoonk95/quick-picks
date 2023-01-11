import React from "react";
import "./RouletteWheel.css";
import { Wheel } from 'react-custom-roulette';

const RouletteWheel = (props) => {
  return (
      <Wheel
        mustStartSpinning={props.mustSpin}
        prizeNumber={props.prizeNumber}
        data={props.data}
        // backgroundColors={['black','cyan','red']}
        textColors={['#fff']}
        fontSize={13}
        textDistance={50}
        onStopSpinning={props.onStopSpinning}
      />
  )
};

export default RouletteWheel;
