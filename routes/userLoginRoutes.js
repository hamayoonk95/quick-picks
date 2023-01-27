import express from "express";
import { Login } from "../controllers/userLogin.js";

const router = express.Router();

router.route("/user-login").post(Login);
// router.route('/create-account').get();

export default router;
