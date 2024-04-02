const errorUtilities = {
    catchError(error) {
        console.error(error)
        if (error.response) { // Handle registration error if server returns an error response
            return error.response.data;
        }
        else if (error.request) { // Handle network errors
            const normalizedError = {
                statusCode: 500, // Assuming a generic status code for network errors
                message: "A network error occurred. Please check your internet connection and try again.",
                name: "NetworkError",
                validationErrors: {}
            };
            return normalizedError;
        }
        else { // Handle unexpected errors
            const normalizedError = {
                statusCode: 500, // Assuming a generic status code for unexpected errors
                message: "An unexpected error occurred. Please try again later.",
                name: "UnexpectedError",
                validationErrors: {}
            };
            return normalizedError;
        }
    }
}

export default errorUtilities;