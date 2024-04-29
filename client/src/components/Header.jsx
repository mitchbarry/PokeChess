import React, { useState } from "react"
import { Link, parsePath, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'

import pokeChess from '../assets/text/pokeChess.png'
import favicon from '../assets/favicon126px.png'
import ArrowSvg from './svgs/ArrowSvg'
import ExternalLinkSvg from "./svgs/ExternalLinkSvg"
import LobbiesSvg from './svgs/LobbiesSvg'
import PokedexSvg from './svgs/PokedexSvg'
import NewsSvg from './svgs/NewsSvg'

import styles from '../css/components/header.module.css'

const Header = () => {

    const location = useLocation()
	const navigate = useNavigate()

    const { authToken, loggedUser, updateLoggedUser, updateAuthToken } = useAuth()

	const handleLogout = async () => {
		let serverResponse
        try {
            serverResponse = await AuthService.logout(/*token*/) // token may be passed through to invalidate it via a blacklist (have not yet implemented)
        }
        catch (error) {
            console.error('Logout failed:', error)
        }
		finally {
			updateAuthToken(null)
			updateLoggedUser(null)
			Cookies.remove('authToken')
			console.log(serverResponse)
			navigate('/login')
		}
	}

	{/* SVG icons are included in this component instead of in seperate components to allow for use of :hover css feature */}
    return (
		<nav className={`${styles.header} flex-between`}>
			<div className={`${styles.nav_primary} flex-center`}>
				<Link className={`${styles.primary_logo} flex-center`} to={authToken ? '/lobbies/home' : location.pathname === '/register' ? '/register' : '/login'}>
					<img src={favicon} className={`${styles.logo}`} alt='Pokeball Logo'/>
					<img src={pokeChess} className={`${styles.title}`} alt='PokeChess'/>
				</Link>
				<div className={`${styles.dropdown} flex-center`}>{/* to={authToken ? '/lobbies/new' : location.pathname === '/register' ? '/register' : '/login'} */}
					<span className={`${styles.primary_text}`}>Game Info</span>
					<ArrowSvg />
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu}`}>
						<Link className={`${styles.dropdown_link}`}>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Pokedex</span>
						</Link>
						<Link className={`${styles.dropdown_link}`}>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Patch Notes</span>
						</Link>
						<Link className={`${styles.dropdown_link}`}>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>About</span>
						</Link>
					</div>
				</div>
				<Link className={`${styles.primary_link} flex-center`} to='/pokenews'>
					<span className={`${styles.primary_text}`}>News</span>
				</Link>
				<div className={`${styles.dropdown} flex-center`}>
					<span className={`${styles.primary_text}`}>Community</span>
					<ArrowSvg />
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu}`}>
						<Link className={`${styles.dropdown_link}`}>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Forums</span>
						</Link>
						<Link className={`${styles.dropdown_link}`}>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Leaderboards</span>
						</Link>
						<Link className={`${styles.dropdown_link}`}>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Discord</span>
							<ExternalLinkSvg />
						</Link>
					</div>
				</div>
			</div>
			<div className={`${styles.nav_secondary} flex-center`}>
				<div className={`${styles.dropdown} flex-center`}>
					<></>
					<span className={`${styles.secondary_text}`}>Account</span>
					<ArrowSvg />
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu}`}>
						<Link className={`${styles.login_link} flex-center`}>
							<></>
							<span className={`${styles.secondary_text} ${styles.dropdown_text}`}>Login</span>
						</Link>
						<Link className={styles.dropdown_link}>
							<></>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Account Settings</span>
						</Link>
						{authToken ? (
							<button className={`${styles.dropdown_link}`} onClick={handleLogout}>
								<></>
								<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Logout</span>
							</button>
						) : (
							<Link className={`${styles.dropdown_link}`}>
								<></>
								<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Sign Up</span>
							</Link>
						)}
					</div>
				</div>
				<Link className={`${styles.play_link} flex-center`} to='/'>
					<span className={`${styles.secondary_text}`}>Play Now</span>
				</Link>
			</div>
		</nav>
	)
}

export default Header