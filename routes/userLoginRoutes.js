import express from 'express';
import { loginUser } from '../db/userLogin';

const router = express.Router();

router.route('/user-login').get(loginUser);
// router.route('/create-account').get();


export default router;