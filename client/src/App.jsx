import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { useAuth } from './context/AuthContext'

import ScreenSize from './components/ScreenSize'
import Header from './components/Header'
import ErrorNavigator from './components/ErrorNavigator'

import Login from './views/Login'
import Registration from './views/Registration'
import PokeDex from './views/PokeDex'
import PokeNews from './views/PokeNews'
import CreateLobby from './views/CreateLobby'
import UpdateLobby from './views/UpdateLobby'
import Play from './views/Play'
import LobbyHome from './views/LobbyHome'
import Error from './views/Error'

import './App.css'
import './css/utility.css'

const App = () => {

	const { authToken, handleLoginToken } = useAuth()

	const [errors, setErrors] = useState({})
	const [size, setSize] = useState({width: 1920, height: 1080})

	const updateSize = (newSize) => {
		setSize(newSize)
	}

	const updateErrors = (newErrors) => {
		setErrors(newErrors)
	}

	useEffect(() => {
		const cookieToken = Cookies.get('authToken')
		if (cookieToken) {
			if (!authToken) {
				handleLoginToken(cookieToken)
			}
		}
	},[])

	return (
		<>
			<ScreenSize updateSize={updateSize} /> {/* ! THIS LINE IS FOR DEV PURPOSES ONLY -- COMMENT OUT BEFORE PUSHING TO PROD */}
			<div id='container'> {/* ! THIS LINE IS FOR DEV PURPOSES ONLY -- COMMENT OUT BEFORE PUSHING TO PROD */}
				<div id='screen_size' style={{width: `${size.width}px`, height: `${size.height}px`}}> {/* ! THIS LINE IS FOR DEV PURPOSES ONLY -- COMMENT OUT BEFORE PUSHING TO PROD */}
					<Header />
					<Routes>
						{/* Root Route */}
						<Route path={'/' || ''} element={Cookies.get('authToken') || authToken ? <Navigate to='/lobbies/home' /> : <Navigate to='/login' />} />

						{/* Non-Auth Routes */}
						<Route path='/error' element={<Error errors={errors}/>}/>
						<Route path='/pokedex' element={<PokeDex />} />
						<Route path='/pokenews' element={<PokeNews/>} />

						{/* Login Routes */}
						<Route path='/login' element={Cookies.get('authToken') || authToken ? <Navigate to='/lobbies/home' /> : <Login />} />
						<Route path='/register' element={Cookies.get('authToken') || authToken ? <Navigate to='/lobbies/home' /> : <Registration />} />
					
						{/* Auth Routes */}
						<Route path='/lobbies/new' element={Cookies.get('authToken') || authToken ? <CreateLobby /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
						<Route path='/lobbies/:id/edit' element={Cookies.get('authToken') || authToken ? <UpdateLobby /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
						<Route path='/lobbies/home' element={Cookies.get('authToken') || authToken ? <LobbyHome /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
						<Route path='/play/:id' element={Cookies.get('authToken') || authToken ? <Play /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />

						{/* Catch All Route */}
						<Route path='*' element={<ErrorNavigator error={404} updateErrors={updateErrors} />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;