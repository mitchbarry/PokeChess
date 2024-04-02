import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorNavigator = ({ error, errors, updateErrors }) => {

    const navigate = useNavigate(); // Obtain navigate function from react-router-dom

    let tempErrors = {};

    useEffect(() => {
        let normalizedError = {};
        if (error === 404) {
            normalizedError = {
                statusCode: 404,
                message: "Resource not found",
                name: "Not Found",
                validationErrors: {}
            };
        } else if (error === 401) {
            normalizedError = {
                statusCode: 401,
                message: "Unauthorized access",
                name: "Unauthorized",
                validationErrors: {}
            };
        }
        tempErrors = normalizedError;
        console.error(normalizedError);
    }, [error]); // Dependency added to useEffect

    useEffect(() => {
        if (tempErrors.statusCode) {
            if (tempErrors.statusCode === 404) {
                navigate("/error")
                updateErrors(tempErrors);
            }
            else if (tempErrors.statusCode === 401) {
                navigate("/login")
                updateErrors(tempErrors);
            }
        }
    }, [tempErrors]);

    return null;
};

export default ErrorNavigator;