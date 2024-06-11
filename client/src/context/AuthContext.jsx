import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

import AuthService from '../services/AuthService'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

	const [authToken, setAuthToken] = useState(null) // State to store authentication token
	const [loggedUser, setLoggedUser] = useState(null) // State to store user information

	const updateAuthToken = (newToken) => {
		setAuthToken(newToken)
	}

	const updateLoggedUser = (newUser) => {
		setLoggedUser(newUser)
	}
	
	const handleLoginResponse = (response, stayLogged = false) => {
		const {password, ...userWithoutPassword} = response.user
		setAuthToken(response.token);
		setLoggedUser(userWithoutPassword);
		if (stayLogged) {
			Cookies.set('authToken', response.token, { expires: 7 })
		}
	}

	const handleLoginToken = async (cookieToken) => {
		try {
            const response = await AuthService.getUserInfo(cookieToken)
			const {password, ...userWithoutPassword} = response.user
			setAuthToken(cookieToken)
            setLoggedUser(userWithoutPassword)
        }
        catch (error) {
            console.error('Login failed.', error)
            Cookies.remove('authToken')
        }
	}

	const pathParamValidator = (path) => { // this should be included in a otherwise empty useEffect that runs on component mount for components that contain a :id param
		const pathSegments = path.split('/')
		const numberOfSegments = pathSegments.length
		let valid = true
		const isValidId = (id) => {
			const objectIdPattern = /^[0-9a-fA-F]{24}$/
			return objectIdPattern.test(id)
		}
		for (let i = 0; i < numberOfSegments; i++) {
			if (pathSegments[i] !== 'play' || pathSegments[i] !== 'lobbies' || pathSegments[i] !== 'edit') { // hardcoded to check the segments of paths that contain a param
				if (!isValidId(pathSegments[i])) {
					valid = false
				}
			}
		}
		return valid
	}

	return (
		<AuthContext.Provider value={{ authToken, loggedUser, handleLoginResponse, updateLoggedUser, updateAuthToken, pathParamValidator, handleLoginToken }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext