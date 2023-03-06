import React from "react";
import {
  render,
  fireEvent,
  getAllByText
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PopularMovies from "../components/Popular-movies/Popular-movies.js";
import { BrowserRouter } from "react-router-dom";
import { movies } from "./testMovies.js";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("PopularMovies component", () => {
  
  it("should render movie information correctly", () => {
    movies.forEach((movie) => {
      const { getByAltText, getByText } = render(
        <BrowserRouter>
          <PopularMovies {...movie} />
        </BrowserRouter>
      );
      expect(getByAltText(movie.title)).toBeInTheDocument();
      expect(getByText(movie.title)).toBeInTheDocument();
      expect(getByText(movie.release_date)).toBeInTheDocument();
    });
  });

  it("should navigate to movie details page on click", async () => {
    const movie = {
      title: "The Shawshank Redemption",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      release_date: "1994",
      id: 271,
    };

    const { getByTestId } = render(
      <BrowserRouter>
        <PopularMovies {...movie} />
      </BrowserRouter>
    );

    await fireEvent.click(getByTestId("popular-component"), "");
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/movie/${movie.id}`);
  });

  it("should call onKeyDown function when 'Enter' key is pressed", async () => {
    const movie = {
      title: "The Shawshank Redemption",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      release_date: "1994",
      id: 278,
    };

    const { getByTestId } = render(
      <BrowserRouter>
        <PopularMovies {...movie} />
      </BrowserRouter>
    );

    await userEvent.type(getByTestId("popular-component"), "test");
    await userEvent.keyboard("{Enter}");
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/movie/${movie.id}`);
  });


  it("should render all movies", () => {
    const { container } = render(
      <BrowserRouter>
        {movies.map((movie) => (
          <PopularMovies key={movie.id} {...movie} />
        ))}
      </BrowserRouter>
    );
    const movieTitles = movies.map((movie) => movie.title);
  expect(getAllByText(container, new RegExp(movieTitles.join("|"), "i"))).toHaveLength(movies.length);
  });
});
