import { Router } from 'express';

import userController from '../controllers/user.controller.js';

const router = Router();

router.route('/')
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getOneUser)
    .put(userController.updateOneUser)
    .delete(userController.deleteOneUser);

export default router;