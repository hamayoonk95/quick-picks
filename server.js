import config from "./config/config.js";
import express from 'express';
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import connection from "./db/connect.js";

const app = express();

import movieRouter from './routes/moviesRoutes.js';

app.use(movieRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log("Server running on " + config.port);
})