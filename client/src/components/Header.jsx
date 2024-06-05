import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'

import pokeChess from '../assets/text/pokeChess.png'
import favicon from '../assets/favicon126px.png'

import DropdownArrowIcon from './svgs/DropdownArrowSvg'
import ExternalLinkIcon from './svgs/ExternalLinkSvg'
import AccountIcon from './svgs/AccountSvg'
import LoginIcon from './svgs/LoginSvg'
import LogoutIcon from './svgs/LogoutSvg'
import RegisterIcon from './svgs/RegisterSvg'
import SettingsIcon from './svgs/SettingsSvg'
import SupportIcon from './svgs/SupportSvg'

import styles from '../css/components/Header.module.css'

const Header = () => {

    const { authToken, loggedUser, updateLoggedUser, updateAuthToken } = useAuth()

	const handleLogout = async () => {
		let serverResponse
        try {
            serverResponse = await AuthService.logout(/*token*/) // token may be passed through to invalidate it via a blacklist (have not yet implemented)
			updateAuthToken(null)
			updateLoggedUser(null)
			Cookies.remove('authToken')
			console.log(serverResponse)
        }
        catch (error) {
            console.error('Logout failed:', error)
        }
	}

    return (
		<nav className={`${styles.header} flex-between`}>
			<div className={`${styles.nav_primary} flex-center`}>
				<Link className={`${styles.primary_logo} flex-center`} to='/'>
					<img src={favicon} className={`${styles.logo}`} alt='Pokeball Logo'/>
					<img src={pokeChess} className={`${styles.title}`} alt='PokeChess'/>
				</Link>
				<div className={`${styles.dropdown} flex-center`}>
					<span className={`${styles.primary_text}`}>Game Info</span>
					<DropdownArrowIcon className={styles.icon_dropdownArrow}/>
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu} flex-col`}>
						<Link className={`${styles.dropdown_link}`} to='/pokedex'>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Pokedex</span>
						</Link>
						<Link className={`${styles.dropdown_link}`} to='/patch'>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Patch Notes</span>
						</Link>
						<Link className={`${styles.dropdown_link}`} to='/about'>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>About</span>
						</Link>
					</div>
				</div>
				<Link className={`${styles.primary_link} flex-center`} to='/news'>
					<span className={`${styles.primary_text}`}>News</span>
				</Link>
				<div className={`${styles.dropdown} flex-center`}>
					<span className={`${styles.primary_text}`}>Community</span>
					<DropdownArrowIcon className={styles.icon_dropdownArrow}/>
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu} flex-col`}>
						<Link className={`${styles.dropdown_link}`} to='/forums'>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Forums</span>
						</Link>
						<Link className={`${styles.dropdown_link}`} to='/leaderboards'>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Leaderboards</span>
						</Link>
						<Link className={`${styles.dropdown_link}`}> {/* EXTERNAL LINK NEEDS IMPLEMENTATION !!!!! */}
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Discord</span>
							<ExternalLinkIcon className={styles.icon_externalLink}/>
						</Link>
					</div>
				</div>
			</div>
			<div className={`${styles.nav_secondary} flex-center`}> 
				<div className={`${styles.dropdown} flex-center`}>
					<AccountIcon className={styles.icon_default}/>
					{authToken ? (
						<span className={`${styles.secondary_text}`}>{loggedUser.username}</span>
					) : (
						<span className={`${styles.secondary_text}`}>Account</span>
					)}
					<DropdownArrowIcon className={styles.icon_dropdownArrow}/>
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu} ${styles.menu_primary} flex-col`}>
						{authToken ? (
							<div className={`${styles.account_info} flex-col`}>
								<span className={`${styles.accent_text} ${styles.account_info_text}`}>{loggedUser.username}</span>
								<span className={`${styles.detail_text} ${styles.account_info_text}`}>{loggedUser.email}</span>
							</div>
						) : (
							<Link className={`${styles.login} flex-center`} to='/login'>
								<LoginIcon className={styles.icon_default}/>
								<span className={`${styles.secondary_text} ${styles.dropdown_text}`}>Login</span>
							</Link>
						)}
						<Link className={`${styles.dropdown_link}`} to={authToken ? '/account' : '/login'}>
							<SettingsIcon className={styles.icon_default}/>
							<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Account Settings</span>
						</Link>
						{authToken ? (
							<button className={`${styles.dropdown_link}`} onClick={handleLogout}>
								<LogoutIcon className={styles.icon_default}/>
								<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Logout</span>
							</button>
						) : (
							<Link className={`${styles.dropdown_link}`} to='/register'>
								<RegisterIcon className={styles.icon_default}/>
								<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Sign Up</span>
							</Link>
						)}
						<div className={`${styles.menu_secondary} flex-col`}>
							<Link className={styles.dropdown_link} to='/contact'>
								<SupportIcon className={styles.icon_default}/>
								<span className={`${styles.accent_text} ${styles.dropdown_text}`}>Support</span>
							</Link>
						</div>
					</div>
				</div>
				<Link className={`${styles.play_link} flex-center`} to='/lobbies'>
					<span className={`${styles.secondary_text}`}>Play Now</span>
				</Link>
			</div>
		</nav>
	)
}

export default Header