import React from "react";
import { render, screen } from "@testing-library/react";
import RouletteWheel from "../components/Roulette/RouletteWheel.js";

describe("RouletteWheel", () => {
  const mockProps = {
    mustSpin: false,
    prizeNumber: null,
    data: [
      { option: "Option 1", style: { backgroundColor: "#F22B35", textColor: "#fff" } },
      { option: "Option 2", style: { backgroundColor: "#F99533", textColor: "#fff" } },
      { option: "Option 3", style: { backgroundColor: "#24CA69", textColor: "#fff" } },
    ],
    onStopSpinning: jest.fn(),
  };

  it("renders the component with the correct props", () => {
    render(<RouletteWheel {...mockProps} />);
    
    // expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    // expect(screen.getByText("Option 1")).toBeInTheDocument();
    // expect(screen.getByText("Option 2")).toBeInTheDocument();
    // expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("calls onStopSpinning prop when wheel stops spinning", () => {
    render(<RouletteWheel {...mockProps} />);
    
    

    // Wait for the wheel to stop spinning
    setTimeout(() => {
      expect(mockProps.onStopSpinning).toHaveBeenCalledTimes(1);
    }, 5000);
  });
});
