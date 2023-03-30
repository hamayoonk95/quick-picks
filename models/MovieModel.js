// Defines a sequelize model for the "movies" table
export default (sequelize, DataTypes) => {
  const Movie = sequelize.define("movies", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tmdb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genres: {
      type: DataTypes.STRING,
    },
    original_language: {
      type: DataTypes.CHAR(2),
    },
    overview: {
      type: DataTypes.TEXT,
    },
    popularity: {
      type: DataTypes.FLOAT,
    },
    release_date: {
      type: DataTypes.INTEGER,
    },
    runtime: {
      type: DataTypes.INTEGER,
    },
    vote_average: {
      type: DataTypes.FLOAT,
    },
    credits: {
      type: DataTypes.TEXT,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    backdrop_path: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
  });

  // Define the association between the Movie model and the User model
  Movie.associate = function(models) {
    Movie.belongsToMany(models.User, {
      through: models.User_movies, // using the User_movies table as the join table
      foreignKey: "id" // foreign key for the Movie model in the join table
    });
  };

  return Movie;
}
