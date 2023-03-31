import React from "react";
import "./RouletteWheel.css";
import { Wheel } from "react-custom-roulette";

const defaultData = [{ option: "Roulette is empty", style: {backgroundColor: "#000"}}];
// Renders Roulette wheel from react-custom-roulette library
const RouletteWheel = (props) => {
  return (

    // Rendering the Wheel component with props passed down from the parent component
    <Wheel
      mustStartSpinning={props.mustSpin}
      prizeNumber={props.prizeNumber}
      data={props.data.length > 0 ? props.data : defaultData}
      textColors={["#fff"]}
      fontSize={12}
      backgroundColors={[
        "#F22B35",
        "#F99533",
        "#24CA69",
        "#514E50",
        "#46AEFF",
        "#9145B7",
      ]}
      // sets text within the roulette to not be perpendicular
      perpendicularText={false}
      // sets inner radius of the wheel
      innerRadius={5}
      // make the inner boder and outer border to 0
      innerBorderWidth={0}
      outerBorderWidth={0}
      // sets text distance from the center
      textDistance={55}
      // calls the onStopSpinning function passed by the parent component as props
      // relocates to the MoviePage on whichever movie the wheel stops
      onStopSpinning={props.onStopSpinning}
    />
  );
};

export default RouletteWheel;
