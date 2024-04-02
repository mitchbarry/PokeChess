import React, { useState, useEffect, useRef } from "react";

import pokemonService from "../services/PokemonService"

import "../styles/pokedex.css"
import { Container, Row, Col } from "react-bootstrap"

const PokeDex = () => {

	const [pokemon, setPokemon] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState({});
	const pokemonListRef = useRef(null);

	useEffect(() => {
		if (pokemon.length === 0) {
			getSomePokemon(1, 20);
		}
	}, []);

	const getSomePokemon = async(lowLimit, highLimit) => {
		let newPokemon;
		try {
			newPokemon = await pokemonService.getSomePokemon(lowLimit, highLimit);
		}
		catch (error) {
			console.error("Error fetching Pokemon:", error);
		}
		finally {
			setPokemon(prevPokemon => [...prevPokemon, ...newPokemon]);
		}
	};

	const formatString = (string) => {
		if (string !== "mr-mime") {
			return string.replace(/(^|-)\w/g, char => (char.toUpperCase())).replace("-"," ");
		}
		else {
			return "Mr. Mime";
		}
	}

	const handleScroll = () => {
		if (
			pokemonListRef.current.scrollHeight - pokemonListRef.current.scrollTop === pokemonListRef.current.clientHeight
		) {
			if (pokemon.length < 151) {
				getSomePokemon((pokemon.length + 1), (pokemon.length + 21)); // loads 20 pokemon at a time from the database
			}
		}
	};

	const handlePokemonClick = (pokemon) => {
		setSelectedPokemon(pokemon);
	};

	return (
		<Container>
			<Row>
				<Col 
					className="pokemon-list"
					onScroll={handleScroll}
					ref={pokemonListRef}
				>
					{pokemon.map((onePokemon, index) => (
						<div
							key={index}
							className="pokemon-item"
							onClick={() => handlePokemonClick(onePokemon)}
						>
							<img
								src={onePokemon.spriteOfficialArtwork}
								alt={onePokemon.name}
							/>
							<div className="text-light">
								{formatString(onePokemon.name)}
							</div>
						</div>
					))}
				</Col>

				{Object.keys(selectedPokemon).length !== 0 && (
					<Col className="pokemon-details">
						<h1 style={{ fontFamily: "Pokemon Solid,sans-serif" }}>
							{formatString(selectedPokemon.name)}
						</h1>
						<img
							src={selectedPokemon.spriteOfficialArtwork}
							alt={selectedPokemon.name}
						/>
						<p>
							Abilities:{" "}
							{selectedPokemon.abilities.map((ability) =>
									formatString(ability)
								)
								.join(", ")
							}
						</p>
						<p>
							Rarity:{" "}
							<span className={`rarity${selectedPokemon.rarity}`}>
								{selectedPokemon.rarity === 1 ? "Common" : selectedPokemon.rarity === 2 ? "Uncommon" : selectedPokemon.rarity === 3 ? "Rare" : selectedPokemon.rarity === 4 ? "Epic" : "Legendary"}
							</span>
						</p>
						<div className="types">
							{selectedPokemon.types.map((type, index) => (
								<div
									key={index}
									className={`type ${type}`}
								>
									{formatString(type)}
								</div>
							))}
						</div>
						<div style={{ fontFamily: "Pokemon Solid,sans-serif" }}>
							<h2 className="text-light">Stats:</h2>
							{Object.keys(selectedPokemon.baseStats).map((stat, index) => (
								<h5 style={{color:'hsl(52, 100%, 50%)'}} key={index}>
									{stat === "hp" ? "Health" : stat === "specialAttack" ? "Special Attack" : stat === "specialDefense" ? "Special Defense" : formatString(stat)}:{" "}
									{selectedPokemon.baseStats[stat]}
								</h5>
							))}
						</div>
					</Col>
				)}
			</Row>
		</Container>
	)
}

export default PokeDex;