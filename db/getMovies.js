import connection from "./connect.js";

const getRandomMovie = (req, res) => {
  let rand = Math.floor(Math.random() * 50000);
  // const query = "SELECT * FROM movies1 WHERE original_language = 'en' AND poster_path IS NOT NULL AND release_date > '2010' ORDER BY RAND() LIMIT 1";
  const query = `SELECT * FROM movies WHERE vote_average > 5 AND release_date > 2020 AND (original_language = 'en' OR original_language = 'uk') AND genres NOT LIKE '%music%' ORDER BY RAND() LIMIT 1`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  });
};

const getPopularMovie = (req, res) => {
  const query = `SELECT * FROM popular_movies`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const searchMovie = (req, res) => {
  res.send("Searched Movie");
};

const filterSearch = (req, res) => {
  res.send("Filter Search Movie");
};

export { getRandomMovie, getPopularMovie, searchMovie, filterSearch };
