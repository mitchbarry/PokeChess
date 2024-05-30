import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { hasBadWords } from 'expletives'


import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'
import errorUtilities from '../utilities/error.utilities'

import RegisterForm from '../components/RegisterForm'
import StarterForm from '../components/StarterForm'

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
    const [formErrors, setFormErrors] = useState({
        validated: false,
        initialRender: true,
        username: '',
        email: '',
        password: {
            passwordLength: true,
            passwordCharacters: true
        }
    })
    const [error, setError] = useState({})

    const handleUsername = (value) => {
        setFormErrors((prevErrors) => {
            prevErrors.validated = false
            switch (prevErrors.username) {
                case `Your username is required.`:
                    if (value) {
                        return { ...prevErrors, username: '' }
                    }
                    break
                case `Your username must be at least 3 characters.`:
                    if (value.length >= 3) {
                        return { ...prevErrors, username: '' }
                    }
                    break
                case `Your username can't be more than 16 characters.`:
                    if (value.length <= 16) {
                        return { ...prevErrors, username: '' }
                    }
                    break
                case `Your username can't contain special characters.`:
                    if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                        return { ...prevErrors, username: '' }
                    }
                    break
                case `Your username must be appropriate.`:
                    if (!hasBadWords(value)) {
                        return { ...prevErrors, username: '' }
                    }
                    break
            }
            return prevErrors
        })
        setUsername(value)
    }
    
    const handleEmail = (value) => {
        setFormErrors((prevErrors) => {
            prevErrors.validated = false
            switch (prevErrors.email) {
                case `Your email is required.`:
                    if (value) {
                        return { ...prevErrors, email: '' }
                    }
                    break
                case `Please enter a valid email.`:
                    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                        return { ...prevErrors, email: '' }
                    }
                    break
            }
            return prevErrors
        })
        setEmail(value)
    }
    
    const handlePassword = (value) => {
        setFormErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors }
            updatedErrors.validated = false
            if (value.length >= 8 && value.length <= 255) { // Check length
                updatedErrors.password.passwordLength = false
            } 
            else {
                updatedErrors.password.passwordLength = true
            }
            if (/^(?=.*[a-zA-Z])(?=.*\d).+$|^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$|^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).+$/.test(value)) {
                updatedErrors.password.passwordCharacters = false
            }
            else {
                updatedErrors.password.passwordCharacters = true
            }
            return updatedErrors
        })
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
        if (formErrors.validated) {
            setStep(step + 1)
        }
        else {
            checkForm()
        }
	}

    const checkForm = () => {
        const newFormErrors = { ...formErrors }
        const usernameTrim = username.trim()
        const emailTrim = email.trim()
        let hasError = false

        if (!usernameTrim) { // Check username on submit
            newFormErrors.username = `Your username is required.`
            hasError = true
        }
        else if (hasBadWords(usernameTrim)) {
            newFormErrors.username = `Your username must be appropriate.`
            hasError = true
        }
        else if (!/^[a-zA-Z0-9\s]+$/.test(usernameTrim)) {
            newFormErrors.username = `Your username can't contain special characters.`
            hasError = true
        }
        else if (usernameTrim.length < 3) {
            newFormErrors.username = `Your username must be at least 3 characters.`
            hasError = true
        }
        else if (usernameTrim.length > 16) {
            newFormErrors.username = `Your username can't be more than 16 characters.`
            hasError = true
        }

        if (!emailTrim) { // Check email on submit
            newFormErrors.email = `Your email is required.`
            hasError = true
        }
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailTrim)) {
            newFormErrors.email = `Please enter a valid email.`
            hasError = true
        }

        if (newFormErrors.password.passwordLength === true ||
            newFormErrors.password.passwordCharacters === true) {
                newFormErrors.initialRender = false
                hasError = true
        }

        if (hasError) {
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
            formErrors.validated = response.isValid
            setStep(step + 1)
            formErrors.initialRender = true
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
        <div className={`${registerStyles.register} flex-center`}>
            <div className={`${registerStyles.register_form}`}>
                <div className={`${registerStyles.register_step} flex-center w-100`}>
                    <div className={`${registerStyles.step_container}`}>
                        <div className={`${registerStyles.step_button} ${step === 0 ? registerStyles.step_button__active : registerStyles.step_button__disabled} clickable transition-default`} onClick={() => step !== 0 && setStep(0)}>
                        </div>
                    </div>
                    <div className={`${registerStyles.step_container}`}>
                        <div className={`${registerStyles.step_button} ${step === 1 ? registerStyles.step_button__active : registerStyles.step_button__disabled} clickable transition-default`} onClick={() => (formErrors.validated && step !== 1) && setStep(1)}>
                        </div>
                    </div>
                </div>

                <h1 className={registerStyles.form_title}>
                    <span className={registerStyles.primary_text}>{step === 0 ? 'Register' : 'Choose Your Starter'}</span>
                </h1>

                <form onSubmit={handleSubmit} className={registerStyles.form}>
                    {step === 0 ? (
                        <RegisterForm
                            username={username}
                            handleUsername={handleUsername}
                            email={email}
                            handleEmail={handleEmail}
                            password={password}
                            handlePassword={handlePassword}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
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
                        type="submit"
                        className={
                            `${registerStyles.form_submit}
                            ${
                                (!Object.entries(formErrors).every(([key, value]) => {
                                    if (key === 'password' || key === 'validated' || key === 'initialRender') {
                                        return true
                                    }
                                    return value === ''
                                }) ||
                                !formErrors.initialRender && (
                                    formErrors.password.passwordLength ||
                                    formErrors.password.passwordCharacters
                                )) ? registerStyles.form_submit__disabled : registerStyles.form_submit__active
                            }
                            flex-center w-100 transition-default`
                        }
                        disabled={
                            !Object.entries(formErrors).every(([key, value]) => {
                                if (key === 'password' || key === 'validated' || key === 'initialRender') {
                                    return true
                                }
                                return value === ''
                            }) ||
                            !formErrors.initialRender && (
                                formErrors.password.passwordLength ||
                                formErrors.password.passwordCharacters
                            )
                        }
                    >
                        <ArrowIcon className={registerStyles.icon_default}/>
                    </button>
                </form>

                {step === 0 && (
                    <div className={`${registerStyles.form_links} flex-col`}>
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