import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import Input from '../components/form/Input'
import FormError from '../components/form/FormError'
import ServerError from '../components/form/ServerError'
import StayLogged from '../components/form/StayLogged'

import ArrowIcon from '../components/svgs/ArrowSvg'
import LoadingSpinner from '../components/svgs/LoadingSpinnerSvg'

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
	const [error, setError] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [focus, setFocus] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const lastSubmitTime = useRef(0)

    const cookieConsent = Cookies.get('cookieConsent')
    const parsedCookieConsent = cookieConsent ? JSON.parse(cookieConsent) : null

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
            setError(null)
        }
        lastSubmitTime.current = now
        checkForm()
    }

    const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!accountName.trim()) {
            newFormErrors.accountName = `Please enter your email or username.`
        }
        if (!password.trim()) {
            newFormErrors.password = `Please enter your password.`
        }
        const hasErrors = Object.values(newFormErrors).some(value => value !== '')
        if (hasErrors) {
            setFormErrors(prevErrors => ({ ...prevErrors, ...newFormErrors }))
        }
        else {
            sendLoginRequest()
        }
    }

	const sendLoginRequest = async () => {
        setIsLoading(true)
        try {
            const response = await AuthService.login({
                accountName: accountName.trim(),
                password: password.trim(),
                stayLogged: stayLogged && parsedCookieConsent && parsedCookieConsent.necessary
            })
            handleLoginResponse(response)
            navigate('/')
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            setError(newError)
        }
        finally {
            setIsLoading(false)
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
                    <Input
                        value={password}
                        handleInput={handleInput}
                        showPassword={showPassword}
                        handleShowPassword={handleShowPassword}
                        formErrors={formErrors}
                        error={error}
                        focus={focus}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
                        type={showPassword ? ' text' : 'password'}
                        name='password'
                        placeholder='Password'
                    />
                    <FormError
                        formErrors={formErrors}
                        name='password'
                    />
                    <ServerError
                        error={error}
                    />
                    {parsedCookieConsent && parsedCookieConsent.necessary && (
                        <StayLogged
                            stayLogged={stayLogged}
                            handleStayLogged={handleStayLogged}
                            placeholder='Stay logged in'
                        />
                    )}
                    <button type='submit' className={`${styles.form_submit} flex-center w-100 clickable transition-default`}>
                        {isLoading ? (
                            <LoadingSpinner className={`${styles.icon_loadingSpinner}`}/>
                        ) : (
                            <ArrowIcon className={styles.icon_default}/>
                        )}
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