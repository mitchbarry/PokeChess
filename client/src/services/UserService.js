import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api/users'
})

const UserService = {

async getOneUser(id){
    return http.get(`/users/${id}`)
    .then(res=> res.data)
    .catch(err=> {
        throw err
    })
},

async createUser(user){
    return http.post(`/users`,user)
    .then(res=>res.data)
    .catch(err=>{
        throw err
    })
},

async updateOneUser(user){
    return http.put(`/users/${user._id}`,user)
    .then(res=>res.data)
    .catch(err=>{
        throw err
    })
},

async deleteOneUser(id){
    return http.delete(`/users/${id}`)
    .then(res=> res.data)
    .catch(err=>{
        throw err
    })
}
}
export default UserService