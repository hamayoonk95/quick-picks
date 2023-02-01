import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import Movie from "./Movie.js";
import User from "./User.js";
import User_movies from "./User_movies.js";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import path from "path";
// const __filename = fileURLToPath(import.meta.url);
// const basename = path.basename(__filename);
// const __dirname = path.dirname(__filename);

const db = {};

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

//   fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(async (file) => {
//     const model = await import(path.join(__dirname, file))(sequelize, Sequelize);
//     console.log(model);
//     db[model.name] = model;
//   });

//   console.log(db);
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.models = {};
db.models.Movie = Movie(sequelize, Sequelize.DataTypes);
db.models.User = User(sequelize, Sequelize.DataTypes);
db.models.User_movies = User_movies(sequelize, Sequelize.DataTypes);

db.models.Movie.belongsToMany(db.models.User, {
  through: db.models.User_movies
});

db.models.User.belongsToMany(db.models.Movie, {
  through: db.models.User_movies
});
db.models.User.hasMany(db.models.User_movies, { foreignKey: 'userUserId' });
db.models.User_movies.belongsTo(db.models.User, { foreignKey: 'userUserId' });
db.models.User_movies.belongsTo(db.models.Movie, { foreignKey: 'movieId' });


// db.models.User_movies.belongsTo(db.models.Movie, {
//   foreignKey: "movie_id",
// });

// db.models.User_movies.belongsTo(db.models.User, {
//   foreignKey: "user_id",
// });








db.sequelize = sequelize;
db.Op = Sequelize.Op;

// db.models.Movie.belongsToMany(db.models.User, { through: 'User_movies' });
// db.models.User.belongsToMany(db.models.Movie, { through: 'User_movies' });

export default db;
