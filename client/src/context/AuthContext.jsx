import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

import AuthService from '../services/AuthService'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

	const [loggedUser, setLoggedUser] = useState(null) // State to store user information
	
	const handleLoginResponse = (response) => {
		setLoggedUser(response.user)
	}

	const handleLoginToken = async (cookieToken) => {
		try {
            const { user } = await AuthService.getUserInfo(cookieToken)
            setLoggedUser(user)
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
		<AuthContext.Provider value={{ loggedUser, handleLoginResponse, pathParamValidator, handleLoginToken }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext