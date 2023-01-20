import connection from "./connect.js";
import genreMapping from "./genreMapping.js";

const getRandomMovie = (req, res) => {
  let rand = Math.floor(Math.random() * 200000);
  // const query = `SELECT * FROM movies WHERE RAND() < (SELECT ((1 / COUNT(*)) * 10) FROM movies) LIMIT 1`;
  const query = `SELECT * FROM movies WHERE poster_path != '' AND RAND() < (SELECT ((1 / COUNT(*)) * 10) FROM movies) LIMIT 1`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getPopularMovie = (req, res) => {
  const query = `SELECT * FROM movies WHERE popularity IS NOT NULL ORDER BY popularity DESC LIMIT 20`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const searchMovie = (req, res) => {
  if (req.query.query) {
    const input = req.query.query;
    const query = `SELECT * FROM movies WHERE (title LIKE '%${input}%' OR genres LIKE '%${input}%') ORDER BY popularity DESC LIMIT 4`;
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send([]);
  }
};

const rouletteSearch = (req, res) => {
  if (req.query.query) {
    const input = req.query.query;
    const query = `SELECT * FROM movies WHERE title LIKE '%${input}%' ORDER BY popularity DESC LIMIT 4`;
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send([]);
  }
};

const filterSearch = (req, res) => {
  const { mood, timeOfDay, ratings, occassion, releaseDate } = req.query;
  const genre = genreMapping[mood][timeOfDay][occassion];
  const query = `SELECT * FROM movies WHERE (genres LIKE '%${genre[0]}%' AND genres LIKE '%${genre[1]}%') AND vote_average > ${ratings} AND release_date BETWEEN '${releaseDate.split('-')[0]}' AND '${releaseDate.split('-')[1]}' ORDER BY RAND() LIMIT 1`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getMoviebyID = (req, res) => {
  const query = `SELECT * FROM movies WHERE id=${req.params.id}`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export {
  getRandomMovie,
  getPopularMovie,
  searchMovie,
  rouletteSearch,
  filterSearch,
  getMoviebyID,
};
