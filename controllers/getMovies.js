import genreMapping from "./genreMapping.js";
import db from "../models/index.js";

const getRandomMovie = async (req, res) => {
  try {
    const count = await db.models.Movie.count({
      where: { poster_path: { [db.Op.ne]: null } },
    });
    const randomMovie = await db.models.Movie.findOne({
      offset: Math.floor(Math.random() * count),
      limit: 1,
    });
    res.send(randomMovie);
  } catch (err) {
    console.log(err);
  }
};

const getPopularMovie = async (req, res) => {
  try {
    const popularMovies = await db.models.Movie.findAll({
      where: { popularity: { [db.Op.ne]: null } },
      order: [["popularity", "DESC"]],
      limit: 20,
    });
    res.send(popularMovies);
  } catch (error) {
    console.log(error);
  }
};

const searchMovie = async (req, res) => {
  if (req.query.query) {
    try {
      const input = req.query.query;
      const searchedMovies = await db.models.Movie.findAll({
        where: {
          [db.Op.or]: [
            { title: { [db.Op.like]: `%${input}%` } },
            { genres: { [db.Op.like]: `%${input}%` } },
          ],
        },
        order: [["popularity", "DESC"]],
        limit: 4,
      });
      res.send(searchedMovies);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send([]);
  }
};

const rouletteSearch = async (req, res) => {
  if (req.query.query) {
    const input = req.query.query;
    try {
      const rouletteSearchMovies = await db.models.Movie.findAll({
        where: {
          [db.Op.or]: [
            { title: { [db.Op.like]: `%${input}%` } },
          ],
        },
        order: [["popularity", "DESC"]],
        limit: 10,
      });
      res.send(rouletteSearchMovies);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send([]);
  }
};

const filterSearch = async (req, res) => {
  const { mood, timeOfDay, ratings, occassion, releaseDate } = req.query;
  const genre = genreMapping[mood][timeOfDay][occassion];
  try {
    const filterMovie = await db.models.Movie.findOne({
      where: {
        genres: {
          [db.Op.like]: `%${genre[0]}%`,
        },
        genres: {
          [db.Op.like]: `%${genre[1]}%`,
        },
        vote_average: {
          [db.Op.gt]: ratings
        },
        release_date: {
          [db.Op.between]: [releaseDate.split("-")[0], releaseDate.split("-")[1]]
        }
      },
      order: db.sequelize.literal('RAND()'),
      limit: 1
    });
    res.send(filterMovie);
  } catch (err) {
    console.log(err);
  }
};

const getMoviebyID = async (req, res) => {
  try {
    const movie = await db.models.Movie.findOne({
      where: { id : req.params.id}
    })
    res.send(movie);
  } catch (err) {
    console.log(err);
  }
};

export {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  rouletteSearch,
  filterSearch,
  getMoviebyID,
};
