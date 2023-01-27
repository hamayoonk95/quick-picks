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

  return Movie;
}
