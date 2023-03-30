import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// handles login request
const Login = async (req, res) => {
  let responseSent = false;
  const { username, password } = req.body;

  // check if both username and password are provided
  if (!username || !password) {
    res.status(400).json({ error: "Username and Password are required" });
    responseSent = true;
  }
  try {
    // Find the user with the given username in the database
    const user = await db.User.findOne({
      where: {
        username: username,
      },
    });
    // If the user exists, check if the password matches
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      // If the password does not match, send an error response
      if (!isMatch) {
        res.status(400).json({ error: "Wrong Credentials" });
        responseSent = true;
      }
      const user_id = user.user_id;
      // Create a new access token with the user's id and username as payload
      const accessToken = jwt.sign(
        { user_id, username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );
      // Create a new refresh token with the user's id and username as payload
      const refreshToken = jwt.sign(
        { user_id, username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      // Update the user's refresh token in the database
      await db.User.update(
        { refresh_token: refreshToken },
        {
          where: {
            user_id: user_id,
          },
        }
      );
      // Set the refresh token as a cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Send the access token as a response
      res.json({ accessToken });
    } else {
      // If the user does not exist, send an error response
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (error) {
    // If an error occurred, send an error response
    if (!responseSent) res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles registration request
const Register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
   // Check if all required fields were provided
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  // Check if the email address is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  // Check if the password is at least 6 characters long
  if (!validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }
  // Check if a user with the same username or email address already exists in the database
  const existingUser = await db.User.findOne({
    where: {
      [db.Op.or]: [{ username: username }, { email: email }],
    },
  });
  // if username or email already exists send error
  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(400).json({ error: "Username already exists" });
    } else if (existingUser.email === email) {
      return res.status(400).json({ error: "Email address already exists" });
    }
  }

  try {
    // hash and salt the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // query to create a user with the data from the form
    await db.User.create({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });
    // if successful, send success response
    res.json({ success: "Registration Successful" });
  } catch (error) {
    // if error, send error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handle logout request
const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  //If there is no refreshToken in the cookies, return status 204
  if (!refreshToken) return res.sendStatus(204);
  // Query to find user with the refreshToken
  const user = await db.User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  // if no user found with given refreshToken, send 204 status
  if (!user[0]) return res.sendStatus(204);
  const user_id = user[0].user_id;
  // query to update refreshTOken to null where user id matches
  await db.User.update(
    { refresh_token: null },
    {
      where: {
        user_id: user_id,
      },
    }
  );
  // clear the refreshToken from cookies
  res.clearCookie("refreshToken");
  return res.status(200);
};

// Handle movie watch history by a specific user
const getUserMovies = async (req, res) => {
  try {
    // query to get all movies from the junction table that belongs to the user
    const usersMovies = await db.User.findAll({
      where: {
        user_id: req.user_id,
      },
      include: [
        {
          model: db.User_movies,
          attributes: ["movie_id", "user_id"],
          required: false,
          include: [
            {
              model: db.Movie,
              required: true,
            },
          ],
        },
      ],
    });
    // if nothing found, send 404 error
    if (!usersMovies) {
      return res.status(404).send("User not found");
    }
    // send username and the movies as response
    res.json({
      username: usersMovies[0].username,
      movies: usersMovies[0].user_movies,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};

// function to add movies to a user's watchlist
const watchMovie = async (req, res) => {
  try {
    // Query to create a record in User_movies table if it does not exist
    const [userMovie, created] = await db.User_movies.findOrCreate({
      where: {
        movie_id: req.body.movie_id,
        user_id: req.user_id,
      },
      defaults: {
        movie_id: req.body.movie_id,
        user_id: req.user_id,
      },
    });
    // if record not created send, 409 error movie already watched
    if (!created) {
      return res.status(409).json({
        error: "Movie already watched",
      });
    }
    // else send success response 
    return res.status(201).json({
      success: "Movie added to watchlist",
    });
  } catch (error) {
    // if error, send error 500 with internal server error message
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export { Login, Register, getUserMovies, Logout, watchMovie };
