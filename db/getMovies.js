import connection from "./connect.js";

const getRandomMovie = (req, res, next) => {
  const query = `SELECT * FROM movies WHERE id=775`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      req.randomMovie = result;
      next();
    }
  });
};

const getPopularMovie = (req, res) => {
  const query = `SELECT * FROM movies ORDER BY release_date DESC LIMIT 5`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      req.popularMovies = result;
      res.send({
        randomMovie: req.randomMovie,
        popularMovies: req.popularMovies
      })
    }
  });
//   res.send("Popular Movies");
};

const searchMovie = (req, res) => {
  res.send("Searched Movie");
};

const filterSearch = (req, res) => {
  res.send("Filter Search Movie");
};

export { getRandomMovie, getPopularMovie, searchMovie, filterSearch };
