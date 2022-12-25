import axios from 'axios';
import getGenres from './getGenre';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getRandomMovie = async () => {
    let page = Math.floor(Math.random() * 500);
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
        );
        
        const movies = response.data.results;
        const randomIdx = Math.floor(Math.random() * movies.length);
        const movie = movies[randomIdx];

        const genres = await getGenres();
        const genreNames = movie.genre_ids.map((id) => {
            return genres.find((genre) => genre.id === id).name;
          });

        return {
            posterURL: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            year: movie.release_date,
            genre: genreNames,
            title: movie.title,
            rating: movie.vote_average,
            description: movie.overview,
        };
    } catch (err) {
        console.log(err)
    }
}

export default getRandomMovie;