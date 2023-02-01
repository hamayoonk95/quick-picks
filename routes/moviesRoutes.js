import express from 'express';

import {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  rouletteSearch,
  filterSearch,
  getMoviebyID
} from "../controllers/MoviesController.js";

const router = express.Router();

router.route('/get-random-movie').get(getRandomMovie);
router.route('/get-popular-movies').get(getPopularMovie);
router.route('/movie/:id').get(getMoviebyID);
router.route('/search').get(searchMovie);
router.route('/rouletteSearch').get(rouletteSearch);
router.route('/filter-movies').get(filterSearch);


export default router;