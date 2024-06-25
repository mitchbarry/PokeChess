import React from 'react'

import HiddenIcon from '../svgs/HiddenSvg'
import RevealIcon from '../svgs/RevealSvg'

import styles from '../../css/components/form/Input.module.css'

const Input = (props) => {

    const {
        value,
        handleInput,
        initialRender = null,
        showPassword = null,
        handleShowPassword = null,
        formErrors,
        error,
        focus,
        handleFocus,
        handleBlur,
        type,
        name,
        placeholder
    } = props

    const hasError = formErrors[name] || (error && error.validationErrors[name]);

    return (
        <div id={name} className={`${styles.container} w-100`}
            onFocus={(e) => handleFocus(e.target.id)}
            onBlur={(e) => handleBlur(e.target.id)}
        >
            <input
                type={type}
                id={name}
                name={name}
                className={`
                    ${styles.input}
                    ${name === 'password' && styles.input__password}
                    ${styles.primary_text}
                    ${initialRender === null ? (hasError ? styles.input_error : '') : (!initialRender && hasError ? styles.input__error : '')}
                    w-100
                    transition-default
                `}
                value={value}
                onChange={(e) => handleInput(e)}
            />
            <label htmlFor={name} className={`
                ${styles.input_label}
                ${(focus === name || value) && styles.input_label__shrink}
                ${initialRender === null ? (hasError ? styles.input_label__error : '') : (!initialRender && hasError ? styles.input_label__error : '')}
                transition-default
            `}>
                <span className={`
                    ${styles.label}
                    ${(focus === name || value) ? styles.primary_text__shrink : styles.primary_text}
                    transition-default
                `}>
                    {placeholder}
                </span>
            </label>
            {name === 'password' && focus === 'password' && (
                <button type='button' className={`${styles.input_password_icon} transition-default clickable`} tabIndex='-1' onMouseDown={(e) => e.preventDefault()} onClick={handleShowPassword}>
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

export default Input