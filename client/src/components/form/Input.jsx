import React from 'react'

import inputStyles from '../../css/components/form/Input.module.css'

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
        <div id={name} className={`${inputStyles.form_input} ${((error.validationErrors && error.validationErrors[name]) || (formErrors[name])) && inputStyles.form_input__error} w-100`}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
        >
            <input
                type={name !== 'password' ? 'text' : showPassword ? ' text' : 'password'}
                id={name}
                name={name}
                className={`${inputStyles.input} ${inputStyles.primary_text} ${((formErrors[name]) || (error.validationErrors && error.validationErrors[name])) && inputStyles.input__error} w-100 transition-default`}
                value={value}
                onChange={(e) => handleInput(e)}
            />
            <label htmlFor={name} className={`${inputStyles.input_label}
                ${(focus[name] || value) && inputStyles.input_label__shrink}
                ${((formErrors[name]) || (error.validationErrors && error.validationErrors[name])) && inputStyles.input_label__error} transition-default`}>
                <span className={`${inputStyles.label} ${(focus[name] || value) ? inputStyles.primary_text__shrink : inputStyles.primary_text} transition-default`}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </label>
        </div>
	)
}

export default Input