import React, { useState } from 'react'

import Input from './form/Input'
import InputPassword from './form/InputPassword'

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
        initialRender,
        formErrors,
        error
    } = props

	const [focus, setFocus] = useState({
		username: false,
		email: false,
		password: false
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
        if (input === 'username') {
            return setFocus((prevFocus) => ({
                ...prevFocus, username: false
            }))
        }
        if (input === 'email') {
            return setFocus((prevFocus) => ({
                ...prevFocus, email: false
            }))
        }
        if (input === 'password') {
            return setFocus((prevFocus) => ({
                ...prevFocus, password: false
            }))
        }
    }

    return (
        <>
            <Input
                value={username}
                handleInput={handleInput}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                name='username'
            />

            <Input
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                type='text'
                name='email'
                value={email}
                handleInput={handleInput}
            />

            <InputPassword
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                handleShowPassword={handleShowPassword}
                initialRender={initialRender}
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                handleInput={handleInput}
            />
        </>
	)
}

export default RegisterForm