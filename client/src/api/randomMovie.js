import axios from "axios";
import getGenres from "./getGenre";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getRandomMovie = async () => {
  const params = {
    api_key: API_KEY,
    page: Math.floor(Math.random() * 500),
    include_adult: false,
    sort_by: 'popularity.desc',
    with_original_language: 'en'
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie` , {params}
    );

    const movies = response.data.results;
    const randomIdx = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIdx];

    const genres = await getGenres();
    const genreNames = movie.genre_ids.map((id) => {
      return genres.find((genre) => genre.id === id).name;
    });

    return {
      ...movie,
      genre: genreNames
    };
  } catch (err) {
    console.log(err);
  }
};

export default getRandomMovie;
