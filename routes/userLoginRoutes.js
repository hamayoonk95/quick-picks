import express from "express";
import { Login, Register, getUser } from "../controllers/userLogin.js";
import { vertifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/user-login").post(Login);
router.route("/token").get(refreshToken);
router.route("/user-register").post(Register);
// router.route('/account').get(getUser);
router.route('/analytics').get(vertifyToken, getUser);

export default router;
