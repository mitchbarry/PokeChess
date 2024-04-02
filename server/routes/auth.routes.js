import { Router } from 'express';

import authController from '../controllers/auth.controller.js';

const router = Router();

router.route("/auth/register")
    .post(authController.registerUser)

router.route("/auth/login")
    .post(authController.loginUser)
    .get(authController.getUserInfo)

router.route("/auth/logout")
    .post(authController.logoutUser)

export default router;