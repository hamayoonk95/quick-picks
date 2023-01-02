import config from "./config/config.js";
import express from 'express';
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import connection from "./db/connect.js";

const app = express();

app.get("/", (req, res) => {
    const query = "SELECT * FROM movies WHERE id=775";
    connection.query(query, (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      } 
    });
  });

app.use(notFound);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log("Server running on " + config.port);
})