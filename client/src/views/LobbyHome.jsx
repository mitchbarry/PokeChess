import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, ButtonGroup } from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import lobbiesImg from "../assets/text/lobbies.png";
import LobbyService from "../services/LobbyService";

import "../styles/lobbyHome.css"

const LobbyHome = () => {

    const { authToken, loggedUser, handleLoginResponse, updateLoggedUser, updateAuthToken, pathParamValidator, handleLoginToken } = useAuth();

    const [lobbies, setLobbies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lobbies = await LobbyService.getAllLobbies();
                setLobbies(lobbies);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container-main">
            <img src={lobbiesImg} alt="Lobbies" className="lobbies-img"/>
            <div className="container-content">
                <div className="content-main">
                    <h2>
                        Your Lobbies
                    </h2>
                    {lobbies.filter((lobby) => lobby.creator._id === loggedUser._id).length !== 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className="table-head">Name</th>
                                    <th className="table-head">Description</th>
                                    <th className="table-head">Actions
                                        {/* <svg className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg> */}
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
                </div>
                <div className="content-main">
                    <h3 className="text-warning">Public Lobbies</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-warning">Name</th>
                                <th className="text-warning">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lobbies.length !== 0 && lobbies.map((item) => (
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
                </div>
            </div>
        </div>
    );
};

    export default LobbyHome;
