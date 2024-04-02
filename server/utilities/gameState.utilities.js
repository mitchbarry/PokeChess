import Lobby from "../models/lobby.model.js";
import Pokemon from "../models/Pokemon.model.js";

const gameStateUtilities = {
    async addUserToLobby(lobby, user) {
        /*lobby.gameState.players.push({ THIS IS COMMENTED OUT BC ITS NOT HOOKED UP TO DATABASE
            userId: user._id,
            username: user.username,
            health: 100,
            gold: 0,
            board: [gameStateUtilities.getPokemonObject(user.favoritePokemon)],
            bench: [],
            experience: 0,
            shop: []
        }) */
        let updatedLobby;
        const options = {
            new: true,
            runValidators: true,
        };
        try {
            console.log("Adding user to players list...");
            updatedLobby = await Lobby.findByIdAndUpdate(lobby._id, lobby, options);
        }
        catch (error) {
            throw(error)
        }
        return updatedLobby;
    },

    async removeUserFromLobby(socketInfo) {
        let updatedLobby;
        try {
            updatedLobby = await Lobby.findById(socketInfo.lobbyId);
        }
        catch (error) {
            throw(error);
        }
        const userIndex = updatedLobby.gameState.players.findIndex(player => player.userId === socketInfo.userId);
        if (userIndex !== -1) {
            updatedLobby.gameState.players.splice(userIndex, 1); // Remove user from players array
            try {
                const options = {
                    new: true,
                    runValidators: true,
                };
                console.log("Attempting to remove user from players list...")
                await Lobby.findByIdAndUpdate(updatedLobby._id, updatedLobby, options);
            }
            catch (error) {
                throw(error);
            }
        }
        return updatedLobby;
    },

    async refreshShop(gameState, experience) {
        const shopRarities = gameStateUtilities.getShopRarities(experience);
        let newShop = [];
        for (let i = 0; i < 5; i++) {
            const randomRarity = Math.floor(Math.random() * 100); // returns a number 0-99
            let rarity = 0;
            for (let i = 1; i < 6; i++) {
                if (randomRarity < shopRarities[i]) {
                    rarity = i;
                    break;
                }
            }
            console.log("rarity: "+ rarity)
            const randomPokemon = Math.floor(Math.random() * gameState.pool[rarity][0]); // returns a number 0 - the total number of pokemon in the pool of that rarity
            console.log("randomPokemon: "+ randomPokemon)
            const pokemonNumber = gameStateUtilities.getKeyFromNumber(randomPokemon, gameState.pool[rarity]);
            console.log("pokemonNumber: "+ pokemonNumber)
            gameState.pool[rarity][0] -= 1;
            gameState.pool[rarity][pokemonNumber] -= 1;
            newShop.push(gameStateUtilities.getPokemonObject(pokemonNumber));
        }try{
            newShop = await Promise.all(newShop);
        }
        catch(errors){
            console.log(errors)
        }
        finally{
            console.log(newShop)
        }
        return {pool: gameState.pool, shop: newShop}
    },

    getShopRarities(experience) {
        let shopRarities = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };
        if (experience < 4) { // we are level 1 or level 2 (shop rarities are the same)
            shopRarities[1] = 100;
        }
        else if (experience < 10) { // we are level 3
            shopRarities[1] = 75; // 75% chance of a common
            shopRarities[2] = 100; // 25% chance of an uncommon
        }
        else if (experience < 20) { // we are level 4
            shopRarities[1] = 55 // 55% chance of a common
            shopRarities[2] = 85 // 30% chance of an uncommon
            shopRarities[3] = 100 // 15% chance of a rare
        }
        else if (experience < 40) { // we are level 5
            shopRarities[1] = 45 // 45% chance of a common
            shopRarities[2] = 78 // 33% chance of an uncommon
            shopRarities[3] = 98 // 20% chance of a rare
            shopRarities[4] = 100 // 2% chance of an epic
        }
        else if (experience < 76) { // we are level 6
            shopRarities[1] = 30 // 30% chance of a common
            shopRarities[2] = 70 // 40% chance of an uncommon
            shopRarities[3] = 95 // 25% chance of a rare
            shopRarities[4] = 100 // 5% chance of an epic
        }
        else if (experience < 124) { // we are level 7
            shopRarities[1] = 19 // 19% chance of a common
            shopRarities[2] = 49 // 30% chance of an uncommon
            shopRarities[3] = 89 // 40% chance of a rare
            shopRarities[4] = 99 // 10% chance of an epic
            shopRarities[5] = 100 // 1% chance of a legendary
        }
        else if (experience < 196) { // we are level 8
            shopRarities[1] = 18 // 18% chance of a common
            shopRarities[2] = 43 // 25% chance of an uncommon
            shopRarities[3] = 79 // 36% chance of a rare
            shopRarities[4] = 97 // 18% chance of an epic
            shopRarities[5] = 100 // 3% chance of a legendary
        }
        else if (experience < 280) { // we are level 9
            shopRarities[1] = 10 // 10% chance of a common
            shopRarities[2] = 30 // 20% chance of an uncommon
            shopRarities[3] = 55 // 25% chance of a rare
            shopRarities[4] = 90 // 35% chance of an epic
            shopRarities[5] = 100 // 10% chance of a legendary
        }
        else { // we are level 10
            shopRarities[1] = 5 // 5% chance of a common
            shopRarities[2] = 15 // 10% chance of an uncommon
            shopRarities[3] = 35 // 20% chance of a rare
            shopRarities[4] = 75 // 40% chance of an epic
            shopRarities[5] = 100 // 25% chance of a legendary
        }
        return shopRarities;
    },

    getKeyFromNumber(randomPokemon, rarityPool) {
        let sum = 0;
        for (const key in rarityPool) {
            if (key !== '0') {
                sum += rarityPool[key];
                if (sum >= randomPokemon) {
                    return parseInt(key);
                }
            }
        }
    },

    async getPokemonObject(pokedexNum) {
        let pokemon;
        console.log("we made it bois")
        try {
            pokemon = await Pokemon.findOne({ pokedexNumber : pokedexNum });
        }
        catch (error) {
            console.error('Error fetching Pokemon:', error);
            throw(error);
        }
        finally {
            return pokemon;
        }

    }
}

export default gameStateUtilities;
