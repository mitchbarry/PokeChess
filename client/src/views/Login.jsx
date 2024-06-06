import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import OtherError from '../components/form/OtherError'
import Input from '../components/form/Input'
import FormError from '../components/form/FormError'
import ValidationError from '../components/form/ValidationError'
import StayLogged from '../components/form/StayLogged'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import ArrowIcon from '../components/svgs/ArrowSvg'

import styles from '../css/views/Login.module.css'

const Login = () => {

	const navigate = useNavigate()

	const { handleLoginResponse } = useAuth()

    const [accountName, setAccountName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [stayLogged, setStayLogged] = useState(false)
    const [formErrors, setFormErrors] = useState({
        accountName: '',
        password: ''
    })
	const [error, setError] = useState({})
    const [isReady, setIsReady] = useState(false)
    const [focus, setFocus] = useState('')

    const lastSubmitTime = useRef(0)

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleInput = (e) => {
        switch(e.target.id) {
            case 'accountName':
                return handleAccountName(e.target.value)
            case 'password':
                return handlePassword(e.target.value)
            default:
                return
        }
    }

    const handleAccountName = (value) => {
        setFormErrors(prevErrors => ({...prevErrors, accountName: ''}))
        setAccountName(value)
    }

    const handlePassword = (value) => {
        setFormErrors(prevErrors => ({...prevErrors, password: ''}))
        setPassword(value)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleStayLogged = () => {
        setStayLogged(!stayLogged)
    }

	const handleSubmit = (e) => {
        e.preventDefault()
        const now = Date.now()
        if (!isReady || now - lastSubmitTime.current < 1000) {
            const newError = {
                statusCode: 400,
                message: 'Form submission failed: Please wait before submitting again.',
                name: 'FormSubmissionError',
                validationErrors: {}
            }
            console.error(newError)
            setError(newError)
            return
        }
        else {
            setError({})
        }
        lastSubmitTime.current = now
        checkForm()
    }

    const checkForm = () => {
        const newFormErrors = {...formErrors}
        const hasErrors = Object.values(newFormErrors).some(value => value !== '')
        if (!accountName.trim()) {
            newFormErrors.accountName = `Please enter your email or username.`
        }
        if (!password.trim()) {
            newFormErrors.password = `Please enter your password.`
        }
        if (hasErrors) {
            setFormErrors(prevErrors => ({ ...prevErrors, ...newFormErrors }))
        }
        else {
            sendLoginRequest()
        }
    }

	const sendLoginRequest = async () => {
        try {
            const response = await AuthService.login({
                accountName: accountName.trim(),
                password: password.trim()
            })
            handleLoginResponse(response ,stayLogged)
            navigate('/')
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            setError(newError)
        }
    }

    const handleFocus = (newFocus) => {
        setFocus(newFocus)
    }

    const handleBlur = () => {
        setFocus('')
    }

	return (
        <div className={`${styles.container} flex-center flex-col`}>
            <div className={`${styles.login} flex-col`}>
                <h1 className={styles.form_title}>
                    <span className={styles.primary_text}>Login</span>
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <OtherError
                        error={error}
                    />
                    <Input
                        value={accountName}
                        handleInput={handleInput}
                        formErrors={formErrors}
                        error={error}
                        focus={focus}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
                        type='text'
                        name='accountName'
                        placeholder='Email or Username'
                    />
                    <FormError
                        formErrors={formErrors}
                        name='accountName'
                    />
                    <ValidationError
                        error={error}
                        name='accountName'
                    />
                    <Input
                        value={password}
                        handleInput={handleInput}
                        formErrors={formErrors}
                        error={error}
                        focus={focus}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
                        type={showPassword ? ' text' : 'password'}
                        name='password'
                        placeholder='Password'
                    >
                        {focus === 'password' && (
                            <button type='button' className={`${styles.input_password_icon} transition-default clickable`} tabIndex="-1" onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                                {showPassword ? (
                                    <RevealIcon className={`${styles.icon_default}`}/>
                                ) : (
                                    <HiddenIcon className={`${styles.icon_default}`}/>
                                )}
                            </button>
                        )}
                    </Input>
                    <FormError
                        formErrors={formErrors}
                        name='password'
                    />
                    <ValidationError
                        error={error}
                        name='password'
                    />
                    <StayLogged
                        stayLogged={stayLogged}
                        handleStayLogged={handleStayLogged}
                        placeholder='Stay logged in?'
                    />
                    <button type='submit' className={`${styles.form_submit} flex-center w-100 clickable transition-default`}>
                        <ArrowIcon className={styles.icon_default}/>
                    </button>
                </form>
                <div className={`${styles.form_links} flex-col w-100`}>
                    <Link className={`${styles.form_link} transition-default`} to='/register'>
                        <span className={styles.primary_text__shrink}>Create an Account</span>
                    </Link>
                    <Link className={`${styles.form_link} transition-default`} to='/contact'>
                        <span className={styles.primary_text__shrink}>Can't log in?</span>
                    </Link>
                </div>
            </div>
        </div>
	)
}

export default Login