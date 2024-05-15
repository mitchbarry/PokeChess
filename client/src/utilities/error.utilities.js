const errorUtilities = {
    catchError(error) {
        if (error.response) {
            const { data, status } = error.response
            const normalizedError = {
                statusCode: status,
                message: data.message || 'Server Error',
                name: data.name || 'ServerError',
                validationErrors: data.validationErrors || {}
            }
            console.error(normalizedError)
            return normalizedError
        }
        else if (error.request) {
            const normalizedError = {
                statusCode: 500,
                message: 'A network error occurred. Please check your internet connection and try again.',
                name: 'NetworkError',
                validationErrors: {}
            }
            console.error(normalizedError)
            return normalizedError
        }
        else {
            const normalizedError = {
                statusCode: 500,
                message: 'An unexpected error occurred. Please try again later.',
                name: 'UnexpectedError',
                validationErrors: {}
            }
            console.error(normalizedError)
            return normalizedError
        }
    }
}

export default errorUtilities