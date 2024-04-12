import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'react-bootstrap'

import { useAuth } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import errorUtilities from '../utilities/error.utilities'

import login from "../assets/fonts/login.png"
import "../styles/Form.css";

const LoginForm = () => {

	const navigate = useNavigate()

	const { handleLoginResponse } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
    const [showNotification, setShowNotification] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false
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
        setFormErrors(prevErrors => ({...prevErrors, email: false}));
        setEmail(value);
    }

    const handlePassword = (e) => {
        const value = e.target.value;
        setFormErrors(prevErrors => ({...prevErrors, password: false}));
        setPassword(value);
    }

	const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
    };

    const checkForm = () => {
        const newFormErrors = {...formErrors};
        if (!email.trim() || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newFormErrors.email = true;
        }
        if (!password.trim()) {
            newFormErrors.password = true;
        }
        if (!Object.values(newFormErrors).includes(true)) {
            sendRequest();
        } else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}));
        }
    }

	const sendRequest = async () => {
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
        <Container className="container-main">
            <img src={login} className="header-img"/>
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
                                id="email"
                                name="email"
                                className={"form-control" + (formErrors.email ? " input-error" : "")}
                                value={email}
                                onChange={(e) => handleInput(e)}
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => handleBlur(e)}
                            />
                            <label htmlFor="email" className={"input-label" + (focus.email || email ? " shrink" : "") + (formErrors.email ? " error-text" : "")}>Email</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={"form-control" + (formErrors.password ? " input-error" : "")}
                                value={password}
                                onChange={(e) => handleInput(e)}
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => handleBlur(e)}
                            />
                            <label htmlFor="password" className={"input-label" + (focus.password || password ? " shrink" : "") + (formErrors.password ? " error-text" : "")}>Password</label>
                        </div>
                    </div>
                    <button type="submit" className="form-submit-btn">
                        Login
                    </button>
                </form>
            </div>
        </Container>
	)
}

export default LoginForm;