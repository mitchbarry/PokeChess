import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"

import pokemonService from "../services/PokemonService"

import "../styles/pokedex.css"

const PokeDex = () => {

	const [pokemon, setPokemon] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState({});
	const [selectedType, setSelectedType] = useState("");
	const pokemonListRef = useRef(null);
	const [typeColor, setTypeColor] = useState("");

	useEffect(() => {
		getSomePokemon(1, selectedType);
		window.scrollTo({
			top: 0,
		});
	}, [selectedType]);

	useEffect(() => {
		document.documentElement.style.setProperty('--detail-border-color', typeColor);
	}, [typeColor]);

	const getSomePokemon = async(lowLimit, filterType) => {
		let newPokemon;
		try {
			newPokemon = await pokemonService.getSomePokemon(lowLimit, filterType);
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
			pokemonListRef.current.scrollHeight > pokemonListRef.current.clientHeight &&
			pokemonListRef.current.scrollTop > 0 &&
			pokemonListRef.current.scrollHeight - pokemonListRef.current.scrollTop === pokemonListRef.current.clientHeight
		) {
			if (pokemon.length < 151) {
				getSomePokemon(((pokemon[pokemon.length - 1].pokedexNumber) + 1), selectedType); // loads 20 pokemon at a time from the database
			}
		}
	};

	const handleTypeChange = (newType) => {
		if (newType !== selectedType) {
			setSelectedType(newType);
			setPokemon([]);
			setSelectedPokemon({});
			setTypeColor(getTypeColor(newType));
		}
	};

	const handlePokemonClick = (pokemon) => {
		setSelectedPokemon(pokemon);
		const primaryType = pokemon.types[0];
		setTypeColor(getTypeColor(primaryType));
	};

	const getTypeColor = (type) => {
		const typeColors = {
			normal: "rgba(164, 164, 164, 0.5)",
			fire: "#F0803080",
			water: "#6890F080",
			electric: "#F8D03080",
			grass: "#78C85080",
			ice: "#98D8D880",
			fighting: "#C0302880",
			poison: "#A040A080",
			ground: "#E0C06880",
			flying: "#A890F080",
			psychic: "#F8588880",
			bug: "#A8B82080",
			rock: "#B8A03880",
			ghost: "#70589880",
			dragon: "#7038F880",
			dark: "#70584880",
			steel: "#B8B8D080",
			fairy: "#EE99AC80",
		};
		return typeColors[type.toLowerCase()] || "#68A09080"; //a default color for idk maybe it'll glitch some day
	};

	return (
		<Container>
			<Row>
				<div className="filter-type">
					<select value={selectedType} onChange={(e) => handleTypeChange(e.target.value)}>
						<option value="">All Types</option>
						<option value="normal">Normal</option>
						<option value="fire">Fire</option>
						<option value="water">Water</option>
						<option value="grass">Grass</option>
						<option value="electric">Electric</option>
						<option value="bug">Bug</option>
						<option value="fighting">Fighting</option>
						<option value="ground">Ground</option>
						<option value="rock">Rock</option>
						<option value="flying">Flying</option>
						<option value="psychic">Psychic</option>
						<option value="ghost">Ghost</option>
						<option value="poison">Poison</option>
						<option value="dragon">Dragon</option>
						<option value="dark">Dark</option>
						<option value="steel">Steel</option>
						<option value="ice">Ice</option>
						<option value="fairy">Fairy</option>
					</select>
					<Link to={"/pokedex/game"} className='btn col-3 mx-auto text-warning'style={{background:'linear-gradient(rgb(0,128,255),rgb(204,34,0))'}}>
						Guess that Pokemon!
					</Link>
				</div>
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
					<Col className="pokemon-details" style={{ backgroundColor: typeColor }}>
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
								<div key={index} className={`type ${type}`}>
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