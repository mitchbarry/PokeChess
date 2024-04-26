import React, { useState } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useAuth } from '../context/AuthContext'
import AuthService from '../services/AuthService'

import pokeChess from '../assets/text/pokeChess.png'
import favicon from '../assets/favicon126px.png'
import ArrowSvg from './svgs/ArrowSvg'
import LobbiesSvg from './svgs/LobbiesSvg'
import PokedexSvg from './svgs/PokedexSvg'
import NewsSvg from './svgs/NewsSvg'

import styles from '../css/components/header.module.css'

const Header = () => {

    const location = useLocation()
	const navigate = useNavigate()

    const { authToken, loggedUser, updateLoggedUser, updateAuthToken } = useAuth()

	const {hover, setHover} = useState({
		gameInfo: false,
		community: false
	})

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
			<div className={`${styles.header_main}`}>
				<Link className={`${styles.main_logo} flex-center`} to={authToken ? '/lobbies/home' : location.pathname === '/register' ? '/register' : '/login'}>
					<img src={favicon} className={`${styles.logo}`} alt='Pokeball Logo'/>
					<img src={pokeChess} className={`${styles.title}`} alt='PokeChess'/>
				</Link>
				<div className={`${styles.main_list} flex-center`}> {/* to={authToken ? '/lobbies/new' : location.pathname === '/register' ? '/register' : '/login'} */}
					<LobbiesSvg />
					Game Info
					<ArrowSvg />
				</div>
				<Link className={`${styles.main_link} flex-center`} to='/pokenews'>
					<NewsSvg />
					News
				</Link>
				<div className={`${styles.main_list} flex-center`}>
					<PokedexSvg />
					Community
					<ArrowSvg />
				</div>
			</div>
			{authToken ? (
				<button className={`${styles.nav_button} ${styles.button_logout} button flex-center`} onClick={handleLogout}>
					<svg style={{marginRight: '0.5ch'}} version='1.1' xmlns='http://www.w3.org/2000/svg' width='22' height='20' viewBox='0 0 285 258' preserveAspectRatio='xMidYMid meet'> {/* width and height are 'somewhat' hardcoded to keep their size, numbers are an approximation of native resolution using same ratio */}
						<path d='M0 0 C1.88179459 -0.01029488 1.88179459 -0.01029488 3.80160522 -0.02079773 C7.22749002 -0.03592132 10.65282876 -0.03757111 14.07870626 -0.03185534 C16.94629654 -0.02875493 19.81383808 -0.03486553 22.6814214 -0.04089409 C29.45106733 -0.05492025 36.22058702 -0.05339454 42.99023438 -0.04199219 C49.9561873 -0.03051789 56.9217549 -0.0445791 63.88765705 -0.07138866 C69.88451964 -0.09359799 75.88126174 -0.10017116 81.8781625 -0.09431225 C85.45269128 -0.0909533 89.02697324 -0.09328616 92.60146713 -0.11056328 C96.59132752 -0.12900782 100.58044623 -0.11479186 104.5703125 -0.09765625 C105.74255371 -0.10732422 106.91479492 -0.11699219 108.12255859 -0.12695312 C118.53766617 -0.03350912 126.80599814 3.19679506 134.41455078 10.40405273 C144.13119493 21.85738215 143.85255868 34.49830005 143.80273438 48.73999023 C143.80680434 50.69566134 143.8121486 52.65133014 143.81866455 54.60699463 C143.83229339 59.89621921 143.82705781 65.18526743 143.81752729 70.47449493 C143.8099077 76.02181965 143.81698268 81.56912974 143.82168579 87.11645508 C143.82713665 96.43044737 143.8199693 105.74436818 143.80566406 115.05834961 C143.78933888 125.81136236 143.79462786 136.56420444 143.81114328 147.31721306 C143.82477722 156.56591689 143.82666847 165.81456947 143.81882727 175.06328011 C143.81416126 180.57995525 143.81349639 186.09655029 143.82343674 191.61322021 C143.83213189 196.80076803 143.82603795 201.98809677 143.80875397 207.17562103 C143.80480273 209.07424303 143.80589969 210.97288362 143.81254196 212.87149811 C143.85486231 226.20193798 143.48227802 237.77904191 134.41455078 248.40405273 C125.36287015 257.03667407 117.00046531 258.85528989 104.82324219 258.80810547 C102.95826836 258.81840034 102.95826836 258.81840034 101.05561829 258.8289032 C97.66484617 258.84401053 94.27462653 258.84568112 90.88386202 258.83996081 C88.04365431 258.83685696 85.20349566 258.84297477 82.36329496 258.84899956 C75.65735645 258.86301789 68.9515454 258.86150653 62.24560547 258.85009766 C55.34951868 258.83862384 48.45382114 258.85268556 41.55778563 258.87949413 C35.6169375 258.90171649 29.67621097 258.90827373 23.73532426 258.90241772 C20.19598906 258.8990619 16.65690317 258.90137049 13.1176033 258.91866875 C9.16646567 258.93713912 5.21579933 258.92288368 1.26464844 258.90576172 C0.10692429 258.91542969 -1.05079987 258.92509766 -2.24360657 258.93505859 C-12.74432249 258.84011154 -20.84885444 256.07935136 -28.53857422 248.82592773 C-34.45048456 241.83091932 -37.67491279 233.70958954 -37.76245117 224.62915039 C-37.77528641 223.4675943 -37.78812164 222.30603821 -37.80134583 221.10928345 C-37.80873276 219.85819794 -37.81611969 218.60711243 -37.82373047 217.31811523 C-37.83180222 216.02843842 -37.83987396 214.7387616 -37.84819031 213.41000366 C-37.86318694 210.68145888 -37.87304008 207.95293985 -37.88061523 205.22436523 C-37.89168287 201.73846464 -37.92609896 198.25320179 -37.96578693 194.76752663 C-37.99829256 191.43024884 -38.00273409 188.09303907 -38.01123047 184.75561523 C-38.02873856 183.50857819 -38.04624664 182.26154114 -38.06428528 180.97671509 C-38.03696923 170.07239182 -38.03696923 170.07239182 -33.58544922 165.40405273 C-29.77510603 163.17536144 -27.37847384 162.3903799 -22.96044922 162.46655273 C-18.65451565 163.66264539 -15.86273407 165.36177076 -13.46469116 169.19606018 C-12.38839877 171.89889484 -12.33384926 174.01099646 -12.33007812 176.91943359 C-12.3231192 178.02415512 -12.31616028 179.12887665 -12.30899048 180.26707458 C-12.30998749 181.45567581 -12.3109845 182.64427704 -12.31201172 183.86889648 C-12.29172589 186.385177 -12.27087517 188.90145301 -12.24951172 191.41772461 C-12.22688815 195.38545534 -12.21043235 199.35300846 -12.20458984 203.32080078 C-12.19508247 207.14965932 -12.16132731 210.97771689 -12.12451172 214.80639648 C-12.12955719 215.99297348 -12.13460266 217.17955048 -12.13980103 218.40208435 C-12.11296424 224.80589904 -12.11296424 224.80589904 -9.73925781 230.62890625 C-6.52119006 233.28120399 -3.91881118 233.53021578 0.10751343 233.54449463 C1.55430229 233.55305984 1.55430229 233.55305984 3.03031921 233.5617981 C4.08701309 233.56291595 5.14370697 233.56403381 6.23242188 233.56518555 C7.34648911 233.57015045 8.46055634 233.57511536 9.60838318 233.58023071 C13.30159111 233.59486118 16.99475611 233.60165548 20.68798828 233.60717773 C23.25005088 233.612928 25.81211346 233.61868575 28.37417603 233.62445068 C33.06200747 233.63361875 37.74982171 233.63991834 42.43766057 233.64294744 C49.33420852 233.64742842 56.2305583 233.66497989 63.12704599 233.69394803 C69.1033937 233.71817865 75.07964772 233.72589217 81.05604935 233.72762299 C83.59739893 233.73065359 86.13874759 233.73869576 88.68006516 233.75180817 C92.2328271 233.7688322 95.78510462 233.76699715 99.33789062 233.76049805 C100.91685875 233.77432022 100.91685875 233.77432022 102.52772522 233.78842163 C109.51327109 233.83622292 109.51327109 233.83622292 115.41455078 230.40405273 C117.92699872 226.71963976 117.69718941 222.88675892 117.67524719 218.59169006 C117.67907274 217.79959104 117.68289829 217.00749201 117.68683976 216.19138998 C117.69716717 213.53442706 117.69317812 210.87768034 117.68920898 208.22070312 C117.69355559 206.31691792 117.69873857 204.41313448 117.70469666 202.50935364 C117.71810317 197.33584639 117.7186635 192.16241212 117.71613336 186.98889089 C117.7150648 182.6721403 117.71994404 178.35540455 117.72473878 174.03865713 C117.73583961 163.85616381 117.73626808 153.67370738 117.73022461 143.49121094 C117.72418283 132.98134989 117.73649972 122.47162264 117.75779468 111.96178442 C117.77539838 102.94258331 117.78141399 93.92342484 117.77815694 84.90420717 C117.77634202 79.51558479 117.77900102 74.12705786 117.79287148 68.738451 C117.80542521 63.67166248 117.80352897 58.60508288 117.79046059 53.53829765 C117.78808993 51.67789007 117.79084695 49.81746789 117.79908371 47.95707703 C117.80951153 45.41894041 117.80148268 42.88151 117.78877258 40.34339905 C117.79614687 39.60584776 117.80352115 38.86829648 117.8111189 38.10839516 C117.76471717 33.70895181 117.2093752 30.8498759 114.41455078 27.40405273 C111.49091222 25.39541776 109.10209359 25.15193357 105.60133362 25.14335632 C104.15248276 25.13272911 104.15248276 25.13272911 102.67436218 25.12188721 C101.62126358 25.12436462 100.56816498 25.12684204 99.4831543 25.12939453 C98.36894104 25.1242836 97.25472778 25.11917267 96.10675049 25.11390686 C92.41893156 25.0999923 88.73129911 25.10096903 85.04345703 25.10327148 C82.48282298 25.09938568 79.92218957 25.09505125 77.36155701 25.09028625 C71.99239752 25.08282009 66.62330665 25.0829802 61.25415039 25.08837891 C55.0522474 25.09441915 48.85057126 25.08210556 42.64870697 25.06080884 C36.67716401 25.04105872 30.70569126 25.03802026 24.73411369 25.04154396 C22.19556076 25.04103003 19.65700425 25.03577895 17.11847115 25.02573204 C13.57058291 25.01341375 10.02322143 25.02013208 6.4753418 25.03173828 C5.42426743 25.02409454 4.37319305 25.01645081 3.29026794 25.00857544 C-3.66651377 25.00089599 -3.66651377 25.00089599 -9.58544922 28.40405273 C-11.82415391 31.76210978 -11.83572803 32.86590789 -11.84082031 36.79003906 C-11.8512587 38.44239311 -11.8512587 38.44239311 -11.86190796 40.12812805 C-11.86091095 41.31875351 -11.85991394 42.50937897 -11.85888672 43.73608398 C-11.87917789 46.25106238 -11.90002872 48.7660363 -11.92138672 51.28100586 C-11.94398593 55.25085206 -11.96045507 59.22052212 -11.96630859 63.19042969 C-11.97582931 67.01847289 -12.00960766 70.8457192 -12.04638672 74.67358398 C-12.04134125 75.85813675 -12.03629578 77.04268951 -12.03109741 78.26313782 C-12.10627668 84.56070057 -12.19098025 88.70204005 -16.58544922 93.40405273 C-20.3957924 95.63274403 -22.7924246 96.41772557 -27.21044922 96.34155273 C-31.51222468 95.1466151 -34.30102906 93.44884696 -36.70401001 89.62330627 C-37.79776923 86.86948163 -37.85352487 84.67139284 -37.87597656 81.70849609 C-37.88873627 80.56307846 -37.90149597 79.41766083 -37.91464233 78.23753357 C-37.91686798 77.00213333 -37.91909363 75.76673309 -37.92138672 74.49389648 C-37.92804352 73.21607803 -37.93470032 71.93825958 -37.94155884 70.62171936 C-37.95352734 67.91411976 -37.95724061 65.20664762 -37.95605469 62.49902344 C-37.95585263 59.05839889 -37.98303686 55.61861093 -38.01759911 52.17818356 C-38.04544283 48.86674524 -38.04402408 45.55544991 -38.04638672 42.24389648 C-38.06075775 41.02266586 -38.07512878 39.80143524 -38.0899353 38.54319763 C-38.0310974 27.37964538 -35.43711115 17.63476041 -27.58544922 9.40405273 C-18.86220083 1.58688514 -11.49290781 -0.04398323 0 0 Z ' transform='translate(141.58544921875,-0.404052734375)'/>
						<path d='M0 0 C3.75212276 2.01502889 5.63644095 3.45466142 8 7 C8.3359375 9.26953125 8.3359375 9.26953125 8.375 11.8125 C8.40335937 12.64394531 8.43171875 13.47539063 8.4609375 14.33203125 C7.30851466 21.00241091 1.49529614 25.7601447 -3.13671875 30.296875 C-4.15678764 31.30914154 -4.15678764 31.30914154 -5.19746399 32.34185791 C-7.3560757 34.48275131 -9.5212972 36.61678995 -11.6875 38.75 C-13.86349955 40.8983823 -16.03801575 43.04821501 -18.20967102 45.20098877 C-19.55799567 46.53705163 -20.90898441 47.87043231 -22.26286316 49.2008667 C-22.87052017 49.8019928 -23.47817719 50.4031189 -24.10424805 51.02246094 C-24.64067429 51.55063416 -25.17710052 52.07880737 -25.7297821 52.62298584 C-27.11305151 53.99466178 -27.11305151 53.99466178 -28 56 C-26.49057705 55.75684492 -26.49057705 55.75684492 -24.95066071 55.50877762 C-21.17642965 55.02272112 -17.59196901 54.86874889 -13.78942871 54.85955811 C-13.09826635 54.85658698 -12.40710399 54.85361586 -11.69499731 54.8505547 C-9.39756376 54.84193851 -7.10018275 54.84036555 -4.80273438 54.83886719 C-3.14805492 54.8342342 -1.49337652 54.82920889 0.16130066 54.82382202 C4.6426178 54.81074726 9.12392 54.80426338 13.60525322 54.79981136 C16.40694757 54.79687427 19.20863789 54.7927684 22.0103302 54.78830719 C30.78235463 54.77464877 39.55436977 54.76497253 48.32640409 54.7611053 C58.44219331 54.75662051 68.55784769 54.73904618 78.67359591 54.7101047 C86.50223456 54.6884857 94.33083527 54.678401 102.15950346 54.67706418 C106.83163365 54.67601684 111.50363678 54.67012336 116.17573547 54.65224457 C120.56870984 54.63575884 124.96146166 54.63361078 129.35445595 54.64238358 C130.96408497 54.64315353 132.573726 54.63881674 134.18332481 54.62892532 C136.38562314 54.6161877 138.58713518 54.62209162 140.78942871 54.63250732 C142.02014854 54.63104076 143.25086838 54.6295742 144.51888275 54.6280632 C149.60502066 55.17148697 153.48055219 56.71431339 157.4375 60.0625 C159.73603064 64.38373761 159.8810266 68.21181198 159 73 C157.27821579 76.5827765 154.97699665 78.58998977 151.28063774 80.14121819 C147.60145229 81.10432896 144.43791162 81.24596544 140.63479614 81.24050903 C139.91504793 81.24221788 139.19529972 81.24392673 138.45374095 81.24568737 C136.05385594 81.24896871 133.65425358 81.23800113 131.25439453 81.22705078 C129.52939358 81.22648637 127.80439215 81.2268038 126.07939148 81.22793579 C121.40423382 81.22850915 116.72917898 81.2167575 112.0540452 81.20278788 C107.16533843 81.19027777 102.27662925 81.18910979 97.38790894 81.18673706 C88.13389379 81.18052312 78.87992595 81.16411345 69.62593162 81.14403808 C59.0891193 81.12167642 48.55230471 81.11068498 38.01547456 81.10064721 C16.34362331 81.07974716 -5.32818536 81.04457283 -27 81 C-26.06657296 82.10099262 -25.13138893 83.20049577 -24.19549561 84.2993927 C-23.67490948 84.91184247 -23.15432335 85.52429224 -22.61796188 86.15530109 C-20.07240154 89.05758973 -17.33493716 91.74937817 -14.578125 94.44921875 C-13.37617263 95.63854106 -12.17435352 96.82799806 -10.97265625 98.01757812 C-9.10263356 99.8626902 -7.23102513 101.70613962 -5.35693359 103.54711914 C-3.53043965 105.34343292 -1.71019945 107.14590006 0.109375 108.94921875 C0.95154572 109.77120003 0.95154572 109.77120003 1.81072998 110.60978699 C5.87604394 114.64873903 8.27338884 117.58316415 8.375 123.375 C8.27009746 127.92327424 7.04576708 130.53120972 4 134 C1.03401885 136.33041376 -2.09771234 136.29584954 -5.8046875 136.4609375 C-11.78555836 135.20516746 -16.32655556 129.95292123 -20.46435547 125.76269531 C-21.07970657 125.14763626 -21.69505768 124.53257721 -22.32905579 123.89888 C-24.34654792 121.88000293 -26.35687738 119.85415154 -28.3671875 117.828125 C-29.77064983 116.42092958 -31.17455657 115.01417727 -32.57888794 113.60784912 C-36.26250325 109.91662075 -39.94007104 106.21942443 -43.61639404 102.52093506 C-47.37342756 98.74339294 -51.13617392 94.97155071 -54.8984375 91.19921875 C-62.27121404 83.80503337 -69.63761165 76.40452794 -77 69 C-75.35090277 64.76876685 -72.21118371 61.93018408 -69.05322266 58.79443359 C-68.44488083 58.18258713 -67.836539 57.57074066 -67.20976257 56.94035339 C-65.19952844 54.92132416 -63.18207507 52.90969005 -61.1640625 50.8984375 C-59.76373499 49.49676271 -58.36370449 48.09479115 -56.96395874 46.6925354 C-54.02999674 43.75562514 -51.09244847 40.82236203 -48.15234375 37.89160156 C-44.38379696 34.13444903 -40.62429916 30.36839017 -36.86744118 26.59955406 C-33.97831065 23.70319697 -31.08443396 20.81161987 -28.18909836 17.92146683 C-26.80094944 16.53465219 -25.41428501 15.14635 -24.02913284 13.75654221 C-22.09274199 11.81507317 -20.15005673 9.88012969 -18.20556641 7.94677734 C-17.63399307 7.37115555 -17.06241974 6.79553375 -16.473526 6.20246887 C-11.32135511 1.10484356 -7.41375927 -1.18335004 0 0 Z ' transform='translate(77,61)'/>
					</svg>
					Logout
				</button>
				) : (
				location.pathname === '/login' ? (
					<Link className={`${styles.nav_button} button flex-center`} to='/register'>
						Register
					</Link>
					) : (
					<Link className={`${styles.nav_button} button flex-center`} to='/login'>
						<svg style={{marginRight: '0.5ch'}} version='1.1' xmlns='http://www.w3.org/2000/svg' width='22' height='20' viewBox='0 0 286 258' preserveAspectRatio='xMidYMid meet'> {/* width and height are 'somewhat' hardcoded to keep their size, numbers are an approximation of native resolution using same ratio */}
							<path d='M0 0 C1.07791809 -0.0071553 2.15583618 -0.01431061 3.26641846 -0.02168274 C4.44414322 -0.02437164 5.62186798 -0.02706055 6.83528137 -0.02983093 C8.70178848 -0.03968773 8.70178848 -0.03968773 10.60600281 -0.04974365 C14.72906231 -0.06947417 18.85208294 -0.08114291 22.97517395 -0.09111023 C24.39769828 -0.09515969 25.82022241 -0.09927667 27.24274635 -0.10346031 C33.92815995 -0.1225034 40.61356257 -0.13673536 47.29899806 -0.14507228 C55.00093679 -0.15483687 62.70258753 -0.18113946 70.40442485 -0.22157317 C76.36723192 -0.25179639 82.32995673 -0.26654707 88.29283887 -0.26985329 C91.84956332 -0.27219702 95.40597982 -0.28106814 98.96262169 -0.30631447 C102.9358922 -0.33406317 106.90878799 -0.32974507 110.88215637 -0.32279968 C112.04975998 -0.33560974 113.21736359 -0.3484198 114.42034912 -0.36161804 C124.8439528 -0.2953374 133.05999033 2.95913294 140.6822052 10.14717102 C150.72051852 21.57086242 150.12179473 36.00462847 150.07038879 50.31123352 C150.07446085 52.22454629 150.07980627 54.1378567 150.08631897 56.05116272 C150.09992298 61.21644171 150.09472261 66.38153969 150.08518171 71.54682159 C150.07754913 76.97041283 150.08464068 82.39398929 150.08934021 87.81758118 C150.09478731 96.92291526 150.08763362 106.02817618 150.07331848 115.13349915 C150.05699402 125.63771491 150.06228327 136.14175595 150.0787977 146.64596748 C150.09244239 155.68922476 150.09431766 164.73242964 150.08648169 173.77569389 C150.08182156 179.16608923 150.08113445 184.55640263 150.09109116 189.9467926 C150.09980205 195.01618315 150.09366401 200.08534994 150.07640839 205.15471649 C150.07246548 207.00734843 150.0735396 208.85999942 150.08019638 210.7126236 C150.12976343 225.91745389 149.31242575 238.31612927 138.6822052 250.14717102 C130.67332479 257.68596497 121.63690999 258.59208755 111.09089661 258.55122375 C109.22592278 258.56151863 109.22592278 258.56151863 107.32327271 258.57202148 C103.93250058 258.58712881 100.54228094 258.58879941 97.15151644 258.5830791 C94.31130873 258.57997525 91.47115008 258.58609305 88.63094938 258.59211785 C81.92501087 258.60613617 75.21919982 258.60462482 68.51325989 258.59321594 C61.6171731 258.58174212 54.72147556 258.59580385 47.82544005 258.62261242 C41.88459192 258.64483478 35.94386539 258.65139201 30.00297868 258.64553601 C26.46364348 258.64218019 22.92455759 258.64448878 19.38525772 258.66178703 C15.43412009 258.6802574 11.48345375 258.66600196 7.53230286 258.64888 C6.3745787 258.65854797 5.21685455 258.66821594 4.02404785 258.67817688 C-7.1854921 258.57682067 -14.99468318 255.38309088 -23.1146698 247.65888977 C-28.86795977 241.09973117 -31.41320168 233.89165255 -31.49479675 225.2804718 C-31.50763199 224.09889496 -31.52046722 222.91731812 -31.53369141 221.69993591 C-31.54107834 220.42697662 -31.54846527 219.15401733 -31.55607605 217.84248352 C-31.5641478 216.53061066 -31.57221954 215.21873779 -31.58053589 213.86711121 C-31.59553342 211.09148795 -31.60538615 208.31589001 -31.61296082 205.54023743 C-31.62402881 201.99380761 -31.65844503 198.44800458 -31.69813251 194.90179634 C-31.73063456 191.50705092 -31.73507939 188.11237248 -31.74357605 184.71748352 C-31.76108414 183.44857269 -31.77859222 182.17966187 -31.79663086 180.87229919 C-31.7693105 169.77929477 -31.7693105 169.77929477 -27.3177948 165.14717102 C-23.70224596 163.07157817 -21.36937939 162.10510764 -17.1927948 162.27217102 C-12.95752576 163.56116595 -10.27509343 164.7774599 -7.69645691 168.46699524 C-5.65882309 173.90621823 -5.91666851 179.08100059 -5.94670105 184.84248352 C-5.9293276 187.35680786 -5.91174313 189.87113075 -5.89396667 192.38545227 C-5.88386957 196.34006837 -5.88030443 200.2945933 -5.88200378 204.2492218 C-5.87844417 208.07225279 -5.85114821 211.89457768 -5.82170105 215.71748352 C-5.82988358 216.90294769 -5.8380661 218.08841187 -5.84649658 219.30979919 C-5.83144325 220.96203995 -5.83144325 220.96203995 -5.81608582 222.6476593 C-5.81625198 223.61551361 -5.81641815 224.58336792 -5.81658936 225.58055115 C-5.17585357 228.87755023 -3.87753184 230.04596423 -1.3177948 232.14717102 C1.09041578 233.35127631 2.60265596 233.27816582 5.2928772 233.28761292 C6.2644426 233.29332306 7.236008 233.2990332 8.23701477 233.30491638 C9.84147461 233.30659317 9.84147461 233.30659317 11.47834778 233.30830383 C12.60202255 233.31326874 13.72569733 233.31823364 14.88342285 233.323349 C18.61453353 233.3379985 22.34560169 233.34477736 26.07673645 233.35029602 C28.66264854 233.35604528 31.24856061 233.36180304 33.83447266 233.36756897 C38.56819344 233.37674136 43.30189714 233.38303837 48.03562528 233.38606572 C55.00123309 233.39054488 61.96664452 233.40808506 68.93219262 233.43706632 C74.9656693 233.46129753 80.99905316 233.46901055 87.03258324 233.47074127 C89.59905249 233.4737723 92.16552083 233.48181588 94.73195839 233.49492645 C98.32075053 233.51195046 101.90906307 233.51011529 105.49787903 233.50361633 C106.56144623 233.51283112 107.62501343 233.5220459 108.72080994 233.53153992 C115.77069626 233.61605329 115.77069626 233.61605329 121.6822052 230.14717102 C123.87711927 225.93008842 123.96703392 221.94833255 123.94290161 217.29721069 C123.94672716 216.51312991 123.95055271 215.72904913 123.95449418 214.92120832 C123.96480219 212.2973234 123.96083623 209.6736582 123.9568634 207.04975891 C123.96121108 205.16715289 123.96639442 203.28454864 123.97235107 201.40194702 C123.98574595 196.29041308 123.98631922 191.17895306 123.98378778 186.06740499 C123.98271845 181.80040498 123.98760042 177.53341996 123.9923932 173.26642317 C124.00348996 163.20037526 124.00392475 153.13436467 123.99787903 143.0683136 C123.9918374 132.68285111 124.00415469 122.29752403 124.0254491 111.91208464 C124.04305949 102.99560687 124.04906736 94.07917223 124.04581136 85.16267771 C124.04399754 79.8371951 124.04664453 74.51180911 124.06052589 69.18634224 C124.07309052 64.17863242 124.07117303 59.17113388 124.05811501 54.16342735 C124.05574674 52.32601475 124.05849283 50.48858734 124.06673813 48.65119171 C124.07718617 46.14192044 124.06912079 43.63336067 124.056427 41.12411499 C124.06380129 40.39794056 124.07117557 39.67176614 124.07877332 38.92358643 C124.02938396 34.27920721 123.24096314 31.03943525 120.6822052 27.14717102 C117.79089933 25.06123629 115.33377294 24.89632978 111.82429504 24.89320374 C110.84853516 24.88756409 109.87277527 24.88192444 108.8674469 24.87611389 C107.80342651 24.88016235 106.73940613 24.88421082 105.6431427 24.88838196 C103.95478302 24.883125 103.95478302 24.883125 102.23231506 24.87776184 C98.50721593 24.86895066 94.78230631 24.87479164 91.0572052 24.88154602 C88.47175561 24.8801992 85.88630627 24.87825852 83.30085754 24.87574768 C77.88042051 24.87279724 72.46005486 24.87690105 67.03962708 24.88642883 C60.77526416 24.89731297 54.51103144 24.89378723 48.24667168 24.88277602 C42.21745379 24.8726028 36.18829954 24.87368425 30.15907288 24.87953949 C27.59457888 24.8808754 25.03008156 24.87923033 22.46559143 24.87458038 C18.88406014 24.86951179 15.30278023 24.87723039 11.7212677 24.88838196 C10.12523712 24.88230927 10.12523712 24.88230927 8.4969635 24.87611389 C7.52120361 24.88175354 6.54544373 24.88739319 5.54011536 24.89320374 C4.69357391 24.89395779 3.84703247 24.89471184 2.97483826 24.89548874 C0.41006791 25.1770459 -1.1520333 25.75401644 -3.3177948 27.14717102 C-5.55418538 30.50175688 -5.56806471 31.59851822 -5.57316589 35.51728821 C-5.58360428 37.16480072 -5.58360428 37.16480072 -5.59425354 38.84559631 C-5.59325653 40.03308472 -5.59225952 41.22057312 -5.5912323 42.44404602 C-5.61152601 44.95446711 -5.63237688 47.46488374 -5.6537323 49.97529602 C-5.67631595 53.93627167 -5.69279465 57.89707149 -5.69865417 61.85810852 C-5.7081867 65.67874533 -5.74198203 69.49858751 -5.7787323 73.31904602 C-5.77368683 74.4984375 -5.76864136 75.67782898 -5.76344299 76.89295959 C-5.84246974 83.5123643 -6.28910173 87.79761035 -10.3177948 93.14717102 C-14.38111728 95.85855626 -18.35924864 96.27288199 -23.1302948 95.64717102 C-27.31558011 93.67762499 -29.27547441 91.23181179 -31.3177948 87.14717102 C-31.42924362 85.29615002 -31.47704468 83.44115641 -31.49479675 81.58686829 C-31.50763199 80.42127884 -31.52046722 79.25568939 -31.53369141 78.05477905 C-31.54107834 76.78718246 -31.54846527 75.51958588 -31.55607605 74.21357727 C-31.5641478 72.91073288 -31.57221954 71.60788849 -31.58053589 70.26556396 C-31.59557388 67.49896881 -31.6054029 64.73239938 -31.61296082 61.96577454 C-31.6239532 58.44891837 -31.65826244 54.93270764 -31.69813251 51.41607761 C-31.7308497 48.03610574 -31.73510132 44.65619509 -31.74357605 41.27607727 C-31.76108414 40.02669876 -31.77859222 38.77732025 -31.79663086 37.49008179 C-31.76749625 25.59990219 -29.06867874 16.93593917 -20.7631073 8.31513977 C-14.52704012 2.78635816 -8.30358846 0.03791506 0 0 Z ' transform='translate(136.3177947998047,-0.1471710205078125)'/>
							<path d='M0 0 C3.83977124 2.25443499 6.63622596 4.92337602 9.73934937 8.08451843 C10.36445404 8.70918503 10.98955872 9.33385162 11.63360596 9.97744751 C13.68597893 12.03190071 15.72753676 14.09675442 17.76913452 16.16191101 C19.19479832 17.59317345 20.62112847 19.02377243 22.0480957 20.45373535 C25.79312721 24.21019432 29.52905989 27.97557651 33.26315308 31.74290466 C37.07869048 35.58918798 40.90278652 39.42694119 44.72616577 43.26542664 C52.22023181 50.79161983 59.70471078 58.32727005 67.18319702 65.86894226 C65.53357627 70.094848 62.40327052 72.93712558 59.25228882 76.07450867 C58.34218552 76.99227837 58.34218552 76.99227837 57.41369629 77.92858887 C55.40841666 79.94775813 53.39580295 81.95942194 51.38241577 83.97050476 C49.98455583 85.37225179 48.58691999 86.77422233 47.1894989 88.17640686 C44.25989282 91.11347368 41.326442 94.04663557 38.39047241 96.9773407 C34.62923475 100.73278214 30.87948702 104.49946725 27.13276958 108.2693882 C24.24951491 111.16737623 21.35936136 114.05840601 18.46717262 116.94747543 C17.08175393 118.33340748 15.69869701 119.72170461 14.31805992 121.11240005 C12.38655905 123.05624061 10.44575229 124.99029462 8.50228882 126.92216492 C7.93431076 127.49778671 7.3663327 128.07340851 6.78114319 128.66647339 C2.61131959 132.78153228 -0.45905448 134.61173333 -6.25430298 135.24394226 C-10.62088291 134.78430227 -12.53751037 133.77558798 -15.81680298 130.86894226 C-17.90685024 127.29563566 -18.75596501 124.67504533 -19.06680298 120.55644226 C-15.52296653 110.10212475 -3.02100557 100.95403156 4.74569702 93.24394226 C5.95752128 92.03714766 7.16911136 90.83011787 8.38046265 89.62284851 C11.31202173 86.70216819 14.24670723 83.7846648 17.18319702 80.86894226 C8.80525335 79.67878982 0.47539639 79.75616284 -7.96572876 79.80302429 C-9.59114437 79.80822482 -11.21656162 79.81293147 -12.84197998 79.81718445 C-16.32698192 79.82708239 -19.81195617 79.83991518 -23.29693985 79.85490799 C-28.81078292 79.87807047 -34.32462243 79.89130339 -39.83850098 79.90260315 C-55.51246798 79.93595795 -71.18638066 79.97772543 -86.86026001 80.04032898 C-95.52841467 80.07486744 -104.19652985 80.09866462 -112.86474597 80.11053741 C-118.34312049 80.1186244 -123.82123562 80.13984067 -129.29952645 80.17074227 C-132.70871431 80.18677136 -136.11782809 80.19016178 -139.52705002 80.18997192 C-141.10444051 80.19238925 -142.68183303 80.19994675 -144.25917053 80.21310043 C-146.41754786 80.2303456 -148.57516083 80.22889508 -150.73358154 80.22297668 C-151.93958071 80.22704088 -153.14557987 80.23110508 -154.38812447 80.23529243 C-159.48974952 79.69018994 -163.40210451 78.20918291 -167.19180298 74.61894226 C-169.21106928 71.20172237 -169.74716346 68.83839496 -169.81680298 64.86894226 C-168.1602954 60.17550412 -165.957856 57.59597718 -161.81680298 54.86894226 C-158.15469742 53.59200839 -154.5401709 53.74593125 -150.69210815 53.74868774 C-149.61504911 53.74740611 -149.61504911 53.74740611 -148.5162313 53.74609858 C-146.11021158 53.74445146 -143.70426158 53.74995259 -141.29824829 53.75541687 C-139.57354229 53.75569893 -137.84883618 53.75554063 -136.12413025 53.75497437 C-131.44062169 53.75468714 -126.75713867 53.76057185 -122.07363605 53.76754832 C-117.17957501 53.77379424 -112.28551339 53.77438664 -107.39144897 53.77557373 C-98.12321789 53.77868338 -88.85499858 53.78689186 -79.58677268 53.79692322 C-69.0354917 53.80809569 -58.48421017 53.81359767 -47.93292475 53.81861866 C-26.22754425 53.82907476 -4.52217435 53.84666715 17.18319702 53.86894226 C16.24953163 52.76688031 15.31399445 51.666404 14.37770081 50.5665741 C13.85693057 49.95357201 13.33616034 49.34056992 12.79960918 48.708992 C10.27370695 45.83362032 7.54514029 43.18538413 4.79647827 40.52519226 C3.59877407 39.34985777 2.40152165 38.17406274 1.2046814 36.99784851 C-0.65381267 35.17648989 -2.51515228 33.3584353 -4.38442993 31.54814148 C-6.20840703 29.77887175 -8.01923226 27.99696316 -9.82852173 26.21269226 C-10.38480759 25.6801886 -10.94109344 25.14768494 -11.51423645 24.5990448 C-15.17482587 20.9632577 -17.16280333 17.77874752 -18.81680298 12.86894226 C-18.72527758 7.5604692 -17.57020253 4.62234181 -13.81680298 0.86894226 C-9.59498592 -2.18823561 -4.6988354 -1.88676815 0 0 Z ' transform='translate(169.81680297851563,62.13105773925781)'/>
						</svg>
						Login
					</Link>
				)
			)}
		</nav>
	)
}

export default Header