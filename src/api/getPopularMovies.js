import axios from "axios";
import getGenres from "./getGenre";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
    );
    const movies = response.data.results;
    const genres = await getGenres();
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const genreNames = movie.genre_ids.map((id) => {
        return genres.find((genre) => genre.id === id).name;
      });
      movie.genre = genreNames; // Add the genre names to the movie object
    }
    return movies;
    // return movies;
  } catch (err) {
    console.log(err);
  }
};

export default getPopularMovies;
