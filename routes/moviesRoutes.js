import express from 'express';
import {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  filterSearch,
} from "../db/getMovies.js";

const router = express.Router();

router.route('/get-random-movie').get(getRandomMovie);
router.route('/get-popular-movies').get(getPopularMovie);

export default router;