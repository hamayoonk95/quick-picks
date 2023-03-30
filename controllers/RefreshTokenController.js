import db from "../models/index.js";
import jwt from "jsonwebtoken";

// async function that handles the refreshToken logic
export const refreshToken = async (req, res) => {
  try {
    //get refreshToken from request cookies
    const refreshToken = req.cookies.refreshToken;
    // if not refreshToken, return 401 unauthorized status
    if (!refreshToken) return res.sendStatus(401);
    // query the database to find the user associated with the refreshToken
    const user = await db.User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    // if user is not found, return a 403 forbidden status
    if (!user[0]) return res.sendStatus(403);
    // Verifying the refresh token with the secret key and decoding the user ID and username from the token payload
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        // If the token verification fails, return a 403 Forbidden status
        if (err) return res.sendStatus(403);
        // Gets the user ID from the database query
        const user_id = user[0].user_id;
        // Gets the username from the database query
        const username = user[0].username;
        // Generates a new access token with the user ID and username as payload, and a 1000s expiration time
        const accessToken = jwt.sign(
          { user_id, username },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1000s",
          }
        );
        // Send the new access token as a JSON response
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
