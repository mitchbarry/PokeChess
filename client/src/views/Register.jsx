import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hasBadWords } from 'expletives'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../components/svgs/WarningSvg'
import ArrowIcon from '../components/svgs/ArrowSvg'
import CheckIcon from '../components/svgs/CheckSvg'
import XIcon from '../components/svgs/XSvg'

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
        password: {
            size: true,
            characters: true
        }
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
            if (
                (prevErrors.username === `Your username is required` && value) ||
                (prevErrors.username === `Your username must be at least 3 characters` && value.length >= 3) ||
                (prevErrors.username === `Your username can't be more than 16 characters` && value.length <= 16)
            ) {
                return { ...prevErrors, username: '' }
            }
            return prevErrors
        })
        setUsername(value)
    }

    const handleEmail = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
            if (prevErrors.email === `Your email is required`) {
                if (value) {
                    return { ...prevErrors, email: '' }
                }
                else {
                    return prevErrors
                }
            }
            else {
                return prevErrors
            }
        })
        setEmail(value)
    }

    const handlePassword = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors }
            if (value.length >= 8 && value.length <= 255) { // Check length
                updatedErrors.password.size = false
            } 
            else {
                updatedErrors.password.size = true
            }
            if (/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) ||
                /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$/.test(value) ||
                /^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).+$/.test(value)) { // Check character requirements
                updatedErrors.password.characters = false
            }
            else {
                updatedErrors.password.characters = true
            }
            return updatedErrors
        })
        setPassword(value)
    }

	const handleSubmit = (e) => {
        e.preventDefault()
        checkForm()
	}

    const checkForm = () => {
        const newFormErrors = { ...formErrors }
        const usernameTrim = username.trim()
        const emailTrim = email.trim()
        let hasError = false

        if (!usernameTrim) { // Check username on submit
            newFormErrors.username = `Your username is required`
            hasError = true
        } else if (hasBadWords(usernameTrim)) {
            newFormErrors.username = `Your username must be appropriate`
            hasError = true
        } else if (!/^[a-zA-Z0-9\s]+$/.test(usernameTrim)) {
            newFormErrors.username = `Your username can't contain special characters`
            hasError = true
        } else if (usernameTrim.length < 3) {
            newFormErrors.username = `Your username must be at least 3 characters`
            hasError = true
        } else if (usernameTrim.length > 16) {
            newFormErrors.username = `Your username can't be more than 16 characters`
            hasError = true
        }

        if (!emailTrim) { // Check email on submit
            newFormErrors.email = `Your email is required`
            hasError = true
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailTrim)) {
            newFormErrors.email = `Please enter a valid email`
            hasError = true
        }

        if (newFormErrors.password.size === true ||
            newFormErrors.password.characters === true) {
            hasError = true
        }
        
        if (hasError || Object.values(newFormErrors).some(error => error !== '')) {
            setFormErrors(prevErrors => ({ ...prevErrors, ...newFormErrors }))
        }
        else {
            sendRequest()
        }
    }

	const sendRequest = async () => {
        try {
            const response = await AuthService.register({
                username: username.trim(),
                email: email.trim(),
                password: password
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
        setFocus((prevFocus) => ({
            ...prevFocus, [input]: true,
        }))
    }

    const handleBlur = (input) => {
        if (input === 'username' && !username.trim()) {
            setFocus((prevFocus) => ({
                ...prevFocus, username: false
            }))
        }
        else if (input === 'email' && !email.trim()) {
            setFocus((prevFocus) => ({
                ...prevFocus, email: false
            }))
        }
        else if (input === 'password' && !password.trim()) {
            setFocus((prevFocus) => ({
                ...prevFocus, password: false
            }))
        }
    }

	return (
		<div className={`${registerStyles.register} flex-center`}>
			<div className={`${registerStyles.register_form} flex-col`}>
                <h1 className={registerStyles.form_title}>
                    <span className={registerStyles.primary_text}>Register</span>
                </h1>
				<form onSubmit={handleSubmit} className={registerStyles.form}>
                    <div className={`${registerStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'USERNAMESERVERSIDEERRORPLACEHOLDER') || (formErrors.username !== '') ? registerStyles.form_input__error : ''}`}
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
                    {formErrors.username !== '' && (
                        <div className={registerStyles.input_error}>
                            <WarningIcon className={registerStyles.icon_warning}/>
                            <span className={registerStyles.secondary_text_accent}>{formErrors.username}</span>
                        </div>
                    )}
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'USERNAMESERVERSIDEERRORPLACEHOLDER' && (
                            <div className={registerStyles.input_error}>
                                <WarningIcon className={registerStyles.icon_warning}/>
                                <span className={registerStyles.secondary_text_accent}>USERNAMESERVERSIDEERRORPLACEHOLDER</span>
                            </div>
                        )
                    )}
                    <div className={`${registerStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'EMAILSERVERSIDEERRORPLACEHOLDER') || (formErrors.email !== '')? registerStyles.form_input__error : ''}`}
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
                    {formErrors.email !== '' && (
                        <div className={registerStyles.input_error}>
                            <WarningIcon className={registerStyles.icon_warning}/>
                            <span className={registerStyles.secondary_text_accent}>{formErrors.email}</span>
                        </div>
                    )}
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'EMAILSERVERSIDEERRORPLACEHOLDER' && (
                            <div className={registerStyles.input_error}>
                                <WarningIcon className={registerStyles.icon_warning}/>
                                <span className={registerStyles.secondary_text_accent}>EMAILSERVERSIDEERRORPLACEHOLDER</span>
                            </div>
                        )
                    )}
                    <div className={`${registerStyles.form_password} ${(Object.keys(errors).length !== 0 && errors.message === 'PASSWORDSERVERSIDEERRORPLACEHOLDER') ? registerStyles.form_input__error : ''}`}
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
                    <div className={registerStyles.form_password_check}>
                        <div className={`${registerStyles.password_check}`}>
                            <div className={`${registerStyles.password_check_box} flex-center`}>
                                <div className={`${registerStyles.check_box} ${!formErrors.password.size ? registerStyles.check_box__checked : ''}`}/>
                                {!formErrors.password.size ? (
                                    <CheckIcon className={registerStyles.icon_check}/>
                                ) : (
                                    <XIcon className={registerStyles.icon_check}/>
                                )}
                            </div>
                            <span className={`${registerStyles.primary_text_accent__shrink} flex-center`}>Password is at least 8 characters</span>
                        </div>
                        <div className={`${registerStyles.password_check}`}>
                            <div className={`${registerStyles.password_check_box} flex-center`}>
                                <div className={`${registerStyles.check_box} ${!formErrors.password.characters ? registerStyles.check_box__checked : ''}`}/>
                                {!formErrors.password.characters ? (
                                    <CheckIcon className={registerStyles.icon_check}/>
                                ) : (
                                    <XIcon className={registerStyles.icon_check}/>
                                )}
                            </div>
                            <span className={`${registerStyles.primary_text_accent__shrink} flex-center`}>Password includes two of the following; letter, number, or symbol</span>
                        </div>
                    </div>
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