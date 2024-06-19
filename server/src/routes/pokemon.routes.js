import { Router } from 'express';

import pokemonController from '../controllers/pokemon.controller.js';

const router = Router();

router.route('/')
    .get(pokemonController.getAllPokemon);
//  .post(pokemonController.createOnePokemon);

router.route('/some')
    .get(pokemonController.getSomePokemon);

router.route('/:id')
    .get(pokemonController.getOnePokemon)
    .put(pokemonController.updateOnePokemon);

router.route('/fetch')
    .get(pokemonController.fetchPokemon);

export default router;