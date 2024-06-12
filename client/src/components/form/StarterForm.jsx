import React, { useState, useEffect } from 'react'

import StarterSelection from '../../assets/misc/starterForm/starterSelection.png'
import Pointer from '../../assets/misc/starterForm/pointer.png'
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
		handleStarter,
        focus,
        handleFocus,
        handleBlur
	} = props

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

	useEffect(() => {
		if (starter !== 0) {
			const selectedPokemon = starterData.find(pokemon => pokemon.pokedexNumber === starter)
            handleFocus(selectedPokemon.id)
		}
	}, [])

    const handleClick = (e) => {
        const { id } = e.target
        const selectedOption = starterData.find(option => option.id === id)
        if (selectedOption) {
            if (starter === selectedOption.pokedexNumber) {
                handleFocus('')
                handleStarter(0)
            }
            else {
                handleFocus(id)
                handleStarter(selectedOption.pokedexNumber)
            }
        }
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
					onFocus={(e) => handleFocus(e.target.id)}
					onBlur={(e) => handleBlur(e.target.id)}
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