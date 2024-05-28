import React from 'react'

import StarterSelection from '../assets/starterSelection.png'

import starterFormStyles from '../css/components/StarterForm.module.css'

const StarterForm = (props) => {

	const {
		starter,
		handleStarter
    } = props

    return (
		<div className={`${starterFormStyles.input_starter}`}>
			<div />
			<div />
			<div />
			<img className={`${starterFormStyles.starter}`} src={StarterSelection} alt="Choose Your Starter!"></img>
		</div>
	)
}

export default StarterForm