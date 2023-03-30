// Defines a sequelize model for the "users" table
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  // Define the association between the User model and the Movie model
  User.associate = function (models) {
    User.hasMany(models.User_movies, {
      foreignKey: "user_id", // foreign key for the User model in the join table
      onDelete: "CASCADE", // Delete records in the join table if user is deleted
    });
  };

  return User;
};
