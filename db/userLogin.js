import connection from "./connect.js";

const loginUser = (req, res) => {
  const [username, password] = req.body;
  console.log(req.query);
  console.log(req.body);
  const query = `SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.redirect('/');
    }
  });
};

export { loginUser };
