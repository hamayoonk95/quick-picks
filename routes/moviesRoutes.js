import express from 'express';
import db from '../models/index.js';

import {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  rouletteSearch,
  filterSearch,
  getMoviebyID
} from "../controllers/getMovies.js";

const router = express.Router();

router.route('/get-random-movie').get(getRandomMovie);
router.route('/get-popular-movies').get(getPopularMovie);
router.route('/movie/:id').get(getMoviebyID);
router.route('/search').get(searchMovie);
router.route('/rouletteSearch').get(rouletteSearch);
router.route('/filter-movies').get(filterSearch);


export default router;