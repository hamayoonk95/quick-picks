import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const searchMovie = async (searchInput) => {
    const params = {
        api_key: API_KEY,
        query: searchInput,
        with_original_language: 'en',
        sort_by: 'popularity.desc'
    }

    try {
        const response = axios.get(`https://api.themoviedb.org/3/search/movie`, {params});
        return response;
    } catch (err) {
        console.log(err)
    }
}

export default searchMovie;