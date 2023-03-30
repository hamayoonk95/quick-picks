import jwt from "jsonwebtoken";

export const vertifyToken = (req, res, next) => {
    // extracts the token from the "Authorization" header and checks if it is present
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    // If the token is present, verifies it using the secret key and decodes it to get the user ID
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.sendStatus(403).json({msg: "Not Authorized"});
        //If verification is successful, sets the user ID in the request object and calls the next middleware function
        req.user_id = decode.user_id;
        next();
    })
}