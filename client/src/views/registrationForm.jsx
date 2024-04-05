import React, { useState,useContext } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import errorUtilities from '../utilities/error.utilities'

import "../styles/Form.css";

const RegistrationForm = () => {

	const navigate = useNavigate()

	const { authToken, loggedUser, handleLoginResponse, handleLogout, updateLoggedUser, updateAuthToken, pathParamValidator } = useAuth();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [starter, setStarter] = useState(0)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [showNotification, setShowNotification] = useState(false)
    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        birthDate: "",
        password: "",
        confirmPassword: ""
    })
    const [isValidForm, setIsValidForm] = useState(true);

    const handleInput = (e) => {
        switch(e.target.id) {
            case "username":
                return usernameHandler(e);
            case "email":
                return emailHandler(e);
            case "starter":
                return birthDateHandler(e);
            case "password":
                return passwordHandler(e);
            case "confirmPassword":
                return confirmPasswordHandler(e);
            default:
                return;
        }
    };

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
							Choose your starter:
						</label>
						<select
							id="favoritePokemon"
							name="favoritePokemon"
							className="form-control"
							value={user.favoritePokemon ? user.favoritePokemon : ''}
							onChange={handleChange}
							required
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