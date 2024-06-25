import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import helmet from 'helmet';

import dbConnect from './src/config/mongoose.config.js';
import userRouter from './src/routes/user.routes.js';
import authRouter from './src/routes/auth.routes.js';
import lobbyRouter from './src/routes/lobby.routes.js';
import pokemonRouter from './src/routes/pokemon.routes.js';

import errorUtilities from './src/utilities/error.utilities.js';
import sockets from './src/sockets/socket.js';

dotenv.config();
dbConnect();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
    process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'http://localhost:8000' // Add any other origins that need to be allowed
];
app.use(cors({ credentials: true, origin: allowedOrigins }));

// CSP configuration with Helmet
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             "default-src": ["'self'"],
//             "script-src": ["'self'"], // Add other sources as needed
//             "style-src": ["'self'", "'unsafe-inline'"], // Allow inline styles
//             "connect-src": ["'self'", "http://localhost:8000"], // Allow connections to localhost:8000
//             "img-src": ["'self'", "data:"], // Allow image sources
//             "font-src": ["'self'", "https:", "data:"], // Allow font sources
//             "object-src": ["'none'"], // Disallow object embedding
//             "base-uri": ["'self'"],
//             "form-action": ["'self'"]
//             // Add other directives as needed
//         },
//     },
// }));

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/lobbies', lobbyRouter);
app.use('/api/pokemon', pokemonRouter);

// Catch-all for 404 errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    error.name = 'NotFoundError';
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error.name === 'ValidationError') {
        error.statusCode = 401;
    }
    const normalizedError = errorUtilities.normalizeError(error);
    res.status(normalizedError.statusCode).json(normalizedError);
});

// Start the server
const server = app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

// Initialize socket.io
const io = new Server(server, { cors: { origin: allowedOrigins } });
sockets.listen(io);

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});