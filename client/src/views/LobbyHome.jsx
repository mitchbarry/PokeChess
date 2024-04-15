import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, ButtonGroup } from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import PokeChessLogo from "../assets/fonts/pokeChessLobbies.png";
import LobbyService from "../services/LobbyService";

const LobbyHome = () => {
    
    const { authToken, loggedUser, handleLoginResponse, updateLoggedUser, updateAuthToken, pathParamValidator, handleLoginToken } = useAuth();

    const [lobbies, setLobbies] = useState([]);

    useEffect(() => {
        LobbyService.getAllLobbies()
        .then((res) => {
            console.log(res);
            setLobbies(res);
        })
        .catch((errors) => {
            console.log(errors);
        });
    }, []);

    return (
        <div className="title">
        <h2 className="py-2 my-auto mx-auto text-warning">
            <div className="pokeChessLobbiesLogo">
            <img src={PokeChessLogo} alt="PokeChess Lobbies" />
            </div>
        </h2>
        <Container
            className="text-light mx-auto d-flex flex-row border border-2 border-warning rounded-2"
            style={{
            minHeight: "60vh",
            background:
                "linear-gradient(teal,rgba(51, 103, 153, 0.9),rgb(138,18,0))",
            }}
        >
            <Container
            className="d-flex flex-column mt-5 mx-auto my-auto text-light border border-3 border-warning border-top-10 border-bottom rounded-3 col-5"
            style={{}}
            >
            <h3 className="text-warning">Your Lobbies</h3>

            {lobbies.length > 0 ? (
                <table>
                <thead>
                    <tr>
                    <th className="text-warning">Name</th>
                    <th className="text-warning">Description</th>
                    <th className="px-1 text-warning">
                        Actions
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                        >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {lobbies
                    .filter((lobby) => lobby.creator === loggedUser)
                    .map((lobby) => (
                        <tr
                        key={lobby._id}
                        className="my-auto mx-auto py-4 my-2"
                        >
                        <td>{lobby.name}</td>
                        <td>{lobby.description}</td>

                        <td className="my-auto">
                            <ButtonGroup
                            className="my-auto py-2 mx-auto"
                            size="sm"
                            >
                            <Button variant="warning" size="sm">
                                <Link
                                className="btn btn-warning py-1"
                                to={`/lobbies/${lobby._id}/edit`}
                                style={{
                                    color: "rgb(138,18,0)",
                                }}
                                >
                                Edit
                                </Link>
                            </Button>
                            <Button variant="warning" size="sm">
                                <Link
                                className="btn btn-warning py-1"
                                to={`/play/${lobby._id}`}
                                style={{
                                    color: "rgb(138,18,0)",
                                }}
                                >
                                Play
                                </Link>
                            </Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p>No private lobbies available</p>
            )}
            </Container>

            <Container className="d-flex flex-column mt-5 mx-auto my-auto text-light border border-3 border-warning border-top-10 border-bottom-1 rounded-3 col-5 py-3 my-3 mx-3">
            <h3 className="text-warning">Public Lobbies</h3>

            <table>
                <thead>
                <tr>
                    <th className="text-warning">Name</th>
                    <th className="text-warning">Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {lobbies.map((item) => (
                    <tr
                    key={item._id}
                    className="my-auto mx-auto py-4 my-2"
                    >
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                        <Button variant="warning" size="sm">
                        <Link
                            className="btn btn-warning py-1"
                            to={`/play/${item._id}`}
                            style={{
                            color: "rgb(138,18,0)",
                            }}
                        >
                            Play
                        </Link>
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </Container>
        </Container>
        </div>
    );
    };

    export default LobbyHome;
