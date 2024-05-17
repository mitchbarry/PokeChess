import React, { useState } from 'react'

import RegisterForm from '../components/RegisterForm'
import StarterForm from '../components/StarterForm'

const Register = () => {

    const [page, setPage] = useState(0)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [starter, setStarter] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: false,
        passwordErrors: {
            passwordLength: true,
            passwordCharacters: true
        }
    })
    const [error, setError] = useState({})
	const [focus, setFocus] = useState({
		username: false,
		email: false,
		password: false,
        starter: {
            bulbasaur: false,
            charmander: false,
            squirtle: false,
            pikachu: false
        }
	})

    const handlePage = (page) => {
        setPage(page)
    }

    const handleUsername = (username) => {
        setUsername(username)
    }
    
    const handleEmail = (email) => {
        setEmail(email)
    }
    
    const handlePassword = (password) => {
        setPassword(password)
    }
    
    const handleStarter = (starter) => {
        setStarter(starter)
    }
    
    const handleShowPassword = (showPassword) => {
        setShowPassword(showPassword)
    }
    
    const handleFormErrors = (formErrors) => {
        setFormErrors(formErrors)
    }
    
    const handleError = (error) => {
        setError(error)
    }
    
    const handleFocus = (focus) => {
        setFocus(focus)
    }

	return (
        <div>
            {page === 0 ? (
                <RegisterForm
                    handlePage={handlePage}
                    username={username} handleUsername={handleUsername}
                    email={email} handleEmail={handleEmail}
                    password={password} handlePassword={handlePassword}
                    handleShowPassword={handleShowPassword}
                    handleFormErrors={handleFormErrors}
                    handleError={handleError}
                    handleFocus={handleFocus}
                />
            ) : (
                <StarterForm
                    username={username}
                    email={email}
                    password={password}
                    starter={starter} handleStarter={handleStarter}
                    handleError={handleError}
                    handleFocus={handleFocus}
                />
            )}
            <>
            </>
        </div>
	)
}

export default Register