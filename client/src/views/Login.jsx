import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import CloseIcon from '../components/svgs/CloseSvg'
import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import LoginArrowIcon from '../components/svgs/LoginArrowSvg'

import styles from '../css/views/Login.module.css'

const LoginForm = () => {

	const navigate = useNavigate()

	const { handleLoginResponse } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({})
    const [showNotification, setShowNotification] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false
    })
	const [focus, setFocus] = useState({
		email: false,
		password: false
	})

    const handleInput = (e) => {
        switch(e.target.id) {
            case 'email':
                return handleEmail(e)
            case 'password':
                return handlePassword(e)
            default:
                return
        }
    }

    const handleEmail = (e) => {
        const value = e.target.value
        setFormErrors(prevErrors => ({...prevErrors, email: false}))
        setEmail(value)
    }

    const handlePassword = (e) => {
        const value = e.target.value
        setFormErrors(prevErrors => ({...prevErrors, password: false}))
        setPassword(value)
    }

	const handleSubmit = (e) => {
        e.preventDefault()
        checkForm()
    }

    const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!email.trim() || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newFormErrors.email = true
        }
        if (!password.trim()) {
            newFormErrors.password = true
        }
        if (!Object.values(newFormErrors).includes(true)) {
            sendRequest()
        } else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}))
        }
    }

	const sendRequest = async () => {
        try {
            const response = await AuthService.login({
                email: email.trim(),
                password: password.trim()
            })
            handleLoginResponse(response)
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error))
            setShowNotification(true)
        }
		finally {
			navigate('/lobbies/home')
		}
    }

	const closeNotification = () => {
        setShowNotification(false)
    }

    const handleShowPassword = () => {
        setShowPassword(showPassword ? false : true)
    }

    const handleFocus = (e) => {
        switch(e.target.id) {
            case 'email':
                return setFocus(prevFocus => ({...prevFocus, email: true}))
            case 'password':
                return setFocus(prevFocus => ({...prevFocus, password: true}))
            default:
                return
        }
    }

const handleBlur = (e) => {
    switch(e.target.id) {
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
        <div className={`${styles.login} flex-center`}>
            <div className={`${styles.login_form} flex-col`}>
                {Object.keys(errors).length !== 0 && showNotification && (
                    <ul className={`${styles.alert_error} flex-col`}>
                        <button className={styles.error_close} aria-label='Close' onClick={closeNotification}>
                            <CloseIcon />
                        </button>
                        {errors.statusCode && errors.name && (
                            <li>
                                <span className={styles.secondary_text}><b>Error {errors.statusCode}: {errors.name}</b></span>
                            </li>
                        )}
                        {errors.message && (
                            <li>
                                <span className={styles.secondary_text_accent}>{errors.message}</span>
                            </li>
                        )}
                        {errors.validationErrors && errors.validationErrors.length !== 0 && (
                            errors.validationErrors.map((error, index) => (
                                <li key={index}>
                                    <span className={styles.secondary_text_accent}>{error}</span>
                                </li>
                            ))
                        )}
                    </ul>
                )}
                <h1 className={styles.form_title}>
                    <span className={styles.primary_text}>Login</span>
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form_input}>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className={`${styles.input} ${styles.primary_text} ${focus.email || email ? styles.input__focus : ''} ${formErrors.email ? styles.input__error : ''}`}
                            value={email}
                            onChange={(e) => handleInput(e)}
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => handleBlur(e)}
                        />
                        <label htmlFor='email' className={`${styles.input_label}
                            ${focus.email || email ? styles.input_label__shrink : ''}
                            ${formErrors.email ? styles.input_label__error : ''}`}>
                            <span className={`${styles.label} ${focus.email || email ? styles.primary_text__shrink : styles.primary_text}`}>Email or Username</span>
                        </label>
                    </div>
                    <div className={styles.form_input}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            className={`${styles.input_password} ${styles.primary_text} ${focus.password || password ? styles.input_password__focus : ''} ${formErrors.password ? styles.input__error : ''}`}
                            value={password}
                            onChange={(e) => handleInput(e)}
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => handleBlur(e)}
                        />
                        <div className={`${styles.input_password_icon} ${showPassword ? styles.input_password_icon__active : ''}`} onClick={handleShowPassword}>
                            {showPassword ? (
                                <RevealIcon />
                            ) : (
                                <HiddenIcon />
                            )}
                        </div>
                        <label htmlFor='password' className={`${styles.input_label}
                            ${focus.password || password ? styles.input_label__shrink : ''}
                            ${formErrors.password ? styles.input_label__error : ''}`}>
                            <span className={`${styles.label} ${focus.password || password ? styles.primary_text__shrink : styles.primary_text}`}>Password</span>
                        </label>
                    </div>
                    <button type='submit' className={`${styles.form_submit} flex-center`}>
                        <LoginArrowIcon />
                    </button>
                </form>
                <div className={`${styles.form_links} flex-col`}>
                    <Link className={styles.form_link} to='/register'>
                        <span className={styles.primary_text__shrink}>Create an Account</span>
                        </Link>
                    <Link className={styles.form_link} to='/contact'>
                        <span className={styles.primary_text__shrink}>Can't log in?</span>
                        </Link>
                </div>
            </div>
        </div>
	)
}

export default LoginForm