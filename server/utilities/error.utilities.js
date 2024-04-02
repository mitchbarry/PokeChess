const errorUtilities = {
    extractValidationErrors(error) {
        const validationErrors = {}
        if (error.name === "ValidationError") {
            for (const field in error.errors) {
                if (error.errors.hasOwnProperty(field)) {
                    const errorMessage = error.errors[field].message
                    validationErrors[field] = errorMessage
                }
            }
        }
        return validationErrors
    }
};

export default errorUtilities;