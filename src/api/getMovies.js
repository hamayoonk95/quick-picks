import axios from "axios";
import getGenres from "./getGenre";
import genreMapping from "./genreMapping";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getMovies = async (mood, timeOfDay, ratings, occassion) => {

  const genre = genreMapping[mood][timeOfDay][occassion];

  let genreID1 = 0;
  let genreID2 = 0;
  const genres = await getGenres();
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].name === genre[0]) {
      genreID1 = genres[i].id;
    } else if(genres[i].name === genre[1]) {
      genreID2 = genres[i].id;
    }
  }

  const getMoviesByGenre = async (genreID1, genreID2) => {
    let page = 1;
    let totalPages = 50;
    let results = [];

    const params = {
      api_key: API_KEY,
      include_adult: false,
      sort_by: 'popularity.desc',
      with_genres: `${genreID1},${genreID2}`,
      with_original_language: 'en',
      'vote_average.gte': ratings
    }

    while (page < totalPages) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?&page=$`, {params}
      );
      results = results.concat(response.data.results);
      page++;
    }
    return results;
  };

  const movies = await getMoviesByGenre(genreID1, genreID2);
  let random = Math.floor(Math.random() * movies.length);
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const genreNames = movie.genre_ids.map((id) => {
      return genres.find((genre) => genre.id === id).name;
    });
    movie.genre = genreNames;
  }
  return movies[random];
};

export default getMovies;
