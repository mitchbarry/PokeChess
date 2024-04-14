import axios from "axios";
const http = axios.create({
    baseURL: "http://localhost:8000/api/auth",
})

const AuthService = {
    async register(user) {
        return http.post("/auth/register", user)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    },

    async login(user) {
        return http.post("/auth/login", user)
            .then(response => response.data)
            .catch(error => {
                throw error;
            }
        );
    },

    async logout(){
        return http.post("/auth/logout")
            .then(response => response.data)
            .catch(error => {
                throw error;
            }
        );
    },

    async getUserInfo(token){
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        };
        return http.get("/auth/login", config)
            .then(response => response.data)
            .catch(error => {
                throw error;
            }
        );
    }
}
export default AuthService;