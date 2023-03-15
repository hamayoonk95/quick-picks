import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import movies1 from "./seedData/movies1.js"
import movies2 from "./seedData/movies2.js";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to MySQL server!');
  connection.query('CREATE DATABASE IF NOT EXISTS quickpicks', function (err) {
    if (err) throw err;
    console.log('quickpicks database created');
    connection.changeUser({ database: 'quickpicks' }, function (err) {
      if (err) throw err;
      console.log('Using quickpicks database');
      const moviesTableSql = `
        CREATE TABLE IF NOT EXISTS movies (
          id int NOT NULL AUTO_INCREMENT,
          tmdb_id int NOT NULL,
          title varchar(255) NOT NULL,
          genres varchar(255) DEFAULT NULL,
          original_language char(2) DEFAULT NULL,
          overview longtext,
          popularity float DEFAULT NULL,
          release_date int DEFAULT NULL,
          runtime int DEFAULT NULL,
          vote_average float DEFAULT NULL,
          credits longtext,
          poster_path varchar(255) DEFAULT NULL,
          backdrop_path varchar(255) DEFAULT NULL,
          PRIMARY KEY (id)
        );
      `;
      connection.query(moviesTableSql, function (err) {
        if (err) throw err;
        console.log('movies table created');
      });

      const usersTableSql = `
        CREATE TABLE IF NOT EXISTS users (
          user_id int NOT NULL AUTO_INCREMENT,
          username varchar(255) NOT NULL,
          password varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          first_name varchar(255) DEFAULT NULL,
          last_name varchar(255) DEFAULT NULL,
          created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          refresh_token text,
          PRIMARY KEY (user_id),
          UNIQUE KEY email (email)
        );
      `;
      connection.query(usersTableSql, function (err) {
        if (err) throw err;
        console.log('users table created');
      });

      const userMoviesTableSql = `
        CREATE TABLE IF NOT EXISTS user_movies (
          id int NOT NULL AUTO_INCREMENT,
          user_id int DEFAULT NULL,
          movie_id int DEFAULT NULL,
          userUserId int DEFAULT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY unique_user_movie (user_id, movie_id),
          KEY movie_id (movie_id),
          KEY userUserId (userUserId),
          CONSTRAINT user_movies_ibfk_1 FOREIGN KEY (id) REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT user_movies_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT user_movies_ibfk_3 FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT user_movies_ibfk_4 FOREIGN KEY (userUserId) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `;
      connection.query(userMoviesTableSql, function (err) {
        if (err) throw err;
        console.log('user_movies table created');
        console.log('All tables created successfully!');
      });


      const insertMoviesSql = `
        INSERT INTO movies (tmdb_id, title, genres, original_language, overview, popularity, release_date, runtime, vote_average, credits, poster_path, backdrop_path)
        VALUES ?
      `;

      const moviesValues1 = movies1.map(movie => [
        movie.tmdb_id,
        movie.title,
        movie.genres,
        movie.original_language,
        movie.overview,
        movie.popularity,
        movie.release_date,
        movie.runtime,
        movie.vote_average,
        movie.credits,
        movie.poster_path,
        movie.backdrop_path
      ]);

      connection.query(insertMoviesSql, [moviesValues1], function (error, results, fields) {
        if (error) throw error;
        console.log('Movies1 inserted successfully!');

      });

      const moviesValues2 = movies2.map(movie => [
        movie.tmdb_id,
        movie.title,
        movie.genres,
        movie.original_language,
        movie.overview,
        movie.popularity,
        movie.release_date,
        movie.runtime,
        movie.vote_average,
        movie.credits,
        movie.poster_path,
        movie.backdrop_path
      ]);

      connection.query(insertMoviesSql, [moviesValues2], function (error, results, fields) {
        if (error) throw error;
        console.log('Movies2 inserted successfully!');
        connection.end();
      });

      // const users = [
      //   {
      //     username: 'johndoe',
      //     password: 'password123',
      //     email: 'johndoe@example.com',
      //     first_name: 'John',
      //     last_name: 'Doe'
      //   }
      // ];

      // const salt = bcrypt.genSalt();
      // const hashedPassword = bcrypt.hash(users[0].password, salt);
      // users[0].password = hashedPassword;

      // connection.query('INSERT INTO users SET ?', users, (err, results) => {
      //     if(err) throw err;
      //     console.log("Added user: ", results.insertId);

      //     const user_id = results.insertId;
      //     const movie_ids = [1,2,3,4,5];

      //     const userMovies = [];

      //     for (let i = 0; i < movie_ids.length; i++) {
      //       const userMovie = {
      //         user_id: user_id,
      //         movie_id: movie_ids[i]
      //       };
      //       userMovies.push(userMovie);
      //     };
      //     console.log(userMovies);
      //     connection.query('INSERT INTO user_movies SET ?', userMovies, function (err, results) {
      //       if (err) throw err;
      //       console.log('Added user movies:', results.affectedRows);
      //       connection.end();
      //     });
      // })
    });
  });
});
