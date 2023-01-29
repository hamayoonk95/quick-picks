import jwt from "jsonwebtoken";

export const vertifyToken = (req, res, next) => {
    const authHeader = req.header['authorization'];
    console.log("Autttttt "+authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.sendStatus(403).json({msg: "Not Authorized"});
        req.userId = decode.user_id;
        next();
    })
}