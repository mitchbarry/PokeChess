import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ErrorNavigator = ({ error, updateErrors }) => {

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
        updateErrors(normalizedError);
        console.error(normalizedError);
    }, [error]);

    return (
        <Route>
            {error === 401 ? (
                <Redirect to="/login" />
            ) : (
                <Redirect to="/error" errors={tempErrors}/>
            )}
        </Route>
    );
};

export default ErrorNavigator;