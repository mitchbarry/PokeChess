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

import loginStyles from '../css/views/Login.module.css'

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
        if (!accountName.trim() || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(accountName)) {
            newFormErrors.accountName = true
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
        } else if (input === 'password' && !password.trim()) {
            setFocus((prevFocus) => ({
                ...prevFocus, password: false
            }))
        }
    }

	return (
        <div className={`${loginStyles.login} flex-center`}>
            <div className={`${loginStyles.login_form} flex-col`}>
                <h1 className={loginStyles.form_title}>
                    <span className={loginStyles.primary_text}>Login</span>
                </h1>
                <form onSubmit={handleSubmit} className={loginStyles.form}>
                    <div className={`${loginStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'InvalidAccountName') ? loginStyles.form_input__error : ''}`}
                        onFocus={() => handleFocus('accountName')}
                        onBlur={() => handleBlur('accountName')}
                    >
                        <input
                            type='text'
                            id='accountName'
                            name='email'
                            className={`${loginStyles.input} ${loginStyles.primary_text} ${(focus.accountName || accountName) ? loginStyles.input__focus : ''} ${formErrors.accountName ? loginStyles.input__error : ''}`}
                            value={accountName}
                            onChange={(e) => handleInput(e)}
                        />
                        <label htmlFor='accountName' className={`${loginStyles.input_label}
                            ${(focus.accountName || accountName) ? loginStyles.input_label__shrink : ''}
                            ${formErrors.accountName ? loginStyles.input_label__error : ''}`}>
                            <span className={`${loginStyles.label} ${(focus.accountName || accountName) ? loginStyles.primary_text__shrink : loginStyles.primary_text}`}>Email or Username</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'InvalidAccountName' && (
                            <div className={loginStyles.input_error}>
                                <WarningIcon className={loginStyles.icon_warning}/>
                                <span className={loginStyles.secondary_text_accent}>Please enter a valid account name.</span>
                            </div>
                        )
                    )}
                    <div className={`${loginStyles.form_input} ${(Object.keys(errors).length !== 0 && errors.message === 'InvalidPassword') ? loginStyles.form_input__error : ''}`}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                    >
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            className={`${loginStyles.input_password} ${loginStyles.primary_text} ${(focus.password || password) ? loginStyles.input_password__focus : ''} ${formErrors.password ? loginStyles.input__error : ''}`}
                            value={password}
                            onChange={(e) => handleInput(e)}
                        />
                        {(focus.password || password) && (
                            <button type='button' className={`${loginStyles.input_password_icon} ${showPassword ? loginStyles.input_password_icon__active : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                                {showPassword ? (
                                    <RevealIcon className={loginStyles.icon_default}/>
                                ) : (
                                    <HiddenIcon className={loginStyles.icon_default}/>
                                )}
                            </button>
                        )}
                        <label htmlFor='password' className={`${loginStyles.input_label}
                            ${(focus.password || password) ? loginStyles.input_label__shrink : ''}
                            ${formErrors.password ? loginStyles.input_label__error : ''}`}>
                            <span className={`${loginStyles.label} ${(focus.password || password) ? loginStyles.primary_text__shrink : loginStyles.primary_text}`}>Password</span>
                        </label>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        errors.message === 'InvalidPassword' && (
                            <div className={loginStyles.input_error}>
                                <WarningIcon className={loginStyles.icon_warning}/>
                                <span className={loginStyles.secondary_text_accent}>Please enter your password.</span>
                            </div>
                        )
                    )}
                    <div className={`${loginStyles.form_checkbox}`}>
                        <div className={`${loginStyles.checkbox} flex-center`}>
                            <input type='checkbox' className={`${loginStyles.box}`} checked={stayLogged} onChange={handleStayLogged}/>
                            {stayLogged && (
                                <CheckIcon className={loginStyles.icon_check}/>
                            )}
                        </div>
                        <span className={`${loginStyles.primary_text_accent__shrink} flex-center`}>Stay logged in</span>
                    </div>
                    <button type='submit' className={`${loginStyles.form_submit} flex-center`}>
                        <ArrowIcon className={loginStyles.icon_default}/>
                    </button>
                </form>
                <div className={`${loginStyles.form_links} flex-col`}>
                    <Link className={loginStyles.form_link} to='/register'>
                        <span className={loginStyles.primary_text__shrink}>Create an Account</span>
                    </Link>
                    <Link className={loginStyles.form_link} to='/contact'>
                        <span className={loginStyles.primary_text__shrink}>Can't log in?</span>
                    </Link>
                </div>
            </div>
        </div>
	)
}

export default LoginForm