import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import MultiplayerIcon from './svgs/MultiplayerSvg'
import PokedexIcon from './svgs/PokedexSvg'
import NewsIcon from './svgs/NewsSvg'

import headerStyles from '../css/components/Header.module.css'

const Header = () => {

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

    return (
		<nav className={`${headerStyles.header} flex-between`}>
			<div className={`${headerStyles.nav_primary} flex-center`}>
				<Link className={`${headerStyles.primary_logo} flex-center`} to='/'>
					<img src={favicon} className={`${headerStyles.logo}`} alt='Pokeball Logo'/>
					<img src={pokeChess} className={`${headerStyles.title}`} alt='PokeChess'/>
				</Link>
				<div className={`${headerStyles.dropdown} flex-center`}>
					<span className={`${headerStyles.primary_text}`}>Game Info</span>
					<DropdownArrowIcon className={headerStyles.icon_dropdownArrow}/>
					<div className={headerStyles.dropdown_bridge}/>
					<div className={`${headerStyles.dropdown_menu} flex-col`}>
						<Link className={`${headerStyles.dropdown_link}`} to='/pokedex'>
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Pokedex</span>
						</Link>
						<Link className={`${headerStyles.dropdown_link}`} to='/patch'>
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Patch Notes</span>
						</Link>
						<Link className={`${headerStyles.dropdown_link}`} to='/about'>
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>About</span>
						</Link>
					</div>
				</div>
				<Link className={`${headerStyles.primary_link} flex-center`} to='/news'>
					<span className={`${headerStyles.primary_text}`}>News</span>
				</Link>
				<div className={`${headerStyles.dropdown} flex-center`}>
					<span className={`${headerStyles.primary_text}`}>Community</span>
					<DropdownArrowIcon className={headerStyles.icon_dropdownArrow}/>
					<div className={headerStyles.dropdown_bridge}/>
					<div className={`${headerStyles.dropdown_menu} flex-col`}>
						<Link className={`${headerStyles.dropdown_link}`} to='/forums'>
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Forums</span>
						</Link>
						<Link className={`${headerStyles.dropdown_link}`} to='/leaderboards'>
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Leaderboards</span>
						</Link>
						<Link className={`${headerStyles.dropdown_link}`}> {/* EXTERNAL LINK NEEDS IMPLEMENTATION !!!!! */}
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Discord</span>
							<ExternalLinkIcon className={headerStyles.icon_externalLink}/>
						</Link>
					</div>
				</div>
			</div>
			<div className={`${headerStyles.nav_secondary} flex-center`}> 
				<div className={`${headerStyles.dropdown} flex-center`}>
					<AccountIcon className={headerStyles.icon_default}/>
					{authToken ? (
						<span className={`${headerStyles.secondary_text}`}>{loggedUser.username}</span>
					) : (
						<span className={`${headerStyles.secondary_text}`}>Account</span>
					)}
					<DropdownArrowIcon className={headerStyles.icon_dropdownArrow}/>
					<div className={headerStyles.dropdown_bridge}/>
					<div className={`${headerStyles.dropdown_menu} ${headerStyles.menu_primary} flex-col`}>
						{authToken ? (
							<div className={`${headerStyles.dropdown_head} ${headerStyles.account_info} flex-col`}> {/* NEEDS TESTING !!!!! */}
								<span className={`${headerStyles.text_accent} ${headerStyles.account_info_text}`}>{loggedUser.username}</span>
								<span className={`${headerStyles.detail_text} ${headerStyles.account_info_text}`}>{loggedUser.email}</span>
							</div>
						): (
							<Link className={`${headerStyles.dropdown_head} ${headerStyles.login_link} flex-center`} to='/login'>
								<LoginIcon className={headerStyles.icon_default}/>
								<span className={`${headerStyles.secondary_text} ${headerStyles.dropdown_text}`}>Login</span>
							</Link>
						)}
						<Link className={headerStyles.dropdown_link} to={authToken ? '/account' : '/login'}>
							<SettingsIcon className={headerStyles.icon_default}/>
							<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Account Settings</span>
						</Link>
						{authToken ? (
							<button className={`${headerStyles.dropdown_link}`} onClick={handleLogout}>
								<LogoutIcon className={headerStyles.icon_default}/>
								<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Logout</span>
							</button>
						) : (
							<Link className={`${headerStyles.dropdown_link}`} to='/register'>
								<RegisterIcon className={headerStyles.icon_default}/>
								<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Sign Up</span>
							</Link>
						)}
						<div className={`${headerStyles.menu_secondary} flex-col`}>
							<Link className={headerStyles.dropdown_link} to='/contact'>
								<SupportIcon className={headerStyles.icon_default}/>
								<span className={`${headerStyles.text_accent} ${headerStyles.dropdown_text}`}>Support</span>
							</Link>
						</div>
					</div>
				</div>
				<Link className={`${headerStyles.play_link} flex-center`} to='/lobbies'>
					<span className={`${headerStyles.secondary_text}`}>Play Now</span>
				</Link>
			</div>
		</nav>
	)
}

export default Header