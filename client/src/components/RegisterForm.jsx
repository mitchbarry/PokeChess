import React, { useState } from 'react'
import { hasBadWords } from 'expletives'

import errorUtilities from '../utilities/error.utilities'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../components/svgs/WarningSvg'
import CheckIcon from '../components/svgs/CheckSvg'
import XIcon from '../components/svgs/XSvg'

import registerStyles from '../css/views/Register.module.css'

const RegisterForm = (props) => {

    const {
        username,
        handleUsername,
        email,
        handleEmail,
        password,
        handlePassword,
        showPassword,
        handleShowPassword,
        formErrors,
        error
    } = props

	const [focus, setFocus] = useState({
		username: false,
		email: false,
		password: false,
	})

    const handleInput = (e) => {
        switch(e.target.id) {
            case 'username':
                return handleUsername(e.target.value)
            case 'email':
                return handleEmail(e.target.value)
            case 'password':
                return handlePassword(e.target.value)
            default:
                return
        }
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
        <>
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
        </>
	)
}

export default RegisterForm