import jwt from "jsonwebtoken";
import db from "../models/index.js";

const checkAuth = (req, res, next) => {
    const accessToken = req.headers["authorization"].split(" ")[1];
    if(accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            } else {
                req.user = await db.models.User.findOne({ where: { user_id: decoded.userId } })
                next();
            }
            });
        } else {
            return res.status(401).json({ message: "Not authenticated" });
    }
};

export default checkAuth;