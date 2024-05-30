import React, { useState, useEffect } from 'react'

import StarterSelection from '../assets/starterSelection.png'
import Pointer from '../assets/pointer.png'
import Bulbasaur from '../assets/pokemonGifs/ani_bw_001.gif'
import Charmander from '../assets/pokemonGifs/ani_bw_004.gif'
import Squirtle from '../assets/pokemonGifs/ani_bw_007.gif'

import starterFormStyles from '../css/components/StarterForm.module.css'

const starterData = [
    { id: 'option1', name: 'bulbasaur', image: Bulbasaur, pokedexNumber: 1 },
    { id: 'option2', name: 'charmander', image: Charmander, pokedexNumber: 4 },
    { id: 'option3', name: 'squirtle', image: Squirtle, pokedexNumber: 7 }
]

const StarterForm = (props) => {
    const { starter, handleStarter } = props

    const [focus, setFocus] = useState({
        option1: false,
        option2: false,
        option3: false
    })

	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
				case 'ArrowRight':
				case 'd':
				case 's':
					if (focus.option1) {
						setFocus({
							option1: false,
							option2: true,
							option3: false
						})
					}
					else if (focus.option2) {
						setFocus({
							option1: false,
							option2: false,
							option3: true
						})
					}
					else if (focus.option3) {
						setFocus({
							option1: true,
							option2: false,
							option3: false
						})
					}
					else {
						setFocus({
							option1: true,
							option2: false,
							option3: false
						})
					}
					break
				case 'ArrowLeft':
				case 'a':
				case 'w':
					if (focus.option1) {
						setFocus({
							option1: false,
							option2: false,
							option3: true
						})
					}
					else if (focus.option2) {
						setFocus({
							option1: true,
							option2: false,
							option3: false
						})
					}
					else if (focus.option3) {
						setFocus({
							option1: false,
							option2: true,
							option3: false
						})
					}
					else {
						setFocus({
							option1: false,
							option2: false,
							option3: true
						})
					}
					break
				case 'Enter':
					starterData.forEach((option) => {
						if (focus[option.name]) {
							handleStarter(option.pokedexNumber)
						}
					})
					break
				default:
					break
			}
		}
	
		document.addEventListener('keydown', handleKeyDown)
	
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [focus])

	const handleClick = (e) => {
		const { id } = e.target
		const selectedOption = starterData.find(option => option.id === id)
	
		if (selectedOption) {
			if (starter === selectedOption.pokedexNumber) {
				setFocus({
					option1: false,
					option2: false,
					option3: false
				})
				handleStarter(0)
			}
			else {
				setFocus({
					option1: false,
					option2: false,
					option3: false,
					[id]: true
				})
				handleStarter(selectedOption.pokedexNumber)
			}
		}
	}

    const handleFocus = (e) => {
        const { id } = e.target
        setFocus(prevFocus => ({
            ...prevFocus,
            [id]: true
        }))
    }

    const handleBlur = (e) => {
        const { id } = e.target
        setFocus(prevFocus => ({
            ...prevFocus,
            [id]: false
        }))
    }

    return (
        <div className={`${starterFormStyles.input_starter} w-100`}>
            {starterData.map((option) => {
                const isFocused = focus[option.id] || starter === option.pokedexNumber
                const pointerClass = starterFormStyles[`pointer_${option.id}`]
                return (
                    isFocused && (
                        <img
                            key={option.id}
                            className={`${starterFormStyles.pointer} ${pointerClass}`}
                            src={Pointer}
                            alt="Pointer"
                        />
                    )
                )
            })}

            {starterData.map(option => (
                <div
                    key={option.id}
                    id={option.id}
                    tabIndex="0"
                    role="button"
                    className={`${starterFormStyles.starter_option} ${starterFormStyles[option.id]} clickable`}
                    onClick={handleClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            ))}

			{starter !== 0 && (
                <div className={`${starterFormStyles.starter_bubble}`}>
                    {starterData.map(option => (
                        starter === option.pokedexNumber && (
                            <img 
                                key={option.id}
                                className={starterFormStyles.starter_pokemon}
                                src={option.image}
                                alt={option.name}
                            />
                        )
                    ))}
                </div>
            )}

            <img className={`${starterFormStyles.starter} w-100`} src={StarterSelection} alt="Choose Your Starter!" />
        </div>
    )
}

export default StarterForm