import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ArrowIcon from './svgs/ArrowSvg'

import returnStyles from '../css/components/Return.module.css'

const Return = () => {

	const navigate = useNavigate()

    return (
		<nav className={`${returnStyles.header} flex-between`}>
			<button className={`${returnStyles.header_return} flex-center`} onClick={() => navigate(-1) || navigate('/')}>
				<ArrowIcon className={returnStyles.icon_default}/>
			</button>
		</nav>
	)
}

export default Return