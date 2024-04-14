import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ErrorNavigator = ({ error, updateErrors }) => {

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
        updateErrors(normalizedError);
        console.error(normalizedError);
    }, [error]);

    return (
        <>
            {error === 401 ? (
                <Navigate to="/login" />
            ) : (
                <Navigate to="/error" />
            )}
        </>
    );
};

export default ErrorNavigator;