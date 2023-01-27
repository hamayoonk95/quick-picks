import dbConfig from "./config/dbConfig.js";
import express, { urlencoded } from "express";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import movieRouter from "./routes/moviesRoutes.js";
// import userRouter from "./routes/userLoginRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: false }));


app.use(movieRouter);
// app.use(userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server running on " + 8000);
});
