import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import Movie from "./MovieModel.js";
import User from "./UserModel.js";
import User_movies from "./UserMoviesModel.js";

const db = {};

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


db.Movie = Movie(sequelize, Sequelize.DataTypes);
db.User = User(sequelize, Sequelize.DataTypes);
db.User_movies = User_movies(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Op = Sequelize.Op;

export default db;
