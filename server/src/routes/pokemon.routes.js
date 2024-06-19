import { Router } from 'express';

import pokemonController from '../controllers/pokemon.controller.js';

const router = Router();

router.route('/all')
    .get(pokemonController.getAllPokemon);

router.route('/some')
    .get(pokemonController.getSomePokemon);

router.route('/:id')
    .get(pokemonController.getOnePokemon)
    .put(pokemonController.updateOnePokemon);

// router.route('/create')
//     .post(pokemonController.createOnePokemon);

router.route('/fetch')
    .get(pokemonController.fetchPokemon);

export default router;