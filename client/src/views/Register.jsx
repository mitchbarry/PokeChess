import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../components/svgs/WarningSvg'
import ArrowIcon from '../components/svgs/ArrowSvg'

import registerStyles from '../css/views/Register.module.css'

const Register = () => {

	const navigate = useNavigate()

	const { handleLoginResponse } = useAuth()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
	const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: ''
    })
	const [focus, setFocus] = useState({
		username: false,
		email: false,
		password: false
	})

    const handleInput = (e) => {
        switch(e.target.id) {
            case 'username':
                return handleUsername(e)
            case 'email':
                return handleEmail(e)
            case 'password':
                return handlePassword(e)
            default:
                return
        }
    }

	const handleUsername = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
            switch (prevErrors.username) {
                case 'Username is required!':
                    if (value) {
                        return {...prevErrors, username: ''}
                    }
					else {
						return prevErrors
					}
                case 'Username must be at least 4 characters long!':
                    if (value.length > 4) {
                        return {...prevErrors, username: ''}
                    }
					else {
						return prevErrors
					}
                case 'Username must be less than 25 characters long!':
                    if (value.length < 25) {
                        return {...prevErrors, username: ''}
                    }
					else {
						return prevErrors
					}
                default:
                    return prevErrors
            }
        })
        setUsername(value)
    }

	const handleEmail = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
            switch (prevErrors.email) {
                case 'Email is required!':
                    if (value) {
                        return{...prevErrors, email: ''}
                    }
					else {
						return prevErrors
					}
                case 'Please enter a valid email!':
                    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                        return{...prevErrors, email: ''}
                    }
					else {
						return prevErrors
					}
                default:
                    return prevErrors
            }
        })
        setEmail(value)
    }

	const handlePassword = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
            switch (prevErrors.password) {
                case 'Password is required!':
                    if (value) {
                        return {...prevErrors, password: ''}
                    }
					else {
						return prevErrors
					}
                case 'Password must be at least 6 characters long!':
                    if (value.length > 6) {
                        return {...prevErrors, password: ''}
                    }
					else {
						return prevErrors
					}
                case 'Password must be less than 255 characters long!':
                    if (value.length > 255) {
                        return {...prevErrors, password: ''}
                    }
					else {
						return prevErrors
					}
                default:
                    return prevErrors
            }
        })
        setPassword(value)
    }

	const handleSubmit = (e) => {
        e.preventDefault()
        checkForm()
	}

	const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!username.trim()) { // checks username on submit
            newFormErrors.username = 'Username is required!'
        }
        else if (username.trim().length < 4) {
            newFormErrors.username = 'Username must be at least 4 characters long!'
        }
        else if (username.trim().length > 25) {
            newFormErrors.username = 'Username must be less than 25 characters long!'
        }
        if (!email.trim()) { // checks email on submit
            newFormErrors.email = 'Email is required!'
        }
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newFormErrors.email = 'Please enter a valid email!'
        }
        if (!password.trim()) { // checks password on submit
            newFormErrors.password = 'Password is required!'
        }
        else if (password.trim().length < 6) {
            newFormErrors.password = 'Password must be at least 6 characters long!'
        }
        else if (password.trim().length > 255) {
            newFormErrors.password = 'Password must be less than 255 characters long!'
        }
        if (Object.keys(newFormErrors).every(key => newFormErrors[key] === '')) {
            sendRequest()
        }
        else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}))
        }
    }

	const sendRequest = async () => {
        try {
            const response = await AuthService.register({
                username: username.trim(),
                email: email.trim(),
                password: password.trim()
            })
            handleLoginResponse(response)
            navigate('/')
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error))
            setShowNotification(true)
            
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

	const handleFocus = (input) => {
		switch(input) {
			case 'username':
				return setFocus(prevFocus => ({...prevFocus, username: true}))
			case 'email':
				return setFocus(prevFocus => ({...prevFocus, email: true}))
			case 'password':
				return setFocus(prevFocus => ({...prevFocus, password: true}))
			default:
				return
		}
	}

	const handleBlur = (input) => {
		switch(input) {
			case 'username':
				if (!username.trim()) {
					return setFocus(prevFocus => ({...prevFocus, username: false}))
				}
				break
			case 'email':
				if (!email.trim()) {
					return setFocus(prevFocus => ({...prevFocus, email: false}))
				}
				break
			case 'password':
				if (!password.trim()) {
					return setFocus(prevFocus => ({...prevFocus, password: false}))
				}
				break
			default:
				return
		}
	}

	return (
		<div className={`${registerStyles.register} flex-center`}>
			<div className={`${registerStyles.register_form} flex-col`}>
                <h1 className={registerStyles.form_title}>
                    <span className={registerStyles.primary_text}>Register</span>
                </h1>
				<form onSubmit={handleSubmit} className={registerStyles.form}>
                    <div className={`${registerStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'USERNAMESERVERSIDEERRORPLACEHOLDER') ? registerStyles.form_input__error : ''}`}
                        onFocus={() => handleFocus('username')}
                        onBlur={() => handleBlur('username')}
                    >
                        <input
                            type='text'
                            id='username'
                            name='username'
                            className={`${registerStyles.input} ${registerStyles.primary_text} ${(focus.username || username) ? registerStyles.input__focus : ''} ${formErrors.username ? registerStyles.input__error : ''}`}
                            value={username}
                            onChange={(e) => handleInput(e)}
                        />
                        <label htmlFor='username' className={`${registerStyles.input_label}
                            ${(focus.username || username) ? registerStyles.input_label__shrink : ''}
                            ${formErrors.username ? registerStyles.input_label__error : ''}`}>
                            <span className={`${registerStyles.label} ${(focus.username || username) ? registerStyles.primary_text__shrink : registerStyles.primary_text}`}>Username</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'USERNAMESERVERSIDEERRORPLACEHOLDER' && (
                            <div className={registerStyles.input_error}>
                                <WarningIcon className={registerStyles.icon_warning}/>
                                <span className={registerStyles.secondary_text_accent}>USERNAMESERVERSIDEERRORPLACEHOLDER</span>
                            </div>
                        )
                    )}
                    <div className={`${registerStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'EMAILSERVERSIDEERRORPLACEHOLDER') ? registerStyles.form_input__error : ''}`}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                    >
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className={`${registerStyles.input} ${registerStyles.primary_text} ${(focus.email || email) ? registerStyles.input__focus : ''} ${formErrors.email ? registerStyles.input__error : ''}`}
                            value={email}
                            onChange={(e) => handleInput(e)}
                        />
                        <label htmlFor='email' className={`${registerStyles.input_label}
                            ${(focus.email || email) ? registerStyles.input_label__shrink : ''}
                            ${formErrors.email ? registerStyles.input_label__error : ''}`}>
                            <span className={`${registerStyles.label} ${(focus.email || email) ? registerStyles.primary_text__shrink : registerStyles.primary_text}`}>Email</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'EMAILSERVERSIDEERRORPLACEHOLDER' && (
                            <div className={registerStyles.input_error}>
                                <WarningIcon className={registerStyles.icon_warning}/>
                                <span className={registerStyles.secondary_text_accent}>EMAILSERVERSIDEERRORPLACEHOLDER</span>
                            </div>
                        )
                    )}
                    <div className={`${registerStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'PASSWORDSERVERSIDEERRORPLACEHOLDER') ? registerStyles.form_input__error : ''}`}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                    >
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            className={`${registerStyles.input_password} ${registerStyles.primary_text} ${(focus.password || password) ? registerStyles.input_password__focus : ''} ${formErrors.password ? registerStyles.input__error : ''}`}
                            value={password}
                            onChange={(e) => handleInput(e)}
                        />
                        {(focus.password || password) && (
                            <button type='button' className={`${registerStyles.input_password_icon} ${showPassword ? registerStyles.input_password_icon__active : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                                {showPassword ? (
                                    <RevealIcon className={registerStyles.icon_default}/>
                                ) : (
                                    <HiddenIcon className={registerStyles.icon_default}/>
                                )}
                            </button>
                        )}
                        <label htmlFor='password' className={`${registerStyles.input_label}
                            ${(focus.password || password) ? registerStyles.input_label__shrink : ''}
                            ${formErrors.password ? registerStyles.input_label__error : ''}`}>
                            <span className={`${registerStyles.label} ${(focus.password || password) ? registerStyles.primary_text__shrink : registerStyles.primary_text}`}>Password</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'InvalidPassword' && (
                            <div className={registerStyles.input_error}>
                                <WarningIcon className={registerStyles.icon_warning}/>
                                <span className={registerStyles.secondary_text_accent}>Please enter your password.</span>
                            </div>
                        )
                    )}
                    <button type='submit' className={`${registerStyles.form_submit} flex-center`}>
                        <ArrowIcon className={registerStyles.icon_default}/>
                    </button>
				</form>
                <div className={`${registerStyles.form_links} flex-col`}>
                    <Link className={registerStyles.form_link} to='/login'>
                        <span className={registerStyles.primary_text__shrink}>Already have an account?</span>
                    </Link>
                </div>
			</div>
		</div>
	)
}

export default Register