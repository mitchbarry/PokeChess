import React from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowIcon from './svgs/ArrowSvg'

import returnStyles from '../css/components/Return.module.css'

const Return = () => {

	const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        navigate(-1) || navigate('/')
    }

    return (
		<nav className={`${returnStyles.header} flex-between`}>
			<button className={`${returnStyles.header_return} flex-center`} onClick={handleClick}>
				<ArrowIcon className={returnStyles.icon_default}/>
			</button>
		</nav>
	)
}

export default Return