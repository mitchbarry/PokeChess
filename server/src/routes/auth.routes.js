import { Router } from 'express'

import authController from '../controllers/auth.controller.js'

const router = Router()

router.route('/register')
    .post(authController.registerUser)

router.route('/login')
    .post(authController.loginUser)

router.route('/logout')
    .post(authController.logoutUser)

router.route('/validate')
    .post(authController.validateUser)
    .get(authController.checkAuthCookie)

export default router