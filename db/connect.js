import mysql from "mysql";
import config from "../config/config.js";

const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) {
    console.log("Error connection to MySQL server:", err.stack);
    return;
  }
  console.log("Connected to MySQL server.");
});

export default connection;
