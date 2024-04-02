import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AlreadyLoggedIn = () => {

    const navigate = useNavigate(); // Obtain navigate function from react-router-dom

    useEffect(() => {
        navigate("/lobbies/home")
    }, []);

    return null;
};

export default AlreadyLoggedIn;