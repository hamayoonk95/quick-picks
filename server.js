import dbConfig from "./config/dbConfig.js";
import express, { urlencoded } from "express";
import db from "./models/index.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import movieRouter from "./routes/moviesRoutes.js";
import userRouter from "./routes/userLoginRoutes.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


(async () => {
  await db.sequelize.sync();
})();


app.use(movieRouter);
app.use(userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(dbConfig.PORT, () => {
  console.log("Server running on " + dbConfig.PORT);
});
