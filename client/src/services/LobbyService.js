import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/lobbies',
})

const LobbyService = {
    async getAllLobbies() {
        return http.get('/lobbies')
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },

    async getUserLobbies(userId) {
        return http.get(`/lobbies/user/${userId}`) // Pass the user ID as a URL parameter
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },

    async getOneLobby(id) {
        return http.get(`/lobbies/${id}`)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },

    async createOneLobby(lobby) {
        return http.post('/lobbies', lobby)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },

    async updateOneLobby(lobby) {
        return http.put(`/lobbies/${lobby._id}`, lobby)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    },

    async deleteOneLobby(id) {
        return http.delete(`/lobbies/${id}`)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    }
}

export default LobbyService