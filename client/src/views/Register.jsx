import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hasBadWords } from 'expletives'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import CredentialsForm from '../components/form/CredentialsForm'
import StarterForm from '../components/form/StarterForm'

import ArrowIcon from '../components/svgs/ArrowSvg'
import LoadingSpinner from '../components/svgs/LoadingSpinnerSvg'

import styles from '../css/views/Register.module.css'

const Register = () => {

    const navigate = useNavigate()

    const { handleLoginResponse } = useAuth()

    const [step, setStep] = useState(0)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [starter, setStarter] = useState(0)
    const [initialRender, setInitialRender] = useState(true)
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: {
            passwordLength: true,
            passwordCharacters: true
        }
    })
    const [error, setError] = useState(null)
    const [validated, setValidated] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [focus, setFocus] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const lastSubmitTime = useRef(0)

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleUsername = (value) => {
        setValidated(false)
        const newFormErrors = { ...formErrors }
        switch (newFormErrors.username) {
            case 'Your username is required.':
                if (value) {
                    newFormErrors.username = ''
                }
                break
            case 'Your username must be at least 3 characters.':
                if (value.length >= 3) {
                    newFormErrors.username = ''
                }
                break
            case `Your username can't be more than 16 characters.`:
                if (value.length <= 16) {
                    newFormErrors.username = ''
                }
                break
            case `Your username can't contain special characters.`:
                if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                    newFormErrors.username = ''
                }
                break
            case 'Your username must be appropriate.':
                if (!hasBadWords(value)) {
                    newFormErrors.username = ''
                }
                break
            default:
                break
        }
        setFormErrors(newFormErrors)
        setUsername(value)
    }

    const handleEmail = (value) => {
        setValidated(false)
        const newFormErrors = { ...formErrors }
        switch (newFormErrors.email) {
            case 'Your email is required.':
                if (value) {
                    newFormErrors.email = ''
                }
                break
            case 'Please enter a valid email.':
                if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                    newFormErrors.email = ''
                }
                break
            default:
                break
        }
        setFormErrors(newFormErrors)
        setEmail(value)
    }

    const handlePassword = (value) => {
        setValidated(false)
        const newFormErrors = { ...formErrors }
        if (value.length >= 8 && value.length <= 255) {
            newFormErrors.password.passwordLength = false
        }
        else {
            newFormErrors.password.passwordLength = true
        }
        if (/^(?=.*[a-zA-Z])(?=.*\d).+$|^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$|^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).+$/.test(value)) {
            newFormErrors.password.passwordCharacters = false
        }
        else {
            newFormErrors.password.passwordCharacters = true
        }
        setFormErrors(newFormErrors)
        setPassword(value)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleStarter = (starter) => {
        setStarter(starter)
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
        lastSubmitTime.current = now
        checkForm()
	}

    const checkForm = () => {
        setInitialRender(false)
        const newFormErrors = { ...formErrors }
        const usernameTrim = username.trim()
        const emailTrim = email.trim()
        if (!usernameTrim) { // Check username on submit
            newFormErrors.username = `Your username is required.`
        }
        else if (hasBadWords(usernameTrim)) {
            newFormErrors.username = `Your username must be appropriate.`
        }
        else if (!/^[a-zA-Z0-9\s]+$/.test(usernameTrim)) {
            newFormErrors.username = `Your username can't contain special characters.`
        }
        else if (usernameTrim.length < 3) {
            newFormErrors.username = `Your username must be at least 3 characters.`
        }
        else if (usernameTrim.length > 16) {
            newFormErrors.username = `Your username can't be more than 16 characters.`
        }
        
        if (!emailTrim) { // Check email on submit
            newFormErrors.email = `Your email is required.`
        }
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailTrim)) {
            newFormErrors.email = `Please enter a valid email.`
        }
        const hasErrors = Object.values(newFormErrors).some(value => {
            if (typeof value === 'object') {
                return Object.values(value).some(val => val !== false)
            }
            return value !== ''
        })
        if (hasErrors) {
            setFormErrors(prevErrors => ({ ...prevErrors, ...newFormErrors }))
            setStep(0)
        }
        else {
            step === 0 ? sendValidationRequest() : sendRegisterRequest()
        }
    }

    const sendValidationRequest = async () => {
        setIsLoading(true)
        try {
            await AuthService.validateUser({
                username: username.trim(),
                email: email.trim(),
                password,
                starter
            })
            setStep(1)
            setValidated(true)
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            setError(newError)
        }
        finally {
            setIsLoading(false)
        }
    }

    const sendRegisterRequest = async () => {
        const randomNumber = Math.floor(Math.random() * 9) + 1
        setIsLoading(true)
        try {
            const response = await AuthService.register({
                username: username.trim(),
                email: email.trim(),
                password,
                starter,
                avatar: `avatar${randomNumber}`
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
            <div className={`${styles.register}`}>
                <div className={`flex-center w-100`}>
                    <div className={`${styles.step_button} ${step === 0 ? styles.step_button__active : styles.step_button__disabled} clickable transition-default`} onClick={() => setStep(0)} />
                    <div className={`${styles.step_button} ${step === 1 ? styles.step_button__active : styles.step_button__disabled} clickable transition-default`} onClick={() => validated && setStep(1)} />
                </div>
                <h1 className={styles.form_title}>
                    <span className={styles.primary_text}>{step === 0 ? 'Register' : 'Choose Your Starter'}</span>
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {step === 0 ? (
                        <CredentialsForm
                            username={username}
                            handleUsername={handleUsername}
                            email={email}
                            handleEmail={handleEmail}
                            password={password}
                            handlePassword={handlePassword}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            initialRender={initialRender}
                            formErrors={formErrors}
                            error={error}
                            focus={focus}
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                        />
                    ) : ( step === 1 && (
                        <StarterForm
                            starter={starter}
                            handleStarter={handleStarter}
                            focus={focus}
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                        />
                    ))}
                    <button 
                        type='submit'
                        className={
                            `${styles.form_submit}
                            ${
                                (!Object.values(formErrors).every((value) => {
                                    if (typeof value === 'object') {
                                        return true
                                    }
                                    return !value
                                }) ||
                                ((!initialRender) && (formErrors.password.passwordLength || formErrors.password.passwordCharacters))) ?
                                styles.form_submit__disabled : styles.form_submit__active
                            }
                            flex-center w-100 transition-default`
                        }
                        disabled={
                            !Object.values(formErrors).every((value) => {
                                if (typeof value === 'object') {
                                    return true
                                }
                                return !value
                            }) ||
                            ((!initialRender) && (formErrors.password.passwordLength || formErrors.password.passwordCharacters))
                        }
                    >
                        {isLoading ? (
                            <LoadingSpinner className={`${styles.icon_loadingSpinner}`}/>
                        ) : (
                            <ArrowIcon className={styles.icon_default}/>
                        )}
                    </button>
                </form>
                {step === 0 && (
                    <div className={`${styles.form_links} flex-col w-100`}>
                        <Link className={`${styles.form_link} transition-default`} to='/login'>
                            <span className={styles.primary_text__shrink}>Already have an account?</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
	)
}

export default Register