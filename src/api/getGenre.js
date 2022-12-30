import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  } catch (err) {
    console.log(err);
  }
};

export default getGenres;
