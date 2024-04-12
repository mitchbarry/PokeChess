import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'react-bootstrap'

import { useAuth } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import errorUtilities from '../utilities/error.utilities'

import register from "../assets/fonts/register.png"
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
        starter: "",
        password: "",
        confirmPassword: ""
    })
	const [focus, setFocus] = useState({
		email: false,
		password: false
	});

    const handleInput = (e) => {
        switch(e.target.id) {
            case "username":
                return handleUsername(e);
            case "email":
                return handleEmail(e);
            case "starter":
                return handleStarter(e);
            case "password":
                return handlePassword(e);
            case "confirmPassword":
                return handleConfirmPassword(e);
            default:
                return;
        }
    };

	const handleUsername = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.username) {
                case "Username is required!":
                    if (value) {
                        return {...prevErrors, username: ""};
                    }
                    break;
                case "Username must be at least 4 characters long!":
                    if (value.length > 4) {
                        return {...prevErrors, username: ""};
                    }
                    break;
                case "Username must be less than 25 characters long!":
                    if (value.length < 25) {
                        return {...prevErrors, username: ""};
                    }
                    break;
                default:
                    return prevErrors;
            }
        })
        setUsername(value)
    }

	const handleEmail = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.email) {
                case "Email is required!":
                    if (value) {
                        return{...prevErrors, email: ""};
                    }
                    break;
                case "Please enter a valid email!":
                    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                        return{...prevErrors, email: ""};
                    }
                    break;
                default:
                    return prevErrors;
            }
        })
        setEmail(value);
    }

	const handleStarter = (e) => {
		const value = e.target.value;
		setFormErrors((prevErrors) => ({...prevErrors, starter: ""}))
		setStarter(value );
	}

	const handlePassword = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.password) {
                case "Password is required!":
                    if (value) {
                        return {...prevErrors, password: ""};
                    }
                    break;
                case "Password must be at least 6 characters long!":
                    if (value.length > 6) {
                        return {...prevErrors, password: ""};
                    }
                    break;
                case "Password must be less than 255 characters long!":
                    if (value.length > 255) {
                        return {...prevErrors, password: ""};
                    }
                // Optional regex Case here to verify the user password has certain characters or a certain uppercase characters
                default:
                    return prevErrors;
            }
        })
        setPassword(value);
        checkPasswordMatch(value, confirmPassword);
    }

	const handleConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        checkPasswordMatch(password, value);
    }

	const checkPasswordMatch = (newPassword, newConfirmPassword) => {
        let errorMsg = "";
        if (newConfirmPassword !== newPassword) {
            errorMsg = "Passwords must match!";
        }
        setFormErrors(prevErrors => ({...prevErrors, confirmPassword: errorMsg}));
    }

	const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
	}

	const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!username.trim()) { // checks username on submit
            newFormErrors.username = "Username is required!"
        }
        else if (username.trim().length < 4) {
            newFormErrors.username = "Username must be at least 4 characters long!"
        }
        else if (username.trim().length > 25) {
            newFormErrors.username = "Username must be less than 25 characters long!"
        }
        if (!email.trim()) { // checks email on submit
            newFormErrors.email = "Email is required!"
        }
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newFormErrors.email = "Please enter a valid email!"
        }
        if (!password.trim()) { // checks password on submit
            newFormErrors.password = "Password is required!"
        }
        else if (password.trim().length < 6) {
            newFormErrors.password = "Password must be at least 6 characters long!"
        }
        else if (password.trim().length > 255) {
            newFormErrors.password = "Password must be less than 255 characters long!"
        }
        if (Object.keys(newFormErrors).every(key => newFormErrors[key] === "")) {
            sendRequest();
        }
        else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}));
        }
    }

	const sendRequest = async () => {
        try {
            const response = await AuthService.register({
                username: username.trim(),
                email: email.trim(),
                starter: starter,
                password: password.trim()
            });
            handleLoginResponse(response);
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error));
            setShowNotification(true);
        }
		finally {
			navigate("/lobbies/home");
		}
    }

	const closeNotification = () => {
        setShowNotification(false);
    }

	const handleFocus = (e) => {
		switch(e.target.id) {
			case "username":
				return setFocus(prevFocus => ({...prevFocus, username: true}));
			case "email":
				return setFocus(prevFocus => ({...prevFocus, email: true}));
			case "password":
				return setFocus(prevFocus => ({...prevFocus, password: true}));
			case "confirmPassword":
				return setFocus(prevFocus => ({...prevFocus, confirmPassword: true}));
			default:
				return;
		}
	};

	const handleBlur = (e) => {
		switch(e.target.id) {
			case "username":
				if (!username.trim()) {
					return setFocus(prevFocus => ({...prevFocus, username: false}));
				}
				break;
			case "email":
				if (!email.trim()) {
					return setFocus(prevFocus => ({...prevFocus, email: false}));
				}
				break;
			case "password":
				if (!password.trim()) {
					return setFocus(prevFocus => ({...prevFocus, password: false}));
				}
				break;
			case "confirmPassword":
				if (!confirmPassword.trim()) {
					return setFocus(prevFocus => ({...prevFocus, confirmPassword: false}));
				}
				break;
			default:
				return;
		}
	};

	// (Object.keys(formErrors).every(key => formErrors[key] === "") whether submit button is grayed out -> might need to be a useState variable

	return (
		<Container className="container-main">
			<img src={register} className="header-img"/>
			<div className="form-container">
				{Object.keys(errors).length !== 0 && showNotification && (
                    <ul className="alert alert-danger">
                        <button type="button" className="btn-close close-button-red" aria-label="Close" onClick={closeNotification}></button>
                        {errors.statusCode && errors.name && (
                            <li className="flash-box-li">
                                <b>Error {errors.statusCode}: {errors.name}</b>
                            </li>
                        )}
                        {errors.message && (
                            <li className="flash-box-li">
                                {errors.message}
                            </li>
                        )}
                        {errors.validationErrors && errors.validationErrors.length !== 0 && (
                            errors.validationErrors.map((error, index) => (
                            <li key={index} className="flash-box-li">
                                {error}
                            </li>
                            ))
                        )}
                    </ul>
                )}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="input-container">
							<input
								type="text"
								id="username"
								name="username"
								className={"form-control" + (formErrors.username ? " input-error" : "")}
								value={user.username}
								onChange={handleChange}
								required
							/>
							<label htmlFor="username" className={"input-label" + (focus.username || username ? " shrink" : "") + (formErrors.username ? " error-text" : "")}>Username</label>
						</div>
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
		</Container>
	)
}

export default RegistrationForm;