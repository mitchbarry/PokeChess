import React from 'react'

import styles from '../../css/components/form/Input.module.css'

const Input = (props) => {

    const {
        value,
        handleInput,
        formErrors,
        error,
        focus,
        handleFocus,
        handleBlur,
        name
    } = props

    return (
        <div id={name} className={`${styles.form_input} ${((error.validationErrors && error.validationErrors[name]) || (formErrors[name])) && styles.form_input__error} w-100`}
            onFocus={(e) => handleFocus(e.target.id)}
            onBlur={(e) => handleBlur(e.target.id)}
        >
            <input
                type={name !== 'password' ? 'text' : showPassword ? ' text' : 'password'}
                id={name}
                name={name}
                className={`${styles.input} ${styles.primary_text} ${((formErrors[name]) || (error.validationErrors && error.validationErrors[name])) && styles.input__error} w-100 transition-default`}
                value={value}
                onChange={(e) => handleInput(e)}
            />
            <label htmlFor={name} className={`${styles.input_label}
                ${(focus === name || value) && styles.input_label__shrink}
                ${((formErrors[name]) || (error.validationErrors && error.validationErrors[name])) && styles.input_label__error} transition-default`}>
                <span className={`${styles.label} ${(focus === name || value) ? styles.primary_text__shrink : styles.primary_text} transition-default`}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </label>
        </div>
	)
}

export default Input