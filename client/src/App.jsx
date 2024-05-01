import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { useAuth } from './context/AuthContext'

import Header from './components/Header'
import ErrorNavigator from './components/ErrorNavigator'

import Landing from './views/Landing'
import Error from './views/Error'
import Pokedex from './views/Pokedex'
import News from './views/News'
import About from './views/About'
import Contact from './views/Contact'

import Login from './views/Login'
import Registration from './views/Registration'
import Account from './views/Account'
import AccountEdit from './views/AccountEdit'

import LobbyCreate from './views/LobbyCreate'
import LobbyEdit from './views/LobbyEdit'
import Play from './views/Play'
import Lobbies from './views/Lobbies'


import './App.css'
import './css/utility.css'

const App = () => {

	const { authToken, handleLoginToken } = useAuth()

	const [errors, setErrors] = useState({})

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
		<div id='background'>
			<Header />
			<Routes>
				{/* Root Route */}
				<Route path={'/' || ''} element={<Landing />} />

				{/* Non-Auth Routes */}
				<Route path='/error' element={<Error errors={errors}/>}/>
				<Route path='/pokedex' element={<Pokedex />} />
				<Route path='/news' element={<News/>} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />

				{/* Login Routes */}
				<Route path='/login' element={Cookies.get('authToken') || authToken ? <Navigate to='/home' /> : <Login />} />
				<Route path='/register' element={Cookies.get('authToken') || authToken ? <Navigate to='/home' /> : <Registration />} />
			
				{/* Auth Routes */}
				<Route path='/account' element={Cookies.get('authToken') || authToken ? <Account /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<Route path='/account/settings' element={Cookies.get('authToken') || authToken ? <AccountEdit /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<Route path='/lobbies' element={Cookies.get('authToken') || authToken ? <Lobbies /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<Route path='/lobbies/new' element={Cookies.get('authToken') || authToken ? <LobbyCreate /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<Route path='/lobbies/:id/edit' element={Cookies.get('authToken') || authToken ? <LobbyEdit /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />
				<Route path='/play/:id' element={Cookies.get('authToken') || authToken ? <Play /> : <ErrorNavigator error={401} updateErrors={updateErrors} />} />

				{/* Catch All Route */}
				<Route path='*' element={<ErrorNavigator error={404} updateErrors={updateErrors} />} />
			</Routes>
		</div>
	)
}

export default App