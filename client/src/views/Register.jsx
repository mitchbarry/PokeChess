import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import AuthService from '../services/AuthService'

import RegisterForm from '../components/RegisterForm'
import StarterForm from '../components/StarterForm'

import registerStyles from '../css/views/Register.module.css'

const Register = () => {

    const navigate = useNavigate()

    const { handleLoginResponse } = useAuth()

    const [page, setPage] = useState(0)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [starter, setStarter] = useState(0)

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

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest()
	}

    const sendRequest = async () => {
        try {
            const response = await AuthService.validateUser({
                username: username.trim(),
                email: email.trim(),
                password: password
            })
            console.log(response)
            // handleLoginResponse(response)
            // navigate('/')
        }
        catch (error) {
            const newError = errorUtilities.catchError(error)
            handleError(newError)
        }
    }

	return (
        <div className={`${registerStyles.register} flex-center`}>
            {page === 0 ? (
                <RegisterForm
                    handlePage={handlePage}
                    username={username}
                    handleUsername={handleUsername}
                    email={email}
                    handleEmail={handleEmail}
                    password={password}
                    handlePassword={handlePassword}
                />
            ) : (
                page === 1 && (
                    <StarterForm
                        username={username}
                        email={email}
                        password={password}
                        starter={starter}
                        handleStarter={handleStarter}
                        error={error}
                        handleError={handleError}
                        focus={focus}
                        handleFocus={handleFocus}
                    />
                )
            )}
            <>
                
            </>
        </div>
	)
}

export default Register