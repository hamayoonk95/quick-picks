// Imports Sequelize and database configuration file
import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";
// Imports models
import Movie from "./MovieModel.js";
import User from "./UserModel.js";
import User_movies from "./UserMoviesModel.js";

const db = {};

// Creates a new instance of Sequelize
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

// Creates a new instance of Sequelize
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

// Initializes models and adding them to the db object
db.Movie = Movie(sequelize, Sequelize.DataTypes);
db.User = User(sequelize, Sequelize.DataTypes);
db.User_movies = User_movies(sequelize, Sequelize.DataTypes);

// Sets up associations between models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adds sequelize instance and Sequelize.Op to the db object
db.sequelize = sequelize;
db.Op = Sequelize.Op;

export default db;
