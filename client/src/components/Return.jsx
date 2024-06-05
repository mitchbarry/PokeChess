import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import ArrowIcon from './svgs/ArrowSvg'

import styles from '../css/components/Return.module.css'

const Return = () => {

	const navigate = useNavigate()
	const location = useLocation()

    const handleClick = (e) => {
        e.preventDefault()
        if (location.key !== 'default') {
            navigate(-1)
        }
		else {
            navigate('/')
        }
    }

    return (
		<nav className={`${styles.header} flex-between`}>
			<button className={`${styles.header_return} flex-center`} onClick={handleClick}>
				<ArrowIcon className={styles.icon_default}/>
			</button>
		</nav>
	)
}

export default Return