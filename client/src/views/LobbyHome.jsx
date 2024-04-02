import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import LobbyService from '../services/LobbyService'

import { Container } from 'react-bootstrap'
const LobbyHome = () => {

    // const navigate = useNavigate()

    const [lobbies, setLobbies] = useState([])

    useEffect(() => {
      getAllLobbies();
  }, []);

  const getAllLobbies = async () => {
      let response;
      try {
          response = await LobbyService.getAllLobbies();
      }
      catch (error) {
          console.error(error);
      }
      finally {
          setLobbies(response);
      }
  };

    return (
      <div>
        
        <h2 className='py-2 mx-auto'>PokeChess Lobbies</h2>
        <Container className=' text-light border border-primary mx-auto d-flex flex-row' style={{minHeight:'60vh'}}>
          

          <Container className='d-flex flex-column mt-5  mx-auto my-auto text-light border border-light col-5'>


            <h3>Your Lobbies</h3>

            {/* Table should only display logged in user lobbies */}
            <table>

            </table>
          </Container>

          <Container className='d-flex flex-column mt-5 mx-auto my-auto text-light border border-light col-5'>


            <h3>Public Lobbies</h3>

            <table>
              <tbody>
                {lobbies && lobbies.map((lobby, index) => {
                  return (
                    <tr key={index}>
                      <td>{lobby.name}</td>
                      <td>{lobby.password}</td>
                      <td>{lobby.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Container>
        </Container>
      </div>
        
    )
}

export default LobbyHome