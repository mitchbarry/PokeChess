import React from 'react'

import HiddenIcon from '../svgs/HiddenSvg'
import RevealIcon from '../svgs/RevealSvg'

import styles from '../../css/components/form/InputPassword.module.css'

const InputPassword = (props) => {

    const {
        value,
        handleInput,
        showPassword,
        handleShowPassword,
        initialRender,
        formErrors,
        error,
        focus,
        handleFocus,
        handleBlur,
        name
    } = props

    return (
        <div id={name} className={`${styles.form_input} w-100`}
            onFocus={(e) => handleFocus(e.target.id)}
            onBlur={(e) => handleBlur(e.target.id)}
        >
            <input
                type={showPassword ? ' text' : 'password'}
                id={name}
                name={name}
                className={`${styles.input} ${styles.primary_text} ${((Object.values(formErrors.password).some(value => value) && !initialRender) || (error.validationErrors && error.validationErrors.password)) && styles.input__error} w-100 transition-default`}
                value={value}
                onChange={(e) => handleInput(e)}
            />
            <label htmlFor={name} className={`${styles.input_label}
                ${(focus === name || value) && styles.input_label__shrink}
                ${((Object.values(formErrors.password).some(value => value) && !initialRender) || (error.validationErrors && error.validationErrors.password)) && styles.input_label__error} transition-default`}>
                <span className={`${styles.label} ${(focus === name || value) ? styles.primary_text__shrink : styles.primary_text} transition-default`}>Password</span>
            </label>
            {(focus === name) && (
                <button type='button' className={`${styles.input_password_icon} transition-default clickable`} tabIndex="-1" onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
                    {showPassword ? (
                        <RevealIcon className={`${styles.icon_default}`}/>
                    ) : (
                        <HiddenIcon className={`${styles.icon_default}`}/>
                    )}
                </button>
            )}
        </div>
	)
}

export default InputPassword