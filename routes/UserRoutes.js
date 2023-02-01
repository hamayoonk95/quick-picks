import express from "express";
import { Login, Register, getUserMovies, Logout } from "../controllers/UserController.js";
import { vertifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshTokenController.js";

const router = express.Router();

router.route("/user-login").post(Login);
router.route("/token").get(refreshToken);
router.route("/user-register").post(Register);
router.route('/analytics').get(vertifyToken, getUserMovies);
router.route('/logout').delete(Logout);

export default router;
