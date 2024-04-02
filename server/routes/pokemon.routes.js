import { Router } from "express";

import pokemonController from "../controllers/pokemon.controller.js";

const router = Router();

router.route("/pokemon/fetch")
    .get(pokemonController.fetchPokemon)

router.route("/pokemon")
    .get(pokemonController.getAllPokemon)

router.route("/pokemon/some")
    .get(pokemonController.getSomePokemon)

router.route("/pokemon/:id")
    .get(pokemonController.getOnePokemon)
    .put(pokemonController.updateOnePokemon)

export default router;