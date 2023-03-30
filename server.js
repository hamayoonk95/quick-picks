// Imports the database configuration
import dbConfig from "./config/dbConfig.js";

// Imports necessary libraries and modules
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

// Using middleware to handle incoming requests and responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(
  session({ secret: "secret", resave: true, saveUninitialized: true })
);
app.use(flash());

// Syncing the database with the defined sequelize models
(async () => {
  await db.sequelize.sync();
})();

// Routes to handle different movie and user requests
app.use(movieRouter);
app.use(userRouter);

// Middleware to handle errors and not found requests
app.use(notFound);
app.use(errorHandler);

// Listening to the specified port for incoming requests
app.listen(dbConfig.PORT, () => {
  console.log("Server running on " + dbConfig.PORT);
});
