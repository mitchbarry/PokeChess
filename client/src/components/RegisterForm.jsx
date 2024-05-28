import React, { useState } from 'react'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../components/svgs/WarningSvg'
import CheckIcon from '../components/svgs/CheckSvg'
import XIcon from '../components/svgs/XSvg'

import registerFormStyles from '../css/components/RegisterForm.module.css'

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
            <div className={`${registerFormStyles.form_input} ${(Object.keys(error).length !== 0 && error.message) || (formErrors.username !== '') ? registerFormStyles.form_input__error : ''}`}
                onFocus={() => handleFocus('username')}
                onBlur={() => handleBlur('username')}
            >
                <input
                    type='text'
                    id='username'
                    name='username'
                    className={`${registerFormStyles.input} ${registerFormStyles.primary_text} ${(focus.username || username) ? registerFormStyles.input__focus : ''} ${formErrors.username ? registerFormStyles.input__error : ''}`}
                    value={username}
                    onChange={(e) => handleInput(e)}
                />
                <label htmlFor='username' className={`${registerFormStyles.input_label}
                    ${(focus.username || username) ? registerFormStyles.input_label__shrink : ''}
                    ${formErrors.username ? registerFormStyles.input_label__error : ''}`}>
                    <span className={`${registerFormStyles.label} ${(focus.username || username) ? registerFormStyles.primary_text__shrink : registerFormStyles.primary_text}`}>Username</span>
                </label>
            </div>

            {formErrors.username !== '' && (
                <div className={registerFormStyles.error_container}>
                    <WarningIcon className={registerFormStyles.icon_warning}/>
                    <span className={registerFormStyles.secondary_text_accent}>{formErrors.username}</span>
                </div>
            )}

            {Object.keys(error).length !== 0 && (
                error.validationErrors.username && (
                    <div className={registerFormStyles.error_container}>
                        <WarningIcon className={registerFormStyles.icon_warning}/>
                        <span className={registerFormStyles.secondary_text_accent}>{error.validationErrors.username}</span>
                    </div>
                )
            )}

            <div className={`${registerFormStyles.form_input} ${(Object.keys(error).length !== 0 && error.message) || (formErrors.email !== '')? registerFormStyles.form_input__error : ''}`}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
            >
                <input
                    type='text'
                    id='email'
                    name='email'
                    className={`${registerFormStyles.input} ${registerFormStyles.primary_text} ${(focus.email || email) ? registerFormStyles.input__focus : ''} ${formErrors.email ? registerFormStyles.input__error : ''}`}
                    value={email}
                    onChange={(e) => handleInput(e)}
                />
                <label htmlFor='email' className={`${registerFormStyles.input_label}
                    ${(focus.email || email) ? registerFormStyles.input_label__shrink : ''}
                    ${formErrors.email ? registerFormStyles.input_label__error : ''}`}>
                    <span className={`${registerFormStyles.label} ${(focus.email || email) ? registerFormStyles.primary_text__shrink : registerFormStyles.primary_text}`}>Email</span>
                </label>
            </div>

            {formErrors.email !== '' && (
                <div className={registerFormStyles.error_container}>
                    <WarningIcon className={registerFormStyles.icon_warning}/>
                    <span className={registerFormStyles.secondary_text_accent}>{formErrors.email}</span>
                </div>
            )}

            {Object.keys(error).length !== 0 && (
                error.validationErrors.email && (
                    <div className={registerFormStyles.error_container}>
                        <WarningIcon className={registerFormStyles.icon_warning}/>
                        <span className={registerFormStyles.secondary_text_accent}>{error.validationErrors.email}</span>
                    </div>
                )
            )}

            <div className={`${registerFormStyles.form_password} ${(Object.keys(error).length !== 0 && error.message) ? registerFormStyles.form_input__error : ''}`}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    className={`${registerFormStyles.input_password} ${registerFormStyles.primary_text} ${(focus.password || password) ? registerFormStyles.input_password__focus : ''} ${(Object.values(formErrors.password).some(value => value) && !formErrors.initialRender) ? registerFormStyles.input__error : ''}`}
                    value={password}
                    onChange={(e) => handleInput(e)}
                />
                {(focus.password || password) && (
                    <button type='button' className={`${registerFormStyles.input_password_icon} ${showPassword ? registerFormStyles.input_password_icon__active : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                        {showPassword ? (
                            <RevealIcon className={registerFormStyles.icon_default}/>
                        ) : (
                            <HiddenIcon className={registerFormStyles.icon_default}/>
                        )}
                    </button>
                )}
                <label htmlFor='password' className={`${registerFormStyles.input_label}
                    ${(focus.password || password) ? registerFormStyles.input_label__shrink : ''}
                    ${(Object.values(formErrors.password).some(value => value) && !formErrors.initialRender ) ? registerFormStyles.input_label__error : ''}`}>
                    <span className={`${registerFormStyles.label} ${(focus.password || password) ? registerFormStyles.primary_text__shrink : registerFormStyles.primary_text}`}>Password</span>
                </label>
            </div>

            {Object.keys(error).length !== 0 && ( // THIS BIT IS CONFUSING BECASUE MAYBE EVEN IF ITS AN EMPTY STRING IT GETS HASHED THEN IT CHECKS THE HASH FUCKKK
                error.validationErrors.password && (
                    <div className={registerFormStyles.error_container}>
                        <WarningIcon className={registerFormStyles.icon_warning}/>
                        <span className={registerFormStyles.secondary_text_accent}>{error.validationErrors.password}</span>
                    </div>
                )
            )}

            <div className={registerFormStyles.form_password_check}>
                <div className={`${registerFormStyles.password_check}`}>
                    <div className={`${registerFormStyles.password_check_box} flex-center`}>
                    <div className={`${registerFormStyles.check_box} ${!formErrors.password.passwordLength ? registerFormStyles.check_box__checked : !formErrors.initialRender ? registerFormStyles.check_box__error : ''}`}/>
                        {!formErrors.password.passwordLength ? (
                            <CheckIcon className={registerFormStyles.icon_check}/>
                        ) : (
                            <XIcon className={`${registerFormStyles.icon_check}`}/>
                        )}
                    </div>
                    <span className={`${registerFormStyles.primary_text_accent__shrink} flex-center`}>Password is at least 8 characters.</span>
                </div>
                <div className={`${registerFormStyles.password_check}`}>
                    <div className={`${registerFormStyles.password_check_box} flex-center`}>
                        <div className={`${registerFormStyles.check_box} ${!formErrors.password.passwordCharacters ? registerFormStyles.check_box__checked : !formErrors.initialRender ? registerFormStyles.check_box__error : ''}`}/>
                        {!formErrors.password.passwordCharacters ? (
                            <CheckIcon className={registerFormStyles.icon_check}/>
                        ) : (
                            <XIcon className={`${registerFormStyles.icon_check}`}/>
                        )}
                    </div>
                    <span className={`${registerFormStyles.primary_text_accent__shrink} flex-center`}>Password includes two of the following letter, number, or symbol.</span>
                </div>
            </div>
        </>
	)
}

export default RegisterForm