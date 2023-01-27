import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const accessToken = req.headers["authorization"].split(" ")[1];
    console.log(accessToken);
    if(accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            } else {
                req.loggedIn = true;
                next();
            }
            });
        } else {
            return res.status(401).json({ message: "Not authenticated" });
    }
};

export default checkAuth;