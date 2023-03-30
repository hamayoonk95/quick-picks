import genreMapping from "../middleware/genreMapping.js";
import db from "../models/index.js";

//function to get a random movie
const getRandomMovie = async (req, res) => {
  try {
    // Get the count of the movies where poster_path is not null
    const count = await db.Movie.count({
      where: { poster_path: { [db.Op.ne]: null } },
    });
    // Get a random movie from the database
    const randomMovie = await db.Movie.findOne({
      offset: Math.floor(Math.random() * count),
      limit: 1,
    });
    // Send the movie as a response
    res.send(randomMovie);
  } catch (err) {
    console.log(err);
  }
};

//function to get popular movies
const getPopularMovie = async (req, res) => {
  try {
    // find all movies where popularity column is not null, order them by descending order and limit the results by 20
    const popularMovies = await db.Movie.findAll({
      where: { popularity: { [db.Op.ne]: null } },
      order: [["popularity", "DESC"]],
      limit: 20,
    });
    // send the popular movies as a response
    res.send(popularMovies);
  } catch (error) {
    console.log(error);
  }
};

// function to search movies by title or genre
const searchMovie = async (req, res) => {
  if (req.query.query) {
    try {
      // get the input from the query parameter
      const input = req.query.query;
      // find all movies where title or genre match the input, order by descending order and limit by 4
      const searchedMovies = await db.Movie.findAll({
        where: {
          [db.Op.or]: [
            { title: { [db.Op.like]: `%${input}%` } },
            { genres: { [db.Op.like]: `%${input}%` } },
          ],
        },
        order: [["popularity", "DESC"]],
        limit: 4,
      });
      // send the searchedMovies as a response
      res.send(searchedMovies);
    } catch (err) {
      console.log(err);
    }
  } else {
    // send an empty array if there is no input
    res.send([]);
  }
};

// function to search movies by title for the roulette search
const rouletteSearch = async (req, res) => {
  if (req.query.query) {
    const input = req.query.query;
    try {
      // find all movies where the title matches the input, order by descending and limit to 10
      const rouletteSearchMovies = await db.Movie.findAll({
        where: {
          [db.Op.or]: [
            { title: { [db.Op.like]: `%${input}%` } },
          ],
        },
        order: [["popularity", "DESC"]],
        limit: 10,
      });
      // send the results as a response
      res.send(rouletteSearchMovies);
    } catch (err) {
      console.log(err);
    }
  } else {
    // send an empty array if there is no input
    res.send([]);
  }
};

// function to filter movies by mood, time of day, rating, occasion and release date
const filterSearch = async (req, res) => {
  const { mood, timeOfDay, ratings, occassion, releaseDate } = req.query;
  // get the genre based on the factors
  const genre = genreMapping[mood][timeOfDay][occassion];
  try {
    // find a random movie where the factors match the movie 
    const filterMovie = await db.Movie.findOne({
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
    // send the result as a response
    res.send(filterMovie);
  } catch (err) {
    console.log(err);
  }
};

// function to get movie by ID
const getMoviebyID = async (req, res) => {
  try {
    // find a movie where id matches the id from the request object
    const movie = await db.Movie.findOne({
      where: { id : req.params.id}
    })
    //send the movie as response
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
