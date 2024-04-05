import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import AuthService from "../services/AuthService"
import errorUtilities from '../utilities/error.utilities'

import "../styles/form.css"

const LoginForm = () => {

	const navigate = useNavigate()

	const { authToken, loggedUser, handleLoginResponse, handleLogout, updateLoggedUser, updateAuthToken, pathParamValidator } = useAuth();

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        switch(e.target.id) {
            case "email":
                return handleEmail(e);
            case "password":
                return handlePassword(e);
            default:
                return;
        }
    };

	const handleEmail = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.email) {
                case "Email is required!":
                case "Please enter a valid email!":
                    if (value) {
                        return{...prevErrors, email: ""};
                    }
                    break;
                default:
                    return prevErrors;
            }
        })
        setEmail(value);
    };

	const handlePassword = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.password) {
                case "Password is required!":
                    if (value) {
                        return {...prevErrors, password: ""};
                    }
                    break;
                default:
                    return prevErrors;
            }
        })
        setPassword(value);
    }

	const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
    };

    const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!email.trim()) { // checks email on submit
            newFormErrors.email = "Email is required!"
        }
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newFormErrors.email = "Please enter a valid email!"
        }
        if (!password.trim()) { // checks password on submit
            newFormErrors.password = "Password is required!"
        }
        if (Object.keys(newFormErrors).every(key => newFormErrors[key] === "")) {
            sendRequest();
        }
        else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}));
        }
    }

	const sendRequest = async () => {
		setIsLoading(true)
        try {
            const response = await AuthService.login({
                email: email.trim(),
                password: password.trim()
            });
            handleLoginResponse(response);
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error));
            setShowNotification(true);
        }
		finally {
			navigate("/lobbies/home")
			setIsLoading(false)
		}
    }

	return (
		<>
			<div className="full-screen-background"></div>
			<div className="form-container">
				<h2 className="form-title">Login</h2>
				<form onSubmit={handleSubmit}>
					{(Object.keys(errors).length !== 0  && showNotification) && (
						<ul className={styles.flashBox}>
							<button className={styles.closeButtonRed} onClick={() => closeNotification()}>x</button>
							{errors.statusCode && errors.name && (
								<li className={styles.flashBoxLi}>
									Error {errors.statusCode}: {errors.name} 
								</li>
							)}
							{errors.message && (
								<li className={styles.flashBoxLi}>
									{errors.message}
								</li>
							)}
							{errors.validationErrors && errors.validationErrors.length !== 0 && (
								Object.keys(errors.validationErrors).map((key, index) => (
									<li key={index} className={styles.flashBoxLi}>
										{errors.validationErrors[key]}
									</li>
								))
							)}
						</ul>
					)}
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-control"
							value={email}
							onChange={(e) => handleInput(e)}
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
							value={password}
							onChange={(e) => handleInput(e)}
							required
						/>
					</div>
					<button
						type="submit"
						className="form-submit-btn"
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</>
	)
}

export default LoginForm
