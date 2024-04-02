import { React, useState, useEffect } from "react"
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import LobbyService from "../services/LobbyService"
const Update = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [lobby, setLobby] = useState({
        name: "",
        description: "",
        password: "",
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        LobbyService.getOneLobby(id)
            .then(res => {
                console.log(res)
                setLobby(res)
            })
            .catch(error => {
                console.log(error)
                // setErrors(error.response.data.errors)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        LobbyService.updateOneLobby(lobby)
            .then((res) => {
                console.log(res)
                navigate("/lobbies/new")
            })
            .catch(error => {
                console.log(error)
                setErrors(error.response.data.errors)
            })
    }

    const handleChange = (e) => {
        setLobby({ ...lobby, [e.target.name]: e.target.value })
    }

    return (
        <div className="div">

            <div className="container d-flex flex-row col-12 mx-auto " style={{ backgroundColor: 'rgb(51, 103, 153, 0.9)' }}>
                <div className="mx-auto">
                    <h2 className='text-warning'>Update {lobby.name}</h2>
                    <form onSubmit={handleSubmit} className="form-control mt-3 d-flex flex-column" style={{ background: 'linear-gradient(blue, maroon,cyan)', width: '45vh' }}>
                        <label className='form-label my-1 text-warning' htmlFor="name"><h5>Lobby</h5></label>
                        <input className='form-control mt-1 ' style={{ backgroundColor: 'rgb(234,224,200)', fontFamily: 'fantasy', color: 'goldenrod' }} type="text" name="name" value={lobby.name} onChange={handleChange} placeholder="Name"></input>
                        {/* {errors.name && <p>{errors.name.message}</p>} */}
                        <label className='form-label text-warning' htmlFor="description"> <h5>Description</h5></label>
                        <input className='form-control mt-1 ' style={{ backgroundColor: 'rgb(234,224,200)', fontFamily: 'fantasy', color: 'goldenrod' }} type="text" name="description" value={lobby.description} onChange={handleChange} placeholder="Description"></input>
                        {/* {errors.description && <p>{errors.description.message}</p>} */}
                        <label className='form-label text-warning' htmlFor="password"><h5>Password</h5></label>
                        <input className='form-control mt-1' style={{ backgroundColor: 'rgb(234,224,200)', fontFamily: 'fantasy', color: 'goldenrod' }} type="password" name="password" value={lobby.password} onChange={handleChange} placeholder="Password"></input>
                        {/* {errors.password && <p>{errors.password.message}</p>} */}

                        <button className='col-12 text-warning mt-2 border borrder-info' style={{ backgroundColor: 'rgb(138,18,0)' }}>Update this Lobby </button>

                    </form>
                </div>

            </div>
        </div>
        
    )
}

export default Update