import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginNavigator = () => {

    const navigate = useNavigate(); // Obtain navigate function from react-router-dom

    useEffect(() => {
        navigate("/login")
    }, []);

    return null;
};

export default LoginNavigator;