import React, { useState,useContext } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import AuthService from "../services/AuthService"

import "../styles/form.css"

const RegistrationForm = ({loggedUser,setLoggedUser}) => {
	const [user, setUser] = useState({
		username: "",
		favoritePokemon: 0,
		email: "",
		password: ""
	})

	const navigate = useNavigate()

	const { handleLogin } = useContext(AuthContext)

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await AuthService.register(user)
			setLoggedUser({_id:response.user._id})
			handleLogin(response.token,response.user._id)
			navigate("/lobbies/home")
		} catch (error) {
			console.error(error.response ? error.response.data : error.message)
		}
	}

	return (
		<>
			<div className="full-screen-background"></div>
			<div className="form-container">
				<h2 className="form-title">Register</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							name="username"
							className="form-control"
							value={user.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="favoritePokemon">
							Favorite Pokémon:
						</label>
						<select
							id="favoritePokemon"
							name="favoritePokemon"
							className="form-control"
							value={user.favoritePokemon ? user.favoritePokemon : ''}
							onChange={handleChange}
							required
							defaultValue=""
						>
							<option value="" disabled>
								-- Select an option --
							</option>
							<option value={4} >Charmander</option>
							<option value={1} >Bulbasaur</option>
							<option value={7} >Squirtle</option>
							<option value={25} >Pikachu</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-control"
							value={user.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							className="form-control"
							value={user.password}
							onChange={handleChange}
							required
						/>
					</div>
					<button type="submit" className="form-submit-btn">
						Register
					</button>
				</form>
			</div>
		</>
	)
}

export default RegistrationForm;