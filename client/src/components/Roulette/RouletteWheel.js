import React from "react";
import "./RouletteWheel.css";
import { Wheel } from "react-custom-roulette";

const RouletteWheel = (props) => {
  return (
    <Wheel
      mustStartSpinning={props.mustSpin}
      prizeNumber={props.prizeNumber}
      data={props.data}
      // backgroundColors={['black','cyan','red']}
      textColors={["#fff"]}
      fontSize={15}
      backgroundColors={[
        "#F22B35",
        "#F99533",
        "#24CA69",
        "#514E50",
        "#46AEFF",
        "#9145B7",
      ]}
      perpendicularText={false}
      innerRadius={10}
      innerBorderWidth={0}
      outerBorderWidth={0}
      textDistance={50}
      onStopSpinning={props.onStopSpinning}
    />
  );
};

export default RouletteWheel;
