import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

import AuthService from '../services/AuthService'
import ErrorUtilities from '../utilities/error.utilities'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

	const [loggedUser, setLoggedUser] = useState(null)
	
	const handleLoginResponse = (response) => {
		setLoggedUser(response.user)
	}

	const validateAuthCookie = async () => {
		try {
            const response = await AuthService.validateAuthCookie()
            if (response.user) {
				setLoggedUser(response.user)
			}
        }
        catch (error) {
            ErrorUtilities.catchError(error)
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

	const handleLogout = async () => {
        try {
            const serverResponse = await AuthService.logout(/*token*/) // token may be passed through to invalidate it via a blacklist (have not yet implemented)
			setLoggedUser(null)
			console.log(serverResponse)
        }
        catch (error) {
            console.error('Logout failed:', error)
        }
	}

	return (
		<AuthContext.Provider value={{ loggedUser, handleLoginResponse, pathParamValidator, validateAuthCookie, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext