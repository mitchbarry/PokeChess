import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { Server } from 'socket.io'

import dbConnect from './config/mongoose.config.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import lobbyRouter from './routes/lobby.routes.js'
import pokemonRouter from './routes/pokemon.routes.js'

import errorUtilities from './utilities/error.utilities.js'
import sockets from './sockets/socket.js'

dbConnect()

const app = express()

app.use(express.json(),express.urlencoded({extended:true}))
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
dotenv.config()

const PORT = process.env.PORT

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/lobbies', lobbyRouter)
app.use('/api/pokemon', pokemonRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.statusCode = 404
    error.name = 'Not Found'
    next(error)
})

app.use((error, req, res, next) => {
    error.name === 'ValidationError' ? error.statusCode = 400 : ''
    const normalizedError = errorUtilities.normalizeError(error)
    res.status(normalizedError.statusCode).json(normalizedError)
})

const server = app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
)

const io = new Server(server, {cors: true}) // Initialize the socket instance with a new server

sockets.listen(io)