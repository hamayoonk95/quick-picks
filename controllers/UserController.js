import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const Login = async (req, res) => {
  let responseSent = false;
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Username and Password are required" });
    responseSent = true;
  }
  try {
    const user = await db.User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Wrong Credentials" });
        responseSent = true;
      }
      const user_id = user.user_id;
      const accessToken = jwt.sign(
        { user_id, username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );
      const refreshToken = jwt.sign(
        { user_id, username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      await db.User.update(
        { refresh_token: refreshToken },
        {
          where: {
            user_id: user_id,
          },
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (error) {
    if (!responseSent) res.status(500).json({ error: "Internal Server Error" });
  }
};

const Register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  const existingUser = await db.User.findOne({
    where: {
      [db.Op.or]: [{ username: username }, { email: email }],
    },
  });

  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(400).json({ error: "Username already exists" });
    } else if (existingUser.email === email) {
      return res.status(400).json({ error: "Email address already exists" });
    }
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.User.create({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.json({ success: "Registration Successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await db.User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const user_id = user[0].user_id;
  await db.User.update(
    { refresh_token: null },
    {
      where: {
        user_id: user_id,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200);
};

const getUserMovies = async (req, res) => {
  try {
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
    if (!usersMovies) {
      return res.status(404).send("User not found");
    }
    res.json({
      username: usersMovies[0].username,
      movies: usersMovies[0].user_movies,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};

const watchMovie = async (req, res) => {
  try {
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

    if (!created) {
      return res.status(409).json({
        error: "Movie already watched",
      });
    }
    return res.status(201).json({
      success: "Movie added to watchlist",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export { Login, Register, getUserMovies, Logout, watchMovie };
