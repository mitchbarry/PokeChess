import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ArrowIcon from './svgs/ArrowSvg'

import returnHeaderStyles from '../css/components/ReturnHeader.module.css'

const ReturnHeader = () => {

	const navigate = useNavigate()

    return (
		<nav className={`${returnHeaderStyles.header} flex-between`}>

		</nav>
	)
}

export default ReturnHeader