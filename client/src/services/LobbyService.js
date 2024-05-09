import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/lobbies',
})

const LobbyService = {
    async getAllLobbies() {
        try {
            const response = await http.get('/lobbies')
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async getUserLobbies(userId) {
        try {
            const response = await http.get(`/lobbies/user/${userId}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async getOneLobby(id) {
        try {
            const response = await http.get(`/lobbies/${id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async createOneLobby(lobby) {
        try {
            const response = await http.post('/lobbies', lobby)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async updateOneLobby(lobby) {
        try {
            const response = await http.put(`/lobbies/${lobby._id}`, lobby)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async deleteOneLobby(id) {
        try {
            const response = await http.delete(`/lobbies/${id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    }
}

export default LobbyService