import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import Movie from './Movie.js';
import User from './User.js'

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
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

const db = {};
db.sequelize = sequelize;
db.Op = Sequelize.Op;
db.models = {};
db.models.Movie = Movie(sequelize, Sequelize.DataTypes);
db.models.User = User(sequelize, Sequelize.DataTypes);

export default db;
