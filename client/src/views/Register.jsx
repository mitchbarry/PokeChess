import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { hasBadWords } from 'expletives'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import Error from '../components/form/Error'
import CredentialsForm from '../components/form/CredentialsForm'
import StarterForm from '../components/form/StarterForm'

import ArrowIcon from '../components/svgs/ArrowSvg'

import registerStyles from '../css/views/Register.module.css'

const Register = () => {

    const navigate = useNavigate()

    const { handleLoginResponse } = useAuth()

    const [step, setStep] = useState(0)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [starter, setStarter] = useState(0)
    const [validated, setValidated] = useState(false)
    const [initialRender, setInitialRender] = useState(true)
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: {
            passwordLength: true,
            passwordCharacters: true
        }
    })
    const [error, setError] = useState({})
    const [isReady, setIsReady] = useState(false)
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
                    newFormErrors.username = false
                }
                break
            case 'Your username must be at least 3 characters.':
                if (value.length >= 3) {
                    newFormErrors.username = false
                }
                break
            case `Your username can't be more than 16 characters.`:
                if (value.length <= 16) {
                    newFormErrors.username = false
                }
                break
            case `Your username can't contain special characters.`:
                if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                    newFormErrors.username = false
                }
                break
            case 'Your username must be appropriate.':
                if (!hasBadWords(value)) {
                    newFormErrors.username = false
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
                    newFormErrors.email = false
                }
                break
            case 'Please enter a valid email.':
                if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                    newFormErrors.email = false
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
            setError({
                statusCode: 400,
                message: 'Form submission failed: Please wait before submitting again.',
                name: 'FormSubmissionError',
                validationErrors: {}
            })
            return
        }
        else {
            setError({})
        }
        lastSubmitTime.current = now;
        if (validated) {
            setStep(step + 1)
        }
        else {
            checkForm()
        }
	}

    const checkForm = () => {
        const usernameTrim = username.trim()
        const emailTrim = email.trim()
        setInitialRender(false)
        const newFormErrors = { ...formErrors }
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
        if (!Object.values(newFormErrors).every(value => typeof value === 'object' ? Object.values(value).every(val => val === false) : value === false)) {
            setFormErrors(prevErrors => ({ ...prevErrors, ...newFormErrors }))
            if (step !== 0) {
                setStep(0)
            }
        }
        else {
            if (step === 0) {
                sendValidationRequest()
            }
            else {
                sendCreateRequest()
            }
        }
    }

    const sendValidationRequest = async () => {
        try {
            const response = await AuthService.validateUser({
                username: username.trim(),
                email: email.trim(),
                password
            })
            setValidated(response.isValid)
            setStep(step + 1)
            setInitialRender(true)
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            setError(newError)
        }
    }

    const sendCreateRequest = async () => {
        try {
            const response = await AuthService.validateUser({
                username: username.trim(),
                email: email.trim(),
                password,
                starter
            })
            handleLoginResponse(response)
            navigate('/')
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            setError(newError)
        }
    }

	return (
        <div className={`${registerStyles.container} flex-center flex-col`}>
            <div className={`${registerStyles.register}`}>
                <div className={`flex-center w-100`}>
                    <div className={`${registerStyles.step_button} ${step === 0 ? registerStyles.step_button__active : registerStyles.step_button__disabled} clickable transition-default`} onClick={() => step !== 0 && setStep(0)} />
                    <div className={`${registerStyles.step_button} ${step === 1 ? registerStyles.step_button__active : registerStyles.step_button__disabled} clickable transition-default`} onClick={() => (validated && step !== 1) && setStep(1)} />
                </div>
                <h1 className={registerStyles.form_title}>
                    <span className={registerStyles.primary_text}>{step === 0 ? 'Register' : 'Choose Your Starter'}</span>
                </h1>
                <Error
                    error={error}
                />
                <form onSubmit={handleSubmit} className={registerStyles.form}>
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
                        />
                    ) : (
                    step === 1 && (
                        <StarterForm
                            starter={starter}
                            handleStarter={handleStarter}
                        />
                    ))}
                    <button 
                        type='submit'
                        className={
                            `${registerStyles.form_submit}
                            ${
                                (!Object.values(formErrors).every((value) => {
                                    if (typeof value === 'object') {
                                        return true
                                    }
                                    return !value
                                }) ||
                                ((!initialRender) && (formErrors.password.passwordLength || formErrors.password.passwordCharacters))) ? 
                                registerStyles.form_submit__disabled : registerStyles.form_submit__active
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
                        <ArrowIcon className={registerStyles.icon_default}/>
                    </button>
                </form>
                {step === 0 && (
                    <div className={`${registerStyles.form_links} flex-col w-100`}>
                        <Link className={`${registerStyles.form_link} transition-default`} to='/login'>
                            <span className={registerStyles.primary_text__shrink}>Already have an account?</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
	)
}

export default Register