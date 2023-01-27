import db from "../models/index.js";

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.models.User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    // console.log(user);
    if (user) {
      res.send("Yes");
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export { Login };
