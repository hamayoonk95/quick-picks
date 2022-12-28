import axios from "axios";
import getGenres from "./getGenre";
import genreMapping from "./genreMapping";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getMovies = async (mood, timeOfDay, ratings, occassion) => {
  let randomPage = Math.floor(Math.random() * 500);

  const genre = genreMapping[mood][timeOfDay][occassion];
  console.log(genre);

  let genreID = 0;
  const genres = await getGenres();
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].name === genre) {
      genreID = genres[i].id;
    }
  }

  const getMoviesByGenre = async (genre) => {
    let page = 1;
    let totalPages = 5;
    let results = [];

    while (page < totalPages) {
      // Make the API request to get a list of movies in the genre
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreID}&page=${randomPage}`
      );
      results = results.concat(response.data.results);
      page++;
    }
    return results;
  };

  const movies = await getMoviesByGenre(genre);
  let random = Math.floor(Math.random() * movies.length);
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const genreNames = movie.genre_ids.map((id) => {
      return genres.find((genre) => genre.id === id).name;
    });
    movie.genre = genreNames; // Add the genre names to the movie object
  }
  console.log(movies[random]);
  return movies[random];
};

export default getMovies;
