import React from 'react'

import HiddenIcon from '../components/svgs/HiddenSvg'
import RevealIcon from '../components/svgs/RevealSvg'
import WarningIcon from '../svgs/WarningSvg'

import inputStyles from '../../css/components/form/Input.module.css'

const FormInput = (props) => {

    const {
        value,
        handleInput,
        showPassword,
        handleShowPassword,
        formErrors,
        error,
        focus,
        handleFocus,
        handleBlur,
        name
    } = props

    return (
        <>
            <div className={`${inputStyles.form_input} ${(Object.keys(error).length !== 0 && error.message) || (formErrors[name] !== '') ? inputStyles.form_input__error : ''} w-100`}
                onFocus={() => handleFocus(name)}
                onBlur={() => handleBlur(name)}
            >
                <input
                    type={type}
                    id={name}
                    name={name}
                    className={`${inputStyles.input} ${inputStyles.primary_text} ${(focus[name]) ? inputStyles.input__focus : ''} ${formErrors[name] ? inputStyles.input__error : ''} w-100 transition-default`}
                    value={value}
                    onChange={(e) => handleInput(e)}
                />
                <label htmlFor={name} className={`${inputStyles.input_label}
                    ${(focus[name] || value) ? inputStyles.input_label__shrink : ''}
                    ${formErrors[name] ? inputStyles.input_label__error : ''} transition-default`}>
                    <span className={`${inputStyles.label} ${(focus[name] || value) ? inputStyles.primary_text__shrink : inputStyles.primary_text} transition-default`}>{name}</span>
                </label>
                (name === 'password' && 
                    {(focus.password) && (
                        <button type='button' className={`${inputStyles.input_password_icon} ${showPassword ? inputStyles.input_password_icon__active : ''} transition-default clickable`} tabIndex="-1" onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                            {showPassword ? (
                                <RevealIcon className={`${inputStyles.icon_default}`}/>
                            ) : (
                                <HiddenIcon className={`${inputStyles.icon_default}`}/>
                            )}
                        </button>
                    )}
                )
            </div>



            {formErrors[name] !== '' && (
                <div className={inputStyles.error_container}>
                    <WarningIcon className={inputStyles.icon_warning}/>
                    <span className={inputStyles.secondary_text_accent}>{formErrors[name]}</span>
                </div>
            )}

            {Object.keys(error).length !== 0 && (
                error.validationErrors[name] && (
                    <div className={inputStyles.error_container}>
                        <WarningIcon className={inputStyles.icon_warning}/>
                        <span className={inputStyles.secondary_text_accent}>{error.validationErrors[name]}</span>
                    </div>
                )
            )}
        </>
	)
}

export default FormInput