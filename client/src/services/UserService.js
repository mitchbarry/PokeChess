import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/users'
})

const UserService = {
    async getOneUser(id) {
        try {
            const response = await http.get(`/users/${id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async updateOneUser(user) {
        try {
            const response = await http.put(`/users/${user._id}`, user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async deleteOneUser(id) {
        try {
            const response = await http.delete(`/users/${id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    }
}

export default UserService