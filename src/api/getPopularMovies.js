import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
    );
    const movies = response.data.results;

    return movies;
  } catch (err) {
    console.log(err);
  }
};

export default getPopularMovies;
