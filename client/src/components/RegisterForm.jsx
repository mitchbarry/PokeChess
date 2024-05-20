import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { hasBadWords } from 'expletives'

import errorUtilities from '../utilities/error.utilities'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../components/svgs/WarningSvg'
import ArrowIcon from '../components/svgs/ArrowSvg'
import CheckIcon from '../components/svgs/CheckSvg'
import XIcon from '../components/svgs/XSvg'

import registerStyles from '../css/views/Register.module.css'

const RegisterForm = (props) => {

    const {
        handlePage,
        username,
        handleUsername,
        email,
        handleEmail,
        password,
        handlePassword
    } = props

    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: {
            initialRender: true,
            passwordLength: true,
            passwordCharacters: true
        }
    })
    const [error, setError] = useState({})
	const [focus, setFocus] = useState({
		username: false,
		email: false,
		password: false,
	})

    const handleInput = (e) => {
        switch(e.target.id) {
            case 'username':
                return handleUsernameInput(e)
            case 'email':
                return handleEmailInput(e)
            case 'password':
                return handlePasswordInput(e)
            default:
                return
        }
    }

    const handleUsernameInput = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
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
        handleUsername(value)
    }

    const handleEmailInput = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
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
        handleEmail(value)
    }

    const handlePasswordInput = (e) => {
        const value = e.target.value
        setFormErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors }
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
        handlePassword(value)
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
                newFormErrors.password.initialRender = false
                hasError = true
        }

        if (hasError) {
            setFormErrors(prevErrors => ({ ...prevErrors, ...newFormErrors }))
        }
        else {
            sendValidationRequest()
        }
    }

    const sendValidationRequest = async () => {
        try {
            await AuthService.validateUser({
                username: username.trim(),
                email: email.trim(),
                password: password
            })
            handlePage(page + 1)
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            handleError(newError)
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
        <div className={`${registerStyles.register_form} flex-col`}>
            <h1 className={registerStyles.form_title}>
                <span className={registerStyles.primary_text}>Register</span>
            </h1>
            <form onSubmit={handleSubmit} className={registerStyles.form}>
                <div className={`${registerStyles.form_input} ${(Object.keys(error).length !== 0 && error.message) || (formErrors.username !== '') ? registerStyles.form_input__error : ''}`}
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
                {Object.keys(error).length !== 0 && (
                    error.validationErrors.username && (
                        <div className={registerStyles.input_error}>
                            <WarningIcon className={registerStyles.icon_warning}/>
                            <span className={registerStyles.secondary_text_accent}>{error.validationErrors.username}</span>
                        </div>
                    )
                )}
                <div className={`${registerStyles.form_input} ${(Object.keys(error).length !== 0 && error.message) || (formErrors.email !== '')? registerStyles.form_input__error : ''}`}
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
                {Object.keys(error).length !== 0 && (
                    error.validationErrors.email && (
                        <div className={registerStyles.input_error}>
                            <WarningIcon className={registerStyles.icon_warning}/>
                            <span className={registerStyles.secondary_text_accent}>{error.validationErrors.email}</span>
                        </div>
                    )
                )}
                <div className={`${registerStyles.form_password} ${(Object.keys(error).length !== 0 && error.message) ? registerStyles.form_input__error : ''}`}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                >
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        name='password'
                        className={`${registerStyles.input_password} ${registerStyles.primary_text} ${(focus.password || password) ? registerStyles.input_password__focus : ''} ${(Object.values(formErrors.password).some(value => value) && !formErrors.password.initialRender) ? registerStyles.input__error : ''}`}
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
                        ${(Object.values(formErrors.password).some(value => value) && !formErrors.password.initialRender )? registerStyles.input_label__error : ''}`}>
                        <span className={`${registerStyles.label} ${(focus.password || password) ? registerStyles.primary_text__shrink : registerStyles.primary_text}`}>Password</span>
                    </label>
                </div>
                {Object.keys(error).length !== 0 && ( // THIS BIT IS CONFUSING BECASUE MAYBE EVEN IF ITS AN EMPTY STRING IT GETS HASHED THEN IT CHECKS THE HASH FUCKKK
                    error.validationErrors.password && (
                        <div className={registerStyles.input_error}>
                            <WarningIcon className={registerStyles.icon_warning}/>
                            <span className={registerStyles.secondary_text_accent}>{error.validationErrors.password}</span>
                        </div>
                    )
                )}
                <div className={registerStyles.form_password_check}>
                    <div className={`${registerStyles.password_check}`}>
                        <div className={`${registerStyles.password_check_box} flex-center`}>
                            <div className={`${registerStyles.check_box} ${!formErrors.password.passwordLength ? registerStyles.check_box__checked : ''}`}/>
                            {!formErrors.password.passwordLength ? (
                                <CheckIcon className={registerStyles.icon_check}/>
                            ) : (
                                <XIcon className={registerStyles.icon_check}/>
                            )}
                        </div>
                        <span className={`${registerStyles.primary_text_accent__shrink} flex-center`}>Password is at least 8 characters.</span>
                    </div>
                    <div className={`${registerStyles.password_check}`}>
                        <div className={`${registerStyles.password_check_box} flex-center`}>
                            <div className={`${registerStyles.check_box} ${!formErrors.password.passwordCharacters ? registerStyles.check_box__checked : ''}`}/>
                            {!formErrors.password.passwordCharacters ? (
                                <CheckIcon className={registerStyles.icon_check}/>
                            ) : (
                                <XIcon className={registerStyles.icon_check}/>
                            )}
                        </div>
                        <span className={`${registerStyles.primary_text_accent__shrink} flex-center`}>Password includes two of the following letter, number, or symbol.</span>
                    </div>
                </div>
                <button 
                    type="submit"
                    className={
                        `${registerStyles.form_submit}
                        ${
                            (!Object.entries(formErrors).every(([key, value]) => {
                                if (key === 'password') {
                                    return true
                                }
                                return value === ''
                            }) ||
                            !formErrors.password.initialRender && (
                                formErrors.password.passwordLength ||
                                formErrors.password.passwordCharacters
                            )) ? registerStyles.form_submit__disabled : registerStyles.form_submit__active
                        }
                        flex-center`
                    }
                    disabled={
                        !Object.entries(formErrors).every(([key, value]) => {
                            if (key === 'password') {
                                return true
                            }
                            return value === ''
                        }) ||
                        !formErrors.password.initialRender && (
                            formErrors.password.passwordLength ||
                            formErrors.password.passwordCharacters
                        )
                    }
                >
                    <ArrowIcon className={registerStyles.icon_default}/>
                </button>
            </form>
            <div className={`${registerStyles.form_links} flex-col`}>
                <Link className={registerStyles.form_link} to='/login'>
                    <span className={registerStyles.primary_text__shrink}>Already have an account?</span>
                </Link>
            </div>
        </div>
	)
}

export default RegisterForm