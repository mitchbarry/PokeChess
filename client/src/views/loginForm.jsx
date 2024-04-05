import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import errorUtilities from '../utilities/error.utilities'

import "../styles/Form.css";

const LoginForm = () => {

	const navigate = useNavigate()

	const { handleLoginResponse } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
    const [showNotification, setShowNotification] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    })
	const [focus, setFocus] = useState({
		email: false,
		password: false
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
			navigate("/lobbies/home");
		}
    }

	const closeNotification = () => {
        setShowNotification(false);
    }

	const handleFocus = (e) => {
		switch(e.target.id) {
            case "email":
                return setFocus({...focus, email: true});
            case "password":
                return setFocus({...focus, password: true});
            default:
                return;
        }
    };

    const handleBlur = (e) => {
		switch(e.target.id) {
            case "email":
				if (!email.trim()) {
					return setFocus({...focus, email: false});
				}
            case "password":
				if (!password.trim()) {
					return setFocus({...focus, password: false});
				}
            default:
                return;
        }
    };

	return (
		<div className="form-container">
			<h2 className="form-title">Login</h2>
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
							type="email"
							id="email"
							name="email"
							className="form-control"
							value={email}
							onChange={(e) => handleInput(e)}
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
						/>
						<label htmlFor="email" className={`input-label ${focus.email || email ? 'shrink' : ''}`}>Email</label>
					</div>
					{/* {formErrors.email !== "" && ( 
						<p className="error-text" role="alert">{formErrors.email}TEST</p>
					})} */}
				</div>
				<div className="form-group">
					<div className="input-container">
						<input
							type="password"
							id="password"
							name="password"
							className="form-control"
							value={password}
							onChange={(e) => handleInput(e)}
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
						/>
						<label htmlFor="password" className={`input-label ${focus.password || password ? 'shrink' : ''}`}>Password</label>
					</div>
				</div>
				<button type="submit" className="form-submit-btn">
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
