import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import { Server } from 'socket.io';
import dbConnect from './src/config/mongoose.config.js';
import userRouter from './src/routes/user.routes.js';
import authRouter from './src/routes/auth.routes.js';
import lobbyRouter from './src/routes/lobby.routes.js';
import pokemonRouter from './src/routes/pokemon.routes.js';
import errorUtilities from './src/utilities/error.utilities.js';
import sockets from './src/sockets/socket.js';

dotenv.config(); // Load environment variables
dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:5173'];
app.use(cors({ credentials: true, origin: allowedOrigins }));

// Helmet Configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "connect-src": ["'self'", "http://localhost:8000"], // Allow connections to localhost:8000
            "script-src": ["'self'", "'unsafe-inline'"], // Allow inline scripts
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allow inline styles and fonts from Google
            "img-src": ["'self'", "data:"], // Allow images from self and data URIs
            "font-src": ["'self'", "https://fonts.gstatic.com"], // Allow fonts from Google
        },
    },
}));

// Use cookie-parser middleware
app.use(cookieParser());

const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not set

// Define Routes
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

// Error Handling Middleware
app.use((error, req, res, next) => {
    if (error.name === 'ValidationError') {
        error.statusCode = 400;
    }
    const normalizedError = errorUtilities.normalizeError(error);
    res.status(normalizedError.statusCode).json(normalizedError);
});

// Cookie Handling Middleware
app.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    }
    next();
});

// Start the Server
const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

// Initialize Socket.io
const io = new Server(server, { cors: { origin: allowedOrigins, credentials: true } });
sockets.listen(io);

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});