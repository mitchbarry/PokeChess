import React from 'react'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../svgs/WarningSvg'
import CheckIcon from '../components/svgs/CheckSvg'
import XIcon from '../components/svgs/XSvg'

import inputPasswordStyles from '../../css/components/form/InputPassword.module.css'

const InputPassword = (props) => {

    const {
        formErrors,
        error,
        focus,
        handleFocus,
        handleBlur,
        handleShowPassword,
        type,
        name,
        value,
        handleInput
    } = props

    return (
        <>
            <div className={`${inputPasswordStyles.form_password} ${(Object.keys(error).length !== 0 && error.message) ? inputPasswordStyles.form_input__error : ''} w-100`}
                onFocus={() => handleFocus(name)}
                onBlur={() => handleBlur(name)}
            >
                <input
                    type={type}
                    id={name}
                    name={name}
                    className={`${inputPasswordStyles.input_password} ${inputPasswordStyles.primary_text} ${(focus[name]) ? inputPasswordStyles.input_password__focus : ''} ${(Object.values(formErrors[name]).some(value => value) && !initialRender) ? inputPasswordStyles.input__error : ''} w-100 transition-default`}
                    value={password}
                    onChange={(e) => handleInput(e)}
                />
                <label htmlFor='password' className={`${inputPasswordStyles.input_label}
                    ${(focus.password || password) ? inputPasswordStyles.input_label__shrink : ''}
                    ${(Object.values(formErrors.password).some(value => value) && !initialRender ) ? inputPasswordStyles.input_label__error : ''} transition-default`}>
                    <span className={`${inputPasswordStyles.label} ${(focus.password || password) ? inputPasswordStyles.primary_text__shrink : inputPasswordStyles.primary_text} transition-default`}>Password</span>
                </label>
                {(focus.password) && (
                    <button type='button' className={`${inputPasswordStyles.input_password_icon} ${showPassword ? inputPasswordStyles.input_password_icon__active : ''} transition-default clickable`} tabIndex="-1" onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                        {showPassword ? (
                            <RevealIcon className={`${inputPasswordStyles.icon_default}`}/>
                        ) : (
                            <HiddenIcon className={`${inputPasswordStyles.icon_default}`}/>
                        )}
                    </button>
                )}
            </div>

            {Object.keys(error).length !== 0 && ( // THIS BIT IS CONFUSING BECASUE MAYBE EVEN IF ITS AN EMPTY STRING IT GETS HASHED THEN IT CHECKS THE HASH FUCKKK
                error.validationErrors.password && (
                    <div className={inputPasswordStyles.error_container}>
                        <WarningIcon className={inputPasswordStyles.icon_warning}/>
                        <span className={inputPasswordStyles.secondary_text_accent}>{error.validationErrors.password}</span>
                    </div>
                )
            )}

            <div className={inputPasswordStyles.form_password_check}>
                <div className={`${inputPasswordStyles.password_check}`}>
                    <div className={`${inputPasswordStyles.password_check_box} flex-center`}>
                    <div className={`${inputPasswordStyles.check_box} ${!formErrors.password.passwordLength ? inputPasswordStyles.check_box__checked : !initialRender ? inputPasswordStyles.check_box__error : ''}`}/>
                        {!formErrors.password.passwordLength ? (
                            <CheckIcon className={inputPasswordStyles.icon_check}/>
                        ) : (
                            <XIcon className={`${inputPasswordStyles.icon_check}`}/>
                        )}
                    </div>
                    <span className={`${inputPasswordStyles.primary_text_accent__shrink} flex-center`}>Password is at least 8 characters.</span>
                </div>
                <div className={`${inputPasswordStyles.password_check}`}>
                    <div className={`${inputPasswordStyles.password_check_box} flex-center`}>
                        <div className={`${inputPasswordStyles.check_box} ${!formErrors.password.passwordCharacters ? inputPasswordStyles.check_box__checked : !initialRender ? inputPasswordStyles.check_box__error : ''}`}/>
                        {!formErrors.password.passwordCharacters ? (
                            <CheckIcon className={inputPasswordStyles.icon_check}/>
                        ) : (
                            <XIcon className={`${inputPasswordStyles.icon_check}`}/>
                        )}
                    </div>
                    <span className={`${inputPasswordStyles.primary_text_accent__shrink} flex-center`}>Password includes two of the following letter, number, or symbol.</span>
                </div>
            </div>
        </>
	)
}

export default InputPassword