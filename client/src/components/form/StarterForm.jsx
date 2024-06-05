import React, { useState, useEffect } from 'react'

import StarterSelection from '../../assets/starterSelection.png'
import Pointer from '../../assets/pointer.png'
import Bulbasaur from '../../assets/pokemonGifs/ani_bw_001.gif'
import Charmander from '../../assets/pokemonGifs/ani_bw_004.gif'
import Squirtle from '../../assets/pokemonGifs/ani_bw_007.gif'

import starterFormStyles from '../../css/components/form/StarterForm.module.css'

const starterData = [
    { id: 'option1', name: 'bulbasaur', image: Bulbasaur, pokedexNumber: 1 },
    { id: 'option2', name: 'charmander', image: Charmander, pokedexNumber: 4 },
    { id: 'option3', name: 'squirtle', image: Squirtle, pokedexNumber: 7 }
]

const StarterForm = (props) => {
    const {
		starter,
		handleStarter
	} = props

	const [focus, setFocus] = useState('')

	useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                const selectedOption = starterData.find(option => option.id === focus)
                if (selectedOption) {
                    handleStarter(selectedOption.pokedexNumber)
                }
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
                setFocus('')
                handleStarter(0)
            } else {
                setFocus(id)
                handleStarter(selectedOption.pokedexNumber)
            }
        }
    }

    const handleFocus = (e) => {
        const { id } = e.target
        setFocus(id)
    }

    const handleBlur = () => {
        setFocus('')
    }

    return (
        <div className={`${starterFormStyles.input_starter} w-100`}>
            {starterData.map((option) => {
                const isFocused = focus === option.id
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
                    onClick={(e) => handleClick(e)}
					onFocus={(e) => handleFocus(e)}
					onBlur={(e) => handleBlur(e)}
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