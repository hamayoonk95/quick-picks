import express from 'express';
import {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  filterSearch,
} from "../db/getMovies.js";

const router = express.Router();

router.route('/').get(getRandomMovie, getPopularMovie);

export default router;