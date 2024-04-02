import { React, useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'

import { useAuth } from "../context/AuthContext"
import LobbyService from '../services/LobbyService'
import errorUtilities from '../utilities/error.utilities'
import gameStateUtilities from '../utilities/gameState.utilities'

import styles from "../styles/CreateLobby.module.css"
import { Container,Table,ButtonGroup,Button } from 'react-bootstrap'

const CreateLobby = () => {

    const { loggedUser } = useAuth();

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [lobbies, setLobbies] = useState([])
    const [errors, setErrors] = useState({})
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        getUserLobbies();
    }, []);

    const getUserLobbies = async () => {
        let response;
        try {
            response = await LobbyService.getUserLobbies(loggedUser._id);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLobbies(response);
        }
    };

    const handleInput = (e) => {
        switch(e.target.id) {
            case "name":
                return handleName(e);
            case "description":
                return handleDescription(e);
            case "password":
                return handlePassword(e);
            default:
                return;
        }
    };

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    };

    const sendRequest = async () => {
        const newGameState = gameStateUtilities.newGameState();
        try {
            await LobbyService.createOneLobby({
                name: name.trim() ? name : loggedUser.username + "'s Lobby",
                description: description.trim(),
                password: password.trim(),
                creator: loggedUser,
                gameState: newGameState
            });
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error));
            setShowNotification(true);
        }
        finally {
            navigate("/lobbies/new");
        }
    }

    const handleDelete = async(id) => {
        try {
            await LobbyService.deleteOneLobby(id);
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error));
            setShowNotification(true);
        }
        finally {
            getUserLobbies();
        }
    }

    const closeNotification = () => {
        setShowNotification(false);
    }

    return (
        <div className="d-flex flex-row col-12">
            <div className="container d-flex flex-row col-12 " style={{backgroundColor:'rgb(51, 103, 153, 0.9)'}}>
                <div>
                    <h2 className='text-warning'>Create Lobby</h2>
                    {(Object.keys(errors).length !== 0  && showNotification) && (
                        <ul className={styles.flashBox}>
                            <button className={styles.closeButtonRed} onClick={() => closeNotification()}>x</button>
                            {errors.statusCode && errors.name && (
                                <li className={styles.flashBoxLi}>
                                    Error {errors.statusCode}: {errors.name} 
                                </li>
                            )}
                            {errors.message && (
                                <li className={styles.flashBoxLi}>
                                    {errors.message}
                                </li>
                            )}
                            {errors.validationErrors && errors.validationErrors.length !== 0 && (
                                Object.keys(errors.validationErrors).map((key, index) => (
                                    <li key={index} className={styles.flashBoxLi}>
                                        {errors.validationErrors[key]}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit} className="form-control mt-3 d-flex flex-column" style={{background:'radial-gradient(silver,slategrey)',width:'45vh'}}>
                        <label className='form-label my-1 text-warning' htmlFor="name">
                            <h5>Lobby</h5>
                        </label>
                        <input className='form-control mt-1 ' style={{backgroundColor:'rgb(234,224,200)',fontFamily:'fantasy',color:'goldenrod' }} type="text" name="name" id="name" value={name} onChange={(e) => handleInput(e)} placeholder="Name"></input>
                        <label className='form-label text-warning' htmlFor="description">
                            <h5>Description</h5>
                        </label>
                        <input className='form-control mt-1 ' style={{backgroundColor:'rgb(234,224,200)',fontFamily:'fantasy',color:'goldenrod'}} type="text" name="description" id="description"value={description} onChange={(e) => handleInput(e)} placeholder="Description"></input>
                        <label className='form-label text-warning' htmlFor="password">
                            <h5>Password</h5>
                        </label>
                        <input className='form-control mt-1' style={{backgroundColor:'rgb(234,224,200)',fontFamily:'fantasy',color:'goldenrod'}} type="password" name="password" id="password" value={password} onChange={(e) => handleInput(e)} placeholder="Password"></input>
                        <button className='col-12 text-warning mt-2 border borrder-info' style={{backgroundColor:'rgb(138,18,0)'}}>New Lobby </button>
                    </form>
                </div>
                <Container className="col-6 text-warning mx-auto mt-4">
                    <h2>Current Lobbies</h2>
                    <Table striped bordered hover variant='info' className='mx-auto my-auto' >
                        <thead>
                            <tr>
                                <th>Lobby Name</th>
                                <th>Description</th>
                                <th>Passcode to Join?</th>
                                <th>
                                    Actions{" "}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lobbies && lobbies.map((lobby, index) => {
                                <tr key={index}>
                                    <td>
                                        {lobby.name}
                                    </td>
                                    <td>
                                        {lobby.description}
                                    </td>
                                    <td style={lobby.password? {color:'green'}: {color:'red'}}>
                                        {lobby.password? "Yes":"No"}
                                    </td>
                                    <ButtonGroup className='d-flex flex-row py-3' >
                                        <Button >
                                            <Link className='text-light '  to={`/lobbies/${lobby._id}/edit`}>
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button  className='text-light' onClick={ ()=>{handleDelete(`${lobby._id}`)}}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}

export default CreateLobby;