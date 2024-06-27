import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import squirtleSquad from '../../assets/misc/pokemon/squirtleSquad.png'

import XIcon from '../svgs/XSvg'

import styles from '../../css/components/CookieConsent.module.css'

const CookieConsent = (props) => {

	const navigate = useNavigate()

	const { isCookieBannerVisible, handleIsCookieBannerVisible } = props

	const handleNecessaryOnly = () => {
		const consentData = {
			necessary: true,
			preferences: false,
			statistics: false,
			marketing: false,
			functionality: false
		}
		const consentString = JSON.stringify(consentData)
		Cookies.set('cookieConsent', consentString, { expires: 365 })
		handleIsCookieBannerVisible(false)
	}

	const handleCustomize = () => {
		navigate('/cookies/settings')
		handleIsCookieBannerVisible(false)
	}

	const handleAcceptAll = () => {
		const consentData = {
			necessary: true,
			preferences: true,
			statistics: true,
			marketing: true,
			functionality: true
		}
		const consentString = JSON.stringify(consentData)
		Cookies.set('cookieConsent', consentString, { expires: 365 })
		handleIsCookieBannerVisible(false)
	}

	const closeBanner = () => {
		handleIsCookieBannerVisible(false)
	}

	return (
		isCookieBannerVisible && (
			<div className={`${styles.banner} flex-between`}>
				<button className={`${styles.button_close} clickable transition-default`} onClick={closeBanner}>
					<XIcon className={`${styles.icon_default}`}/>
				</button>
				<div className={styles.content_primary}>
					<img className={styles.img_default} src={squirtleSquad}/>
					<div className={`${styles.primary} flex-col`}>
						<h1 className={`${styles.primary_heading} ${styles.primary_text}`}>
							<b>Your privacy</b>
						</h1>
						<p className={`${styles.primary_body} ${styles.secondary_text}`}>
							We use cookies to ensure you get the best experience. 
							By clicking "Accept all cookies", you agree PokeChess can store cookies on your device and disclose information in accordance with our{' '}
							<Link className={`${styles.content_link} clickable transition-default`} to='/cookies/policy' onClick={(e) => handleIsCookieBannerVisible(false)}>
								Cookie Policy
							</Link>.
						</p>
					</div>
				</div>
				<div className={`${styles.content_secondary} flex-col`}>
					<div className={`${styles.secondary_buttons} flex-center`}>
						<button className={`${styles.button_secondary} clickable transition-default`} onClick={(e) => handleNecessaryOnly()}><span className={styles.accent_text}>Necessary cookies only</span></button>
						<button className={`${styles.button_secondary} clickable transition-default`} onClick={(e) => handleCustomize()}><span className={styles.accent_text}>Customize settings</span></button>
					</div>
					<button className={`${styles.button_primary} clickable transition-default`} onClick={(e) => handleAcceptAll()}><span className={styles.accent_text}>Accept all cookies</span></button>
				</div>
			</div>
		)
	)
}

export default CookieConsent