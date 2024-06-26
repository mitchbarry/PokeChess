import { Router } from 'express';

import lobbyController from '../controllers/lobby.controller.js';

const router = Router();

router.route('/')
    .get(lobbyController.getAllLobbies)
    .post(lobbyController.createOneLobby);

router.route('/user/:userId')
    .get(lobbyController.getUserLobbies);

router.route('/:id')
    .get(lobbyController.getOneLobby)
    .put(lobbyController.updateOneLobby)
    .delete(lobbyController.deleteOneLobby);

export default router;