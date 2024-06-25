import React from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowIcon from './svgs/ArrowSvg'

import styles from '../css/components/Return.module.css'

const Return = () => {

	const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/')
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