import React from "react"
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Lobbies from "../assets/fonts/PokeChess.png"
import PokeDex from "../assets/fonts/Pokedex.png"
import "../styles/header.css"
import { useAuth } from "../context/AuthContext"

const Header = ({ message }) => {

	const { authToken,handleLogout } = useAuth()

	return (
		<Container>
			<Navbar
				className="mx-auto my-auto border border-warning border-3 rounded-5 d-flex flex-row"
				style={{
					background: "linear-gradient(rgb(0,128,255),rgb(204,34,0))",
					width: "80vh",
				}}
			>
				<Nav className="d-flex my-auto">
					<Nav.Item
						className="text-warning"
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							fontFamily: "cursive",
						}}
					>
						<Link to={"/lobbies/home"} className="text-warning">
							<img
								src={Lobbies}
								style={{ height: "48px", width: "160px" }}
							/>
						</Link>
					</Nav.Item>
					<Container
						className="col-12 d-flex  justify-content-center align-items-center  my-auto "
						style={{ width: "70vh" }}
					>
						<Nav.Item
							className="text-warning mx-auto "
							style={{
								fontSize: "18px",
								fontWeight: "bold",
								fontFamily: "fantasy",
							}}
						>
							<Link
								to={"/lobbies/new"}
								className="text-warning gap-2 d-flex flex-row"
								style={{ textDecoration: "underline" }}
							>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										fill="currentColor"
										className="bi bi-person-circle mb-1"
										viewBox="0 0 16 16"
									>
										<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
										<path
											fillRule="evenodd"
											d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
										/>
									</svg>
								</div>
								Create╬Lobby
							</Link>
						</Nav.Item>
						<Nav.Item className="text-warning mx-auto">
							<Link
								to={"/pokedex"}
								className="text-warning d-flex flex-row "
							>
								<div className="my-auto">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										fill="currentColor"
										className="bi bi-backpack3-fill"
										viewBox="1 0 16 16"
									>
										<path d="M5 10v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z" />
										<path d="M6 2v.341a6 6 0 0 0-1.308.653l-.416-1.247a1 1 0 0 0-1.749-.284l-.77 1.027a1 1 0 0 0-.149.917l.803 2.407A6 6 0 0 0 2 8v5.5A2.5 2.5 0 0 0 4.5 16h7a2.5 2.5 0 0 0 2.5-2.5V8c0-.771-.146-1.509-.41-2.186l.801-2.407a1 1 0 0 0-.148-.917l-.77-1.027a1 1 0 0 0-1.75.284l-.415 1.247A6 6 0 0 0 10 2.34V2a2 2 0 1 0-4 0m1 0a1 1 0 0 1 2 0v.083a6 6 0 0 0-2 0zm5.941 2.595a6 6 0 0 0-.8-.937l.531-1.595.77 1.027zM3.86 3.658a6 6 0 0 0-.8.937L2.557 3.09l.77-1.027zm.18 3.772a4 4 0 0 1 7.92 0 .5.5 0 1 1-.99.142 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.142M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
									</svg>
								</div>
								<img
									src={PokeDex}
									style={{ height: "32px", width: "96px" }}
								/>
							</Link>
						</Nav.Item>
						<Nav.Item
							className="text-warning mx-auto"
							style={{
								fontSize: "16px",
								fontWeight: "bold",
								fontFamily: "fantasy",
								textDecoration: "underline",
							}}
						>
							<Link
								to={"/pokenews"}
								className="text-warning d-flex flex-row"
							>
								{" "}
								PokéNews{" "}
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-newspaper"
										viewBox="0 0 16 16"
									>
										<path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
										<path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
									</svg>
								</div>
							</Link>
						</Nav.Item>
						<Nav.Item className="d-flex flex-row  my-auto mx-auto ml-3 col-1 py-1">
							<Button
								style={{ fontFamily: "fantasy" }}
								variant="outline-warning"
								onClick={handleLogout}
							>
								{message
									? (message = "Login")
									: (message = "Logout")}
							</Button>
						</Nav.Item>
					</Container>
				</Nav>
			</Navbar>
		</Container>
	)

}

export default Header;