import React from 'react'

import Input from './Input'
import FormError from './FormError'
import ServerError from './ServerError'
import PasswordValidation from './PasswordValidation'

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
        error,
        focus,
        handleFocus,
        handleBlur
    } = props

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

    return (
        <>
            <ServerError
                error={error}
            />
            <Input
                value={username}
                handleInput={handleInput}
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                type='text'
                name='username'
                placeholder='Username'
            />
            <FormError
                formErrors={formErrors}
                name='username'
            />
            <ServerError
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
                type='text' // opted to not use email type because of browser default styling
                name='email'
                placeholder='Email'
            />
            <FormError
                formErrors={formErrors}
                name='email'
            />
            <ServerError
                error={error}
                name='email'
            />
            <Input
                value={password}
                handleInput={handleInput}
                initialRender={initialRender}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                formErrors={formErrors}
                error={error}
                focus={focus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                type={showPassword ? ' text' : 'password'}
                name='password'
                placeholder='Password'
            >
            </Input>
            <ServerError
                error={error}
                name='password'
            />
            <PasswordValidation
                formErrors={formErrors}
                error={error}
                initialRender={initialRender}
            />
        </>
	)
}

export default CredentialsForm