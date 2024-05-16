const errorUtilities = {
    normalizeError(error) {
        const normalizedError = {
            statusCode: error.statusCode || error.name === 'ValidationError' ? 400 : 500,
            message: error.message || 'Something went wrong.',
            name: error.name || 'Server Error.',
            validationErrors: this.extractValidationErrors(error)
        }
        return normalizedError
    },

    extractValidationErrors(error) {
        const validationErrors = {}
        if (error.name === 'ValidationError') {
            for (const field in error.errors) {
                if (error.errors.hasOwnProperty(field)) {
                    const errorMessage = error.errors[field].message
                    validationErrors[field] = errorMessage
                }
            }
        }
        return validationErrors
    }
}

export default errorUtilities