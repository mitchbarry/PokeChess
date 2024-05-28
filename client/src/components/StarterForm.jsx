import React, { useState } from 'react'

import StarterSelection from '../assets/starterSelection.png'

import starterFormStyles from '../css/components/StarterForm.module.css'

const StarterForm = (props) => {

	const {
		starter,
		handleStarter
    } = props

	const [focus, setFocus] = useState({
		bulbasaur: false,
		charmander: false,
		squirtle: false
	})

	const handleClick = (e) => {
		if (e.target.id === '1' && starter !== 1) {
			console.log('Picked Bulbasaur!')
			return handleStarter(1)
		}
		if (e.target.id === '2' && starter !== 2) {
			console.log('Picked Charmander!')
			return handleStarter(2)
		}
		if (e.target.id === '3' && starter !== 3) {
			console.log('Picked Squirtle!')
			return handleStarter(3)
		}
	}

	const handleFocus = (input) => {
        setFocus((prevFocus) => ({
            ...prevFocus, [input]: true,
        }))
    }

    const handleBlur = (input) => {
        if (input === 'username' && !username.trim()) {
            return setFocus((prevFocus) => ({
                ...prevFocus, username: false
            }))
        }
        if (input === 'email' && !email.trim()) {
            return setFocus((prevFocus) => ({
                ...prevFocus, email: false
            }))
        }
        if (input === 'password' && !password.trim()) {
            return setFocus((prevFocus) => ({
                ...prevFocus, password: false
            }))
        }
    }

    return (
		<div className={`${starterFormStyles.input_starter}`}>
			{starter === 1 && (
				<></>
			)}
			{starter === 2 && (
				<></>
			)}
			{starter === 3 && (
				<></>
			)}
			<div id='1' tabIndex='0' role='button' className={`${starterFormStyles.starter_option} ${starterFormStyles.option1}`} onClick={(e) => handleClick(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)}/>
			<div id='2' tabIndex='0' role='button' className={`${starterFormStyles.starter_option} ${starterFormStyles.option2}`} onClick={(e) => handleClick(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)}/>
			<div id='3' tabIndex='0' role='button' className={`${starterFormStyles.starter_option} ${starterFormStyles.option3}`} onClick={(e) => handleClick(e)} onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e)}/>
			<img className={`${starterFormStyles.starter}`} src={StarterSelection} alt="Choose Your Starter!" />
		</div>
	)
}

export default StarterForm