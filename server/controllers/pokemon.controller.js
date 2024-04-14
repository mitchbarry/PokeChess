import axios from 'axios';
import fs from 'fs';
import path from 'path';

import Pokemon from "../models/Pokemon.model.js";

const pokemonController = {
    async createPokemon(req, res, next) {
        try {
            const newPokemon = await Pokemon.create(req.body);
            res.json(newPokemon);
        }
        catch (error) {
            next(error);
        }
    },

    async getAllPokemon(req, res, next) {
        try {
            const allPokemon = await Pokemon.find(); // here is our query to find Pokemon
            res.json(allPokemon);
        }
        catch (error) {
            next(error);
        }
    },

    async getSomePokemon(req, res, next) {
        try {
            const lowLimit = req.query.lowLimit;
            const filterType = req.query.filterType;
            let query = {
                pokedexNumber: { $gte: lowLimit }
            };
            if (filterType !== "") {
                query.types = { $in: filterType }; // Use filterType to filter Pokemon by type
            }
            const somePokemon = await Pokemon.find(query).limit(20);
            res.json(somePokemon);
        }
        catch (error) {
            next(error);
        }
    },

    async getOnePokemon(req, res, next) {
        try {
            const id = req.params.id;
            const foundPokemon = await Pokemon.findById(id);
            res.json(foundPokemon);
        }
        catch (error) {
            next(error);
        }
    },

    async updateOnePokemon(req, res, next) {
        const options = {
            new: true,
            runValidators: true
        }
        try {
            const id = req.params.id;
            const updatedPokemon = await Pokemon.findByIdAndUpdate(id, req.body, options);
            res.json(updatedPokemon)
        }
        catch (error) {
            next(error);
        }
    },


    async deleteOnePokemon(req, res, next) {
        try {
            const id = req.params.id;
            const deletedPokemon = await Pokemon.findByIdAndDelete(id);
            if (!deletedPokemon) {
                return res.status(404).json({ message: 'Pokemon not found' });
            }
            res.json(deletedPokemon);
        }
        catch (error) {
            next(error);
        }
    },

    async fetchPokemon(req, res, next) {
        const addAllPokemonToDb = async () => {
            try {
                const pokemonListResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
                const pokeNames = pokemonListResponse.data.results.map(p => p.name);
                for (let i = 0; i < pokeNames.length; i++) {
                    const pokemonDetailResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNames[i]}`);
                    const resData = pokemonDetailResponse.data;
                    let rarity;
                    if (resData.id < 46) {
                        rarity = 1;
                    }
                    else if (resData.id < 84) {
                        rarity = 2;
                    }
                    else if (resData.id < 114) {
                        rarity = 3;
                    }
                    else if (resData.id < 133) {
                        rarity = 4;
                    }
                    else {
                        rarity = 5;
                    }
                    let onePokemon = {
                        pokedexNumber: resData.id,
                        name: resData.species.name,
                        baseStats: {},
                        rarity,
                        abilities: resData.abilities.map(a => a.ability.name),
                        spriteFrontDefault: resData.sprites.front_default || null,
                        spriteOfficialArtwork: resData.sprites.other['official-artwork'].front_default || null,
                        types: resData.types.map(t => t.type.name)
                    };
                    for (let j = 0; j < resData.stats.length; j++) {
                        if (resData.stats[j].stat.name === "special-attack") {
                            onePokemon.baseStats['specialAttack'] = resData.stats[j].base_stat;
                        }
                        else if (resData.stats[j].stat.name === "special-defense") {
                            onePokemon.baseStats['specialDefense'] = resData.stats[j].base_stat;
                        }
                        else {
                            onePokemon.baseStats[resData.stats[j].stat.name] = resData.stats[j].base_stat;
                        }
                    }
                    const existingPokemon = await Pokemon.findOne({ pokedexNumber: onePokemon.pokedexNumber });
                    if (existingPokemon) {
                        
                        await Pokemon.findOneAndUpdate({ pokedexNumber: onePokemon.pokedexNumber }, onePokemon); // If the Pokemon exists, update it
                        console.log(`Pokemon ${onePokemon.name} updated in the database.`);
                    }
                    else {
                        await Pokemon.create(onePokemon); // If the Pokemon doesn't exist, create it
                        console.log(`Pokemon ${onePokemon.name} created in the database.`);
                    }
                    if (onePokemon.spriteFrontDefault) {
                        const imageURL = onePokemon.spriteFrontDefault;
                        const imageName = `${onePokemon.name}Front.png`;
                        const imagePath = path.join('../client/src/assets/pokemon', imageName);
    
                        if (fs.existsSync(imagePath)) {
                            console.log(`Image ${imageName} already exists. Skipping download.`);
                        }
                        else {
                            try {
                                const response = await axios.get(imageURL, { responseType: 'stream' });
                                const writer = fs.createWriteStream(imagePath);
                                response.data.pipe(writer);
                                await new Promise((resolve, reject) => {
                                    writer.on('finish', resolve);
                                    writer.on('error', reject);
                                });
                                console.log(`Image ${imageName} downloaded successfully!`);
                            }
                            catch (error) {
                                console.error(`Error downloading image ${imageName}:`, error);
                                next(error)
                            }
                        }
                    }
                    if (onePokemon.spriteOfficialArtwork) {
                        const imageURL = onePokemon.spriteOfficialArtwork;
                        const imageName = `${onePokemon.name}Official.png`;
                        const imagePath = path.join('../client/src/assets/pokemon', imageName);
                        if (fs.existsSync(imagePath)) {
                            console.log(`Image ${imageName} already exists. Skipping download.`);
                        }
                        else {
                            try {
                                const response = await axios.get(imageURL, { responseType: 'stream' });
                                const writer = fs.createWriteStream(imagePath);
                                response.data.pipe(writer);
                                await new Promise((resolve, reject) => {
                                    writer.on('finish', resolve);
                                    writer.on('error', reject);
                                });
                                console.log(`Image ${imageName} downloaded successfully!`);
                            }
                            catch (error) {
                                console.error(`Error downloading image ${imageName}:`, error);
                                next(error)
                            }
                        }
                    }
                }
            }
            catch (error) {
                next(error);
            }
        };
        await addAllPokemonToDb();
    }
}

export default pokemonController;