import { Router } from 'express'

import authController from '../controllers/auth.controller.js'

const router = Router()

router.route('/auth/register')
    .post(authController.registerUser)

router.route('/auth/login')
    .post(authController.loginUser)

router.route('/auth/logout')
    .post(authController.logoutUser)

router.route('/auth/validate')
    .post(authController.validateUser)

router.route('/auth/checkAuthCookie')
    .get(authController.checkAuthCookie)

export default router