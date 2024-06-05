import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../components/svgs/WarningSvg'
import ArrowIcon from '../components/svgs/ArrowSvg'
import CheckIcon from '../components/svgs/CheckSvg'

import styles from '../css/views/Login.module.css'

const LoginForm = () => {

	const navigate = useNavigate()

	const { handleLoginResponse } = useAuth()

    const [accountName, setAccountName] = useState('')
    const [password, setPassword] = useState('')
    const [stayLogged, setStayLogged] = useState(false)
	const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        accountName: false,
        password: false
    })
	const [focus, setFocus] = useState({
		accountName: false,
		password: false
	})

    const handleInput = (e) => {
        switch(e.target.id) {
            case 'accountName':
                return handleAccountName(e)
            case 'password':
                return handlePassword(e)
            default:
                return
        }
    }

    const handleAccountName = (e) => {
        const value = e.target.value
        setFormErrors(prevErrors => ({...prevErrors, accountName: false}))
        setAccountName(value)
    }

    const handlePassword = (e) => {
        const value = e.target.value
        setFormErrors(prevErrors => ({...prevErrors, password: false}))
        setPassword(value)
    }

    const handleStayLogged = () => {
        setStayLogged(!stayLogged)
    }

	const handleSubmit = (e) => {
        e.preventDefault()
        checkForm()
    }

    const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!accountName.trim()) {
            newFormErrors.accountName = true
        }
        if (!password.trim()) {
            newFormErrors.password = true
        }
        if (!Object.values(newFormErrors).includes(true)) {
            sendRequest()
        }
        else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}))
        }
    }

	const sendRequest = async () => {
        try {
            const response = await AuthService.login({
                accountName: accountName.trim(),
                password: password.trim()
            })
            handleLoginResponse(response ,stayLogged)
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
        if (input === 'accountName' && !accountName.trim()) {
            setFocus((prevFocus) => ({
                ...prevFocus, accountName: false
            }))
        }
        else if (input === 'password' && !password.trim()) {
            setFocus((prevFocus) => ({
                ...prevFocus, password: false
            }))
        }
    }

	return (
        <div className={`${styles.login} flex-center`}>
            <div className={`${styles.login_form} flex-col`}>
                <h1 className={styles.form_title}>
                    <span className={styles.primary_text}>Login</span>
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={`${styles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'InvalidAccountName') ? styles.form_input__error : ''}`}
                        onFocus={() => handleFocus('accountName')}
                        onBlur={() => handleBlur('accountName')}
                    >
                        <input
                            type='text'
                            id='accountName'
                            name='email'
                            className={`${styles.input} ${styles.primary_text} ${(focus.accountName || accountName) ? styles.input__focus : ''} ${formErrors.accountName ? styles.input__error : ''}`}
                            value={accountName}
                            onChange={(e) => handleInput(e)}
                        />
                        <label htmlFor='accountName' className={`${styles.input_label}
                            ${(focus.accountName || accountName) ? styles.input_label__shrink : ''}
                            ${formErrors.accountName ? styles.input_label__error : ''}`}>
                            <span className={`${styles.label} ${(focus.accountName || accountName) ? styles.primary_text__shrink : styles.primary_text}`}>Email or Username</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'InvalidAccountName' && (
                            <div className={styles.input_error}>
                                <WarningIcon className={styles.icon_warning}/>
                                <span className={styles.secondary_text_accent}>Please enter a valid account name</span>
                            </div>
                        )
                    )}
                    <div className={`${styles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'InvalidPassword') ? styles.form_input__error : ''}`}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                    >
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            className={`${styles.input_password} ${styles.primary_text} ${(focus.password || password) ? styles.input_password__focus : ''} ${formErrors.password ? styles.input__error : ''}`}
                            value={password}
                            onChange={(e) => handleInput(e)}
                        />
                        {(focus.password || password) && (
                            <button type='button' className={`${styles.input_password_icon} ${showPassword ? styles.input_password_icon__active : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                                {showPassword ? (
                                    <RevealIcon className={styles.icon_default}/>
                                ) : (
                                    <HiddenIcon className={styles.icon_default}/>
                                )}
                            </button>
                        )}
                        <label htmlFor='password' className={`${styles.input_label}
                            ${(focus.password || password) ? styles.input_label__shrink : ''}
                            ${formErrors.password ? styles.input_label__error : ''}`}>
                            <span className={`${styles.label} ${(focus.password || password) ? styles.primary_text__shrink : styles.primary_text}`}>Password</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'InvalidPassword' && (
                            <div className={styles.input_error}>
                                <WarningIcon className={styles.icon_warning}/>
                                <span className={styles.secondary_text_accent}>Please enter your password</span>
                            </div>
                        )
                    )}
                    <div className={`${styles.form_checkbox}`}>
                        <div className={`${styles.checkbox} flex-center`}>
                            <input type='checkbox' className={`${styles.box}`} checked={stayLogged} onChange={handleStayLogged}/>
                            {stayLogged && (
                                <CheckIcon className={styles.icon_check}/>
                            )}
                        </div>
                        <span className={`${styles.primary_text_accent__shrink} flex-center`}>Stay logged in</span>
                    </div>
                    <button type='submit' className={`${styles.form_submit} flex-center`}>
                        <ArrowIcon className={styles.icon_default}/>
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