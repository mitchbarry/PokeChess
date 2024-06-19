import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/auth'
})

const AuthService = {
    async register (user) {
        try {
            const response = await http.post('/register', user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async login (user) {
        try {
            const response = await http.post('/login', user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async logout () {
        try {
            const response = await http.post('/logout')
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async validateUser (user) {
        try {
            const response = await http.post('/validate', user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async validateCookie () {
        try {
            const response = await http.get('/validate')
            return response.data
        }
        catch (error) {
            throw error
        }
    }
}

export default AuthService