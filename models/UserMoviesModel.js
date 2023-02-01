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
    UserMovie.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      onDelete: "CASCADE",
    });
    UserMovie.belongsTo(models.Movie, {
      foreignKey: "movie_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };

  return UserMovie;
};
