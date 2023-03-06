import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Movie from "../components/Movie/Movie.js"
import { movies } from "./testMovies.js";


describe("Movie component", () => {
    movies.forEach((movie) => {
      test(`renders ${movie.title} movie correctly`, () => {
        render(
          <Movie
            poster_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
            genres={movie.genres}
            overview={movie.overview}
          />
        );
  
        expect(screen.getByAltText(`${movie.title} poster`)).toBeInTheDocument();
        expect(screen.getByText(`${movie.title} (${movie.release_date})`)).toBeInTheDocument();
        expect(screen.getByText(movie.vote_average)).toBeInTheDocument();
        expect(screen.getByLabelText(`Genres: ${movie.genres.split("-").join(", ")}`)).toBeInTheDocument();
        expect(screen.getByLabelText("Movie description")).toHaveTextContent(movie.overview);
      });
    });
  });