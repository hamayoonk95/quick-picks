import connection from "./connect.js";

const getRandomMovie = (req, res) => {
  let rand = Math.floor(Math.random() * 200000);
  const query = `SELECT * FROM movies WHERE RAND() < (SELECT ((1 / COUNT(*)) * 10) FROM movies) LIMIT 1`;
  // const query = `select * from movies where id=${rand}`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  });
};

const getPopularMovie = (req, res) => {
  const query = `SELECT * FROM movies where popularity is not null order by popularity desc limit 20`;
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
