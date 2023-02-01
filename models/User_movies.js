export default (sequelize, DataTypes) => {
  const UserMovie = sequelize.define(
    "user_movies",
    {
     
    },
    {
      timestamps: false,
    }
  );

  // UserMovie.associate = models => {
  //     UserMovie.belongsToMany(models.Movie, {
  //         foreignKey: "movie_id",
  //         as: "movies",
  //         onDelete: "CASCADE",
  //     });
  //     UserMovie.belongsToMany(models.User, {
  //         foreignKey: "user_id",
  //         as: "users",
  //         onDelete: "CASCADE",
  //     });
  // }

  return UserMovie;
};
