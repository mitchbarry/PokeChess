import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/User.model.js'

import errorUtilities from '../utilities/error.utilities.js'

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const authController = {
    async validateUser(req, res, next) {
        try {
            const { username, email, password } = req.body
            const existingUsername = await User.findOne({ username })
            const existingEmail = await User.findOne({ email })
            const isPasswordValid = password.length >= 8 &&
                password.length <= 255 &&
                (/^(?=.*[a-zA-Z])(?=.*\d).+$|^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$|^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).+$/.test(password))
            const newUser = new User({ // create user object for User validation testing
                username,
                email,
                password
            })
            let normalizedError = {}
            try {
                await newUser.validate()
            }
            catch (error) {
                normalizedError = errorUtilities.normalizeError(error)
            }
            if (existingEmail || existingUsername || !isPasswordValid) {
                normalizedError === {} && (
                    normalizedError = {
                        statusCode: 400,
                        message: 'User validation failed: ',
                        name: 'ValidationError',
                        validationErrors: {}
                    }
                )
                if (existingUsername && !normalizedError.username) {
                    const usernameError = 'Username already in use.'
                    normalizedError.message = `${normalizedError.message} username: ${usernameError}`
                    normalizedError.validationErrors.username = usernameError
                }
                if (existingEmail && !normalizedError.email) {
                    const emailError = 'Email already in use.'
                    normalizedError.message = `${normalizedError.message}${normalizedError.message !== 'User validation failed: ' ? ', ' : ''}email: ${emailError}`
                    normalizedError.validationErrors.email = emailError
                }
                if (!isPasswordValid && !normalizedError.password) {
                    let passwordError
                    if (password.length === 0) {
                        passwordError = `Your password is required.`
                    }
                    else if (password.length < 8) {
                        passwordError = `Your password must be at least 8 characters.`
                    }
                    else if (password.length > 255) {
                        passwordError = `Your password can't be more than 255 characters.`
                    }
                    else if (!/^(?=.*[a-zA-Z])(?=.*\d).+$|^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$|^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).+$/.test(password)) {
                        passwordError = `Your password must include at least two of the following; letter, number, or symbol.`
                    }
                    normalizedError.message = `${normalizedError.message}${normalizedError.message !== 'User validation failed: ' ? ', ' : ''}password: ${passwordError}`
                    normalizedError.validationErrors.password = passwordError
                }
                return res.status(400).json(normalizedError)
            }
        }
        catch (error) {
            next(error)
        }
    },

    async registerUser(req, res, next) {
        try {
            const { username, email, password, starter } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                starter
            })
            await newUser.save()
            const token = generateAuthToken(newUser)
            res.json({ user: newUser, token })
        }
        catch (error) {
            next(error)
        }
    },

    async loginUser(req, res, next) {
        try {
            const { accountName, password } = req.body
            const isEmail = accountName.includes('@')
            let user
            if (isEmail) {
                user = await User.findOne({ email: accountName })
            }
            else {
                user = await User.findOne({ username: accountName })
            }
            if (!user) {
                const normalizedError = {
                    statusCode: 401,
                    message: 'InvalidAccountName',
                    name: 'AuthenticationError',
                    validationErrors: {}
                }
                return res.status(401).json(normalizedError)
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                const normalizedError = {
                    statusCode: 401,
                    message: 'InvalidPassword',
                    name: 'AuthenticationError',
                    validationErrors: {}
                }
                return res.status(401).json(normalizedError)
            }
            const token = generateAuthToken(user)
            res.json({ user, token })
        }
        catch (error) {
            next(error)
        }
    },

    async logoutUser(req, res, next) {
        try {
            /* this may be used to write a token blacklist
            const token = req.headers.authorization.split(' ')[1] // Extract and verify the token from the request headers
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            */
            res.json({ message: 'Logout Successful!' })
        }
        catch (error) {
            next(error)
        }
    },

    async getUserInfo(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1] // Extract the token from the request headers
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decodedToken._id) // Retrieve user information associated with the token
            if (!user) { // Check if user exists
                const normalizedError = {
                    statusCode: 404,
                    message: 'User not found',
                    name: 'NotFoundError',
                    validationErrors: {}
                }
                return res.status(404).json(normalizedError)
            }
            res.json({user}) // Send the user information as a response
        }
        catch (error) {
            next(error)
        }
    }
}

export default authController