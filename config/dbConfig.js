import dotenv from 'dotenv';
dotenv.config();;

export default {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DATABASE: process.env.MYSQL_DATABASE,
    PORT: process.env.SERVER_PORT || 5000,
    DIALECT: 'mysql'    
};