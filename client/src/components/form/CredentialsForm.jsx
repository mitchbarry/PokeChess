import React from 'react'

import OtherError from './OtherError'
import Input from './Input'
import FormError from './FormError'
import ValidationError from './ValidationError'
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
            <OtherError
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
            <ValidationError
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
                type='email'
                name='email'
                placeholder='Email'
            />
            <FormError
                formErrors={formErrors}
                name='email'
            />
            <ValidationError
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
                placeholder='Password'
            />
            <ValidationError
                error={error}
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