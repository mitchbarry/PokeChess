import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/auth'
})

const AuthService = {
    async register (user) {
        try {
            const response = await http.post('/auth/register', user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async login (user) {
        try {
            const response = await http.post('/auth/login', user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async logout () {
        try {
            const response = await http.post('/auth/logout')
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async validateUser (user) {
        try {
            const response = await http.post('/auth/validate', user)
            return response.data
        }
        catch (error) {
            throw error
        }
    },

    async checkAuthCookie () {
        try {
            const response = await http.get('/auth/checkAuthCookie')
            return response.data
        }
        catch (error) {
            throw error
        }
    }
}

export default AuthService