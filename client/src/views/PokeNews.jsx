import React, { useEffect } from "react"

import pokeNews from "../assets/fonts/pokeNews.png"
import "../styles/pokeNews.css"

const PokeTwitter = () => {
	useEffect(() => {
		const script = document.createElement("script")
		script.async = true
		script.src = "https://platform.twitter.com/widgets.js"
		document.body.appendChild(script)

		return () => document.body.removeChild(script)
	}, [])

	return (
		<div className="title">
			<img src={pokeNews} alt="PokeNews" />
			<div className="poke-twitter-container">
				<a
					className="twitter-timeline"
					data-theme="dark"
					href="https://twitter.com/Pokemon?ref_src=twsrc%5Etfw"
				></a>
			</div>
		</div>
	)
}

export default PokeTwitter