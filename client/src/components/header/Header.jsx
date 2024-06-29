import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

import pokeChess from '../../assets/text/pokeChess.png'
import pokeLogo from '../../assets/misc/pokeballs/timerBall-128px.png'
import avatar1 from '../assets/avatars/avatar1.jpg'
import avatar2 from '../assets/avatars/avatar2.jpg'
import avatar3 from '../assets/avatars/avatar3.jpg'
import avatar4 from '../assets/avatars/avatar4.jpg'
import avatar5 from '../assets/avatars/avatar5.jpg'
import avatar6 from '../assets/avatars/avatar6.jpg'
import avatar7 from '../assets/avatars/avatar7.jpg'
import avatar8 from '../assets/avatars/avatar8.jpg'
import avatar9 from '../assets/avatars/avatar9.jpg'

import DropdownArrowIcon from '../svgs/DropdownArrowSvg'
import ExternalLinkIcon from '../svgs/ExternalLinkSvg'
import AccountIcon from '../svgs/AccountSvg'
import LoginIcon from '../svgs/LoginSvg'
import LogoutIcon from '../svgs/LogoutSvg'
import RegisterIcon from '../svgs/RegisterSvg'
import SettingsIcon from '../svgs/SettingsSvg'
import SupportIcon from '../svgs/SupportSvg'

import styles from '../css/components/header/Header.module.css'

const Header = () => {

    const { loggedUser, handleLogout } = useAuth()

	const findAvatar = (avatar) => {
		switch (avatar) {
			case 'avatar1':
				return avatar1;
			case 'avatar2':
				return avatar2;
			case 'avatar3':
				return avatar3;
			case 'avatar4':
				return avatar4;
			case 'avatar5':
				return avatar5;
			case 'avatar6':
				return avatar6;
			case 'avatar7':
				return avatar7;
			case 'avatar8':
				return avatar8;
			case 'avatar9':
				return avatar9;
			default:
				return avatar1;
		}
	}

    return (
		<nav className={`${styles.container} flex-between`}>
			<div className={`${styles.navPrimary} flex-center`}>
				<Link className={`${styles.navPrimary_logo} flex-center`} to='/'>
					<img src={pokeLogo} className={`${styles.logo}`} alt='Timer Ball Logo'/>
					<img src={pokeChess} className={`${styles.title}`} alt='PokeChess'/>
				</Link>
				<div className={`${styles.dropdown} flex-center`}>
					<span className={`${styles.primary_text}`}>Game Info</span>
					<DropdownArrowIcon className={styles.icon_dropdownArrow}/>
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu} flex-col`}>
						<Link className={`${styles.dropdown_link}`} to='/pokedex'>
							<span className={`${styles.dropdown_text}`}>Pokedex</span>
						</Link>
						<Link className={`${styles.dropdown_link}`} to='/patch'>
							<span className={`${styles.dropdown_text}`}>Patch Notes</span>
						</Link>
						<Link className={`${styles.dropdown_link}`} to='/about'>
							<span className={`${styles.dropdown_text}`}>About</span>
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
							<span className={`${styles.dropdown_text}`}>Forums</span>
						</Link>
						<Link className={`${styles.dropdown_link}`} to='/leaderboards'>
							<span className={`${styles.dropdown_text}`}>Leaderboards</span>
						</Link>
						<Link className={`${styles.dropdown_link}`}> {/* EXTERNAL LINK NEEDS IMPLEMENTATION !!!!! */}
							<span className={`${styles.dropdown_text}`}>Discord</span>
							<ExternalLinkIcon className={styles.icon_externalLink}/>
						</Link>
					</div>
				</div>
			</div>
			<div className={`${styles.nav_secondary} flex-center`}> 
				<div className={`${styles.dropdown} flex-center`}>
					<AccountIcon className={styles.icon_default}/>
					{loggedUser ? (
						<span className={`${styles.secondary_text}`}>{loggedUser.username}</span>
					) : (
						<span className={`${styles.secondary_text}`}>Account</span>
					)}
					<DropdownArrowIcon className={styles.icon_dropdownArrow}/>
					<div className={styles.dropdown_bridge}/>
					<div className={`${styles.dropdown_menu} ${styles.menu_primary} flex-col`}>
						{loggedUser ? (
							<div className={`${styles.account_info}`}>
								<img src={findAvatar(loggedUser.avatar)} alt={loggedUser.avatar} className={styles.avatar}/>
								<div className='flex-col'>
									<span className={`${styles.info_username}`}>{loggedUser.username}</span>
									<span className={`${styles.info_email}`}>{loggedUser.email}</span>
								</div>
							</div>
						) : (
							<Link className={`${styles.login} flex-center`} to='/login'>
								<LoginIcon className={styles.icon_default}/>
								<span className={`${styles.secondary_text} ${styles.dropdown_text}`}>Login</span>
							</Link>
						)}
						<Link className={`${styles.dropdown_link}`} to={loggedUser ? '/account' : '/login'}>
							<SettingsIcon className={styles.icon_default}/>
							<span className={`${styles.dropdown_text}`}>Account Settings</span>
						</Link>
						{loggedUser ? (
							<button className={`${styles.dropdown_link}`} onClick={handleLogout}>
								<LogoutIcon className={styles.icon_default}/>
								<span className={`${styles.dropdown_text}`}>Logout</span>
							</button>
						) : (
							<Link className={`${styles.dropdown_link}`} to='/register'>
								<RegisterIcon className={styles.icon_default}/>
								<span className={`${styles.dropdown_text}`}>Sign Up</span>
							</Link>
						)}
						<div className={`${styles.menu_secondary} flex-col`}>
							<Link className={styles.dropdown_link} to='/contact'>
								<SupportIcon className={styles.icon_default}/>
								<span className={`${styles.dropdown_text}`}>Support</span>
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