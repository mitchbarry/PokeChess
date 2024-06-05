import React, { useState } from 'react'

import Input from './Input'
import InputError from './InputError'
import InputPassword from './InputPassword'
import PasswordCheck from './PasswordCheck'

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

    const handleFocus = (e) => {
        const { id } = e.target
        setFocus((prevFocus) => ({
            ...prevFocus, [id]: true,
        }))
    }

    const handleBlur = (e) => {
        const { id } = e.target
        setFocus((prevFocus) => ({
            ...prevFocus, [id]: false
        }))
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

            <InputError
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

            <InputError
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