import connection from "./connect.js";

const loginUser = (req, res) => {
  const [username, password] = req.body;
  const query = `SELECT * FROM users WHERE username = ${username} AND password = ${password}`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export { loginUser };
