import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useAuth } from "./context/AuthContext";
import AuthService from "./services/AuthService";

import Header from "./components/Header";
import ErrorNavigator from "./components/ErrorNavigator";
import LoginNavigator from "./components/LoginNavigator";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn";

import RegistrationForm from "./views/RegistrationForm";
import PokeDex from './views/PokeDex';
import PokeNews from "./views/PokeNews";
import CreateLobby from './views/CreateLobby';
import UpdateLobby from './views/UpdateLobby';
import Play from "./views/Play";
import LobbyHome from './views/LobbyHome';
import LoginForm from "./views/LoginForm";
import Error from "./views/Error";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {

	const { authToken, updateLoggedUser, updateAuthToken } = useAuth();

	const [errors, setErrors] = useState({}); // Moved state inside the component

	const updateErrors = (newErrors) => {
		setErrors(newErrors);
	};

	useEffect(() => {
		const cookieToken = Cookies.get("authToken");
		if (cookieToken) {
			if (!authToken) {
				handleLoginToken(cookieToken);
			}
		}
	},[])
	
	const handleLoginToken = async (cookieToken) => {
		let userResponse;
		try {
            userResponse = await AuthService.getUserInfo(cookieToken);
        }
        catch (error) {
            console.error("Login failed:", error); // Handle login error
            Cookies.remove("authToken");
        }
		finally {
			updateAuthToken(cookieToken); // Set the token and user information in state
            updateLoggedUser(userResponse);
		}
	}

	return (
		<>
			<Header />
			<Routes>
				{/* Root Route */}
				<Route path={"/" || ""} element={authToken ? <AlreadyLoggedIn /> : <LoginNavigator />} />

				{/* Non-Auth Routes */}
				<Route path="/error" element={<Error errors={errors}/>}/>
				<Route path="/pokedex" element={<PokeDex />} />
				<Route path="/pokenews" element={<PokeNews/>} />

				{/* Login Routes */}
				<Route path="/login" element={authToken ? <AlreadyLoggedIn /> : <LoginForm />} />
				<Route path="/register" element={authToken ? <AlreadyLoggedIn /> : <RegistrationForm />} />
			
				{/* Auth Routes */}
				<Route path="/lobbies/new" element={authToken ? <CreateLobby /> : <ErrorNavigator error={401} updateErrors={updateErrors} errors={errors} />} />
				<Route path="/lobbies/:id/edit" element={authToken ? <UpdateLobby /> : <ErrorNavigator error={401} updateErrors={updateErrors} errors={errors} />} />
				<Route path="/lobbies/home" element={authToken ? <LobbyHome /> : <ErrorNavigator error={401} updateErrors={updateErrors} errors={errors} />}/>
				<Route path="/play/:id" element={authToken ? <Play /> : <ErrorNavigator error={401} updateErrors={updateErrors} errors={errors} />} />

				{/* Catch All Route */}
				<Route path="*" element={<ErrorNavigator error={404} updateErrors={updateErrors} errors={errors}/>} />
			</Routes>
		</>
	);
}

export default App;