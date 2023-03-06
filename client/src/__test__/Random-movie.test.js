import React from "react";
import { render, screen, fireEvent, getByRole, getByTestId, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import RandomMovie from "../components/Random-movie/Random-movie.js";
import { BrowserRouter } from "react-router-dom";

describe("RandomMovie", () => {
  it("renders correct movie", async () => {
    // mock the fetch request with sample data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            poster_path: "sample_poster_path",
            title: "Sample Title",
            release_date: "2022",
            overview: "Sample overview",
            vote_average: 7,
            genres: "Action-Drama",
            id: 123,
          }),
      })
    );

    render(
      <BrowserRouter>
        <RandomMovie />
      </BrowserRouter>
    );

    // wait for movie to load
    await screen.findByText(/Sample Title/i);

    // assert that all movie details are rendered correctly
    expect(screen.getByAltText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample overview/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
    expect(screen.getByText(/Action, Drama/i)).toBeInTheDocument();

    // mock a click on the Get Movie button
    await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Go to next movie/i }));
      });

    // wait for the next movie to load
    await screen.findByText(/Sample Title/i);

    // assert that all details of the new movie are rendered correctly
    expect(screen.getByAltText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample overview/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
    expect(screen.getByText(/Action, Drama/i)).toBeInTheDocument();
  });
});
