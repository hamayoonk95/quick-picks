import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.models.User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      console.log(user.user_id);
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const user_id = user.user_id;
        const username = user.username;
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
        await db.models.User.update(
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
      }
    } else {
      res.status(400).json("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const Register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await db.models.User.create({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

const Logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.sendStatus(204);
  const user = await db.models.User.findAll({
    where: {
      refresh_token: refreshToken
    }
  });
  if(!user[0]) return res.sendStatus(204);
  const user_id = user[0].user_id;
  await db.models.User.update({refresh_token: null}, {
    where: {
      user_id: user_id
    }
  });
  res.clearCookie('refreshToken');
  return res.status(200);
}

const getUser = async (req, res) => {
  try {
    console.log(req.user_id);
    const user = await db.models.User.findOne({
      where: { user_id: req.user_id },
    }); // find user in users table
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ isAuthenticated: true, user: user }); // send user data
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};

export { Login, Register, getUser, Logout };
