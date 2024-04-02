import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.model.js';

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const authController = {
    async registerUser(req, res, next) {
        try {
            const { username, email, password, favoritePokemon } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                const normalizedError = {
                    statusCode: 400,
                    message: "User already exists",
                    name: "ValidationError",
                    validationErrors: {}
                };
                return res.status(400).json(normalizedError);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                favoritePokemon
            });
        
            const token = generateAuthToken(newUser);
            
            res.json({ user: newUser, token });
        }
        catch (error) {
            next(error);
        }
    },

    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const normalizedError = {
                    statusCode: 401,
                    message: "Invalid email or password",
                    name: "AuthenticationError",
                    validationErrors: {}
                };
                return res.status(401).json(normalizedError);
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                const normalizedError = {
                    statusCode: 401,
                    message: "Invalid email or password",
                    name: "AuthenticationError",
                    validationErrors: {}
                };
                return res.status(401).json(normalizedError);
            }
            const token = generateAuthToken(user);
            res.json({ user, token });
        }
        catch (error) {
            next(error);
        }
    },

    async logoutUser(req, res, next) {
        try {
            /* this may be used to write a token blacklist
            const token = req.headers.authorization.split(' ')[1]; // Extract and verify the token from the request headers
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            */
            res.json({ message: "Logout successful" });
        }
        catch (error) {
            next(error);
        }
    },

    async getUserInfo(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request headers
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken._id); // Retrieve user information associated with the token
            if (!user) { // Check if user exists
                const normalizedError = {
                    statusCode: 404,
                    message: "User not found",
                    name: "NotFoundError",
                    validationErrors: {}
                };
                return res.status(404).json(normalizedError);
            }
            res.json({user}); // Send the user information as a response
        }
        catch (error) {
            next(error);
        }
    }
}

export default authController;
