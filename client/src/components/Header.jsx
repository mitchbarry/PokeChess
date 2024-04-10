import React, { useState } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from "../context/AuthContext"

import pokeChess from "../assets/fonts/pokeChess.png";
import MultiplayerIcon from "./svgs/MultiplayerIcon.jsx";
import PokedexIcon from "./svgs/PokedexIcon.jsx";
import NewsIcon from "./svgs/NewsIcon.jsx";
import LoginIcon from "./svgs/LoginIcon.jsx";
import LogoutIcon from "./svgs/LogoutIcon.jsx";
import favicon from "../assets/favicon126px.png"

import '../styles/Header.css'

const Header = () => {

    const location = useLocation();

    const { authToken, loggedUser, handleLogout } = useAuth();

	const [isHovered, setIsHovered] = useState({
		multiplayer: false,
		pokedex: false,
		pokenews: false,
		button: false
	});

	const handleHover = (e, action) => {
		switch (e.target.id) {
			case "multiplayer":
				if (action === "e") {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, multiplayer: true }));
				} else {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, multiplayer: false }));
				}
				break;
			case "pokedex":
				if (action === "e") {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, pokedex: true }));
				} else {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, pokedex: false }));
				}
				break;
			case "pokenews":
				if (action === "e") {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, pokenews: true }));
				} else {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, pokenews: false }));
				}
				break;
			case "button":
				if (action === "e") {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, button: true }));
				} else {
					setIsHovered((prevIsHovered) => ({ ...prevIsHovered, button: false }));
				}
				break;
			default:
				break;
		}
	}

    return (
		<Container className="container-header">
			<img src={favicon} className="favicon-img" alt="Pokeball Favicon"/>
			<Navbar className="navbar-container border border-warning border-3 rounded-5">
				<Nav className="nav-container">
					<Nav.Item className="nav-item-img text-warning">
						<Link to={authToken ? "/lobbies/home" : location.pathname === "/register" ? "/register" : "/login"}>
							<img src={pokeChess} className="pokeChess-img" alt="PokeChess"/>
						</Link>
					</Nav.Item>
					<div className="flexBoxSpaceBetween">
						<Nav.Item className="nav-item text-warning">
							<Link to={authToken ? "/lobbies/new" : location.pathname === "/register" ? "/register" : "/login"} className="link gap-1 d-flex flex-row" id="multiplayer" onMouseEnter={(e) => handleHover(e, "e")} onMouseLeave={(e) => handleHover(e, "l")}>
								<MultiplayerIcon fillColor={isHovered.multiplayer ? '#C69500' : '#FFCC01'} /> {/* Set fill color based on hover state */}
								<span className={"link-text" + (isHovered.multiplayer ? " link-hovered" : "")}>Create Lobby</span>
							</Link>
						</Nav.Item>
						<Nav.Item className="nav-item text-warning">
							<Link to="/pokedex" className="link gap-1 d-flex flex-row" id="pokedex" onMouseEnter={(e) => handleHover(e, "e")} onMouseLeave={(e) => handleHover(e, "l")}>
								<PokedexIcon fillColor={isHovered.pokedex ? '#C69500' : '#FFCC01'} /> {/* Set fill color based on hover state */}
								<span className={"link-text" + (isHovered.pokedex ? " link-hovered" : "")}>Pokédex</span>
							</Link>
						</Nav.Item>
						<Nav.Item className="nav-item text-warning">
							<Link to="/pokenews" className="link gap-1 d-flex flex-row" id="pokenews" onMouseEnter={(e) => handleHover(e, "e")} onMouseLeave={(e) => handleHover(e, "l")}>
								<span className={"link-text" + (isHovered.pokenews ? " link-hovered" : "")}>PokéNews</span>
								<NewsIcon fillColor={isHovered.pokenews ? '#C69500' : '#FFCC01'} /> {/* Set fill color based on hover state */}
							</Link>
						</Nav.Item>
					</div>
					<Nav.Item className="nav-item-button text-warning">
						{authToken ? (
							<Button variant="outline-warning" className="item-button gap-1 d-flex flex-row" id="button" onMouseEnter={(e) => handleHover(e, "e")} onMouseLeave={(e) => handleHover(e, "l")}>
								<LogoutIcon fillColor={isHovered.button ? '#3466B0' : '#FFC107'} /> {/* Set fill color based on hover state */}
								Logout
							</Button>) : (
							location.pathname === "/login" ? (
								<Link to="/register" className="text-decoration-none">
									<Button variant="outline-warning" className="item-button">
										Register
									</Button>
								</Link>
							) : (
								<Link to="/login" className="text-decoration-none">
									<Button variant="outline-warning" className="item-button gap-1 d-flex flex-row" id="button" onMouseEnter={(e) => handleHover(e, "e")} onMouseLeave={(e) => handleHover(e, "l")}>
										<LoginIcon fillColor={isHovered.button ? '#3466B0' : '#FFC107'} /> {/* Set fill color based on hover state */}
										Login
									</Button>
								</Link>
							)
						)}
					</Nav.Item>
				</Nav>
			</Navbar>
		</Container>
	)
}

export default Header;