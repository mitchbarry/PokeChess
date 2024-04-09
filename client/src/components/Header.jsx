import React from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from "../context/AuthContext"

import pokeChess from "../assets/fonts/pokeChess.png"
import multiplayerIcon from "../assets/multiplayerIcon.png"
import pokedexIcon from "../assets/pokedexIcon.png"
import newsIcon from "../assets/newsIcon.png"
import favicon from "../assets/favicon126px.png"

import '../styles/Header.css'

const Header = () => {

    const location = useLocation();

    const { authToken, loggedUser, handleLogout } = useAuth();

    return (
		<Container className="container-header">
			<img src={favicon} className="favicon-img" alt="Pokeball Favicon"/>
			<Navbar className="navbar-container border border-warning border-3 rounded-5">
				<Nav className="nav-container">
					<Nav.Item className="nav-item-20 text-warning">
						<Link to={authToken ? "/lobbies/home" : location.pathname === "/register" ? "/register" : "/login"}>
							<img src={pokeChess} className="pokeChess-img" alt="PokeChess"/>
						</Link>
					</Nav.Item>
					<Nav.Item className="nav-item text-warning">
						<Link to={authToken ? "/lobbies/new" : location.pathname === "/register" ? "/register" : "/login"} className="link text-warning gap-1 d-flex flex-row">
							<img src={multiplayerIcon} className="link-icon" alt="Multiplayer Icon"/>
							Create Lobby
						</Link>
					</Nav.Item>
					<Nav.Item className="nav-item text-warning">
						<Link to="/pokedex" className="link text-warning gap-1 d-flex flex-row">
							<img src={pokedexIcon} className="link-icon" alt="Pokedéx Icon"/>
							Pokédex
						</Link>
					</Nav.Item>
					<Nav.Item className="nav-item text-warning">
						<Link to="/pokenews" className="link text-warning gap-1 d-flex flex-row">
							PokéNews
							<img src={newsIcon} className="link-icon" alt="PokéNews Icon"/>
						</Link>
					</Nav.Item>
					<Nav.Item className="nav-item text-warning">
						{authToken ? (
							<Button variant="outline-warning" onClick={handleLogout}>
								Logout
							</Button>) : (
							location.pathname === "/login" ? (
								<Link to="/register">
									<Button variant="outline-warning">
										Register
									</Button>
								</Link>
							) : (
								<Link to="/login">
									<Button variant="outline-warning">
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