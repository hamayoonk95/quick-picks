import express from 'express';

// import Movie Controller functions
import {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  rouletteSearch,
  filterSearch,
  getMoviebyID
} from "../controllers/MoviesController.js";

// Create an instance of the Express router
const router = express.Router();

// Define the routes and their corresponding controller functions
router.route('/get-random-movie').get(getRandomMovie);
router.route('/get-popular-movies').get(getPopularMovie);
router.route('/movie/:id').get(getMoviebyID);
router.route('/search').get(searchMovie);
router.route('/rouletteSearch').get(rouletteSearch);
router.route('/filter-movies').get(filterSearch);


export default router;