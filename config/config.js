import dotenv from 'dotenv';
dotenv.config();;

const config = {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  port: process.env.SERVER_PORT || 5000
};

export default config;