import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/pokemon'
})

const pokemonService = {
    async getAllPokemon() {
        try {
            const response = await http.get('/all')
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async getSomePokemon(lowLimit, filterType) {
        try {
            const response = await http.get(`/some?lowLimit=${lowLimit}&filterType=${filterType}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async getOnePokemon(id) {
        try {
            const response = await http.get(`/${id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async createPokemon(pokemon) {
        try {
            const response = await http.post('/create', pokemon)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async updateOnePokemon(pokemon) {
        try {
            const response = await http.put(`/${pokemon._id}`, pokemon)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async deleteOnePokemon(id) {
        try {
            const response = await http.delete(`/${id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async fetchPokemon() {
        try {
            await http.post('/fetch')
        }
        catch (error) {
            throw error
        }
    },
}

export default pokemonService
