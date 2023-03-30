// Defines a sequelize model for the join/junction "user_movies" table
export default (sequelize, DataTypes) => {
  const UserMovie = sequelize.define(
    "user_movies",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "movies",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      timestamps: false,
    }
  );

  
  UserMovie.associate = (models) => {
    // Define the association between the User model and the user_movies model
    UserMovie.belongsTo(models.User, {
      foreignKey: "user_id", // foreign key for the User model in the join table
      targetKey: "user_id", // target the primary key of the user table
      onDelete: "CASCADE", // delete record if user is deleted
    });
    // Define the association between the Movies model and the user_movies model
    UserMovie.belongsTo(models.Movie, {
      foreignKey: "movie_id", // foreign key for the Movie model in the join table
      targetKey: "id", // target the primary key of the movies table
      onDelete: "CASCADE", // delete record if movie is deleted
    });
  };

  return UserMovie;
};
