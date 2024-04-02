import React, { createContext, useContext, useState } from "react"
import Cookies from "js-cookie";

import AuthService from "../services/AuthService";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

	const [authToken, setAuthToken] = useState(null); // State to store authentication token
	const [loggedUser, setLoggedUser] = useState(null); // State to store user information

	const updateAuthToken = (newToken) => {
		setAuthToken(newToken);
	};

	const updateLoggedUser = (newUser) => {
		setLoggedUser(newUser);
	};
	
	const handleLoginResponse = (response) => {
		setAuthToken(response.token);
		setLoggedUser(response.user);
		Cookies.set("authToken", response.token, { expires: 7 }); // Set the token as a browser cookie with an expiry time (1 week)
	}

	const handleLogout = async () => {
        try {
            await AuthService.logout(/*token*/); // token may be passed through to invalidate it via a blacklist (have not yet implemented)
			setAuthToken(null);
			Cookies.remove("authToken");
			setLoggedUser(null);
        }
        catch (error) {
            console.error("Logout failed:", error);
        }
	}

	const pathParamValidator = (path) => { // this should be included in a otherwise empty useEffect that runs on component mount for components that contain a :id param
		const pathSegments = path.split('/');
		const numberOfSegments = pathSegments.length;
		let valid = true;
		const isValidId = (id) => {
			const objectIdPattern = /^[0-9a-fA-F]{24}$/;
			return objectIdPattern.test(id);
		}
		for (let i = 0; i < numberOfSegments; i++) {
			if (pathSegments[i] !== "play" || pathSegments[i] !== "lobbies" || pathSegments[i] !== "edit") { // hardcoded to check the segments of paths that contain a param
				if (!isValidId(pathSegments[i])) {
					valid = false;
				}
			}
		}
		return valid;
	}

	return (
		<AuthContext.Provider value={{ authToken, loggedUser, handleLoginResponse, handleLogout, updateLoggedUser, updateAuthToken, pathParamValidator }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext