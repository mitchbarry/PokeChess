import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import ErrorNavigator from "./components/ErrorNavigator";

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

	const { authToken, handleLoginToken } = useAuth();

	const [errors, setErrors] = useState({});

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

	return (
		<>
			<Header />
			<Routes>
				{/* Root Route */}
				<Route path={"/" || ""} element={Cookies.get("authToken") || authToken ? <Navigate to="/lobbies/home" /> : <Navigate to="/login" />} />

				{/* Non-Auth Routes */}
				<Route path="/error" element={<Error errors={errors}/>}/>
				<Route path="/pokedex" element={<PokeDex />} />
				<Route path="/pokenews" element={<PokeNews/>} />

				{/* Login Routes */}
				<Route path="/login" element={Cookies.get("authToken") || authToken ? <Navigate to="/lobbies/home" /> : <LoginForm />} />
				<Route path="/register" element={Cookies.get("authToken") || authToken ? <Navigate to="/lobbies/home" /> : <RegistrationForm />} />
			
				{/* Auth Routes */}
				<PrivateRoute path="/lobbies/new" element={Cookies.get("authToken") || authToken ? <CreateLobby /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<PrivateRoute path="/lobbies/:id/edit" element={Cookies.get("authToken") || authToken ? <UpdateLobby /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<PrivateRoute path="/lobbies/home" element={Cookies.get("authToken") || authToken ? <LobbyHome /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<PrivateRoute path="/play/:id" element={Cookies.get("authToken") || authToken ? <Play /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />

				{/* Catch All Route */}
				<Route path="*" element={<ErrorNavigator error={404} updateErrors={updateErrors} />} />
			</Routes>
		</>
	);
}

export default App;