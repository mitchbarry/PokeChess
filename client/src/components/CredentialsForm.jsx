import React, { useState } from 'react'

import Input from './form/Input'
import InputErrors from './form/InputErrors'
import InputPassword from './form/InputPassword'
import PasswordCheck from './form/PasswordCheck'

const CredentialsForm = (props) => {

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
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                name='username'
            />

            <InputErrors
                formErrors={formErrors}
                error={error}
                name='username'
            />

            <Input
                value={email}
                handleInput={handleInput}
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                name='email'
            />

            <InputErrors
                formErrors={formErrors}
                error={error}
                name='email'
            />

            <InputPassword
                value={password}
                handleInput={handleInput}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                initialRender={initialRender}
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                name='password'
            />

            <PasswordCheck
                formErrors={formErrors}
                error={error}
                initialRender={initialRender}
            />
        </>
	)
}

export default CredentialsForm