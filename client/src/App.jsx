import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { useAuth } from './context/AuthContext'
import ErrorUtilities from './utilities/error.utilities'

import Header from './components/Header'
import Return from './components/Return'
import ErrorNavigator from './components/ErrorNavigator'
import CookieConsent from './components/CookieConsent'
import Footer from './components/Footer'

import Landing from './views/Landing'

import Error from './views/Error'
import Pokedex from './views/Pokedex'
import News from './views/News'
import About from './views/About'
import CookiePolicy from './views/CookiePolicy'
import CookieSettings from './views/CookieSettings'
import Contact from './views/Contact'
import Lobbies from './views/Lobbies'
import Play from './views/Play'

import Login from './views/Login'
import Register from './views/Register'

import Account from './views/Account'
import AccountEdit from './views/AccountEdit'
import LobbyCreate from './views/LobbyCreate'
import LobbyEdit from './views/LobbyEdit'

import './app.css'
import './css/utility.css'

const App = () => {

	const location = useLocation()

	const { loggedUser, checkAuthCookie } = useAuth()

	const [error, setError] = useState({})
	const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false)

	const handleError = (newError) => {
		setError(newError)
	}

	const handleIsCookieBannerVisible = (newVisibility) => {
		setIsCookieBannerVisible(newVisibility)
	}

	useEffect(() => {
		const cookieConsent = Cookies.get('cookieConsent')
		if (!cookieConsent) {
			const timer = setTimeout(() => {
				setIsCookieBannerVisible(true)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [])

	useEffect(() => {
		const checkCookieToken = async () => {
			const cookieToken = Cookies.get('cookieAgreement')
			if (cookieToken && !loggedUser) {
				try {
					await checkAuthCookie()
				}
				catch (error) {
					const newError = ErrorUtilities.catchError(error)
					setError(newError)
					Cookies.remove('authToken')
				}
			}
		}
		checkCookieToken()
	}, [loggedUser])

	return (
		<div id='background'>
			<div id='container'>
				{!['/login', '/register'].includes(location.pathname) ? <Header /> : <Return />}
				<Routes>
					{/* Root Route */}
					<Route path={'/' || ''} element={<Landing />} />

					{/* Non-Auth Routes */}
					<Route path='/error' element={<Error error={error}/>}/>
					<Route path='/pokedex' element={<Pokedex />} />
					<Route path='/news' element={<News/>} />
					<Route path='/about' element={<About />} />
					<Route path='/cookies/policy' element={<CookiePolicy />} />
					<Route path='/cookies/settings' element={<CookieSettings />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/lobbies' element={<Lobbies />} />
					<Route path='/play/:id' element={<Play />} />

					{/* Login Routes */}
					<Route path='/login' element={loggedUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/register' element={loggedUser ? <Navigate to='/' /> : <Register />} />
				
					{/* Auth Routes */}
					<Route path='/account' element={loggedUser ? <Account /> : <ErrorNavigator error={401} handleError={handleError} />} />
					<Route path='/account/settings' element={loggedUser ? <AccountEdit /> : <ErrorNavigator error={401} handleError={handleError} />} />
					<Route path='/lobbies/new' element={loggedUser ? <LobbyCreate /> : <ErrorNavigator error={401} handleError={handleError} />} />
					<Route path='/lobbies/:id/edit' element={loggedUser ? <LobbyEdit /> : <ErrorNavigator error={401} handleError={handleError} />} />

					{/* Catch All Route */}
					<Route path='*' element={<ErrorNavigator error={404} handleError={handleError} />} />
				</Routes>
				{location.pathname !== '/cookies/settings' && <CookieConsent isCookieBannerVisible={isCookieBannerVisible} handleIsCookieBannerVisible={handleIsCookieBannerVisible} />}
				<Footer />
			</div>
		</div>
	)
}

export default App