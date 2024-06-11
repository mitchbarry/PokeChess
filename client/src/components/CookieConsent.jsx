import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import styles from '../css/components/CookieConsent.module.css'
import ErrorUtilities from '../utilities/error.utilities'

const CookieConsent = (props) => {

	const navigate = useNavigate()

	const { isCookieBannerVisible, handleIsCookieBannerVisible } = props

	const [cookieImage, setCookieImage] = useState('')

	useEffect(() => {
		const fetchCookieImage = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/item/lava-cookie')
				const data = await response.json()
				const imageUrl = data.sprites.default
				setCookieImage(imageUrl)
			}
			catch (error) {
				ErrorUtilities.catchError(error)
			}
		}
		fetchCookieImage()
	}, [])

	const handleNecessaryOnly = () => {
		Cookies.set('cookieConsent', {
			necessary: true,
			preferences: false,
			statistics: false,
			marketing: false,
			functionality: false
		}, { expires: 365 })
		handleIsCookieBannerVisible(false)
	}

	const handleCustomize = () => {
		navigate('/cookies/settings')
	}

	const handleAcceptAll = () => {
		Cookies.set('cookieConsent', {
			necessary: true,
			preferences: true,
			statistics: true,
			marketing: true,
			functionality: true
		}, { expires: 365 })
		handleIsCookieBannerVisible(false)
	}

	return (
		isCookieBannerVisible && (
			<div className={`${styles.banner} flex-between`}>
				<button className={`${styles.button_close} clickable transition-default`} onClick={closeBanner}>X</button>
				<img className={styles.img_default} src={cookieImage}/>
				<div className={`flex-col`}>
					<h2 className={`${styles.heading}`}>
						Your privacy
					</h2>
					<p className={`${styles.content}`}>
						We use cookies to ensure you get the best experience. By clicking "Accept all cookies", you agree PokeChess can store cookies on your device and disclose information in accordance with our <Link className={`${styles.content_link}`} href='/cookies/policy'>Cookie Policy</Link>.
					</p>
				</div>
				<div className={`flex-col`}>
					<div className={`flex-center`}>
						<button className={`${styles.button_secondary}`} onClick={handleNecessaryOnly}>Necessary cookies only</button>
						<button className={`${styles.button_secondary}`} onClick={handleCustomize}>Customize settings</button>
					</div>
					<button className={`${styles.button_primary}`} onClick={handleAcceptAll}>Accept all cookies</button>
				</div>
			</div>
		)
	)
}

export default CookieConsent