import dbConfig from "./config/dbConfig.js";
import express, { urlencoded } from "express";
import db from "./models/index.js";
import cors from "cors";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import movieRouter from "./routes/MoviesRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(
  session({ secret: "secret", resave: true, saveUninitialized: true })
);
app.use(flash());

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
