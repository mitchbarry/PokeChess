import gameStateUtilities from '../utilities/game-state.utilities.js';

const socket = {
    listen(io) {
        io.on('connection', socket => { // Establish Socket info
            console.log('V New Socket V');
            console.log(socket.id);
            let socketInfo = { // create an object that holds relevant info
                socketId: socket.id,
                lobbyId: '',
                userId: '',
                connected: false
            };

            socket.on('joinLobby', async ({ lobby, user }) => { // lobby and user are stored in state on client side so whole objects are passed
                const updatedLobby = await gameStateUtilities.addUserToLobby(lobby, user);
                io.emit('gameStateUpdate', updatedLobby.gameState); // Emit updated gameState to all players in the lobby
                socketInfo.userId = user._id; // update socketInfo with user's, lobby's information
                socketInfo.lobbyId = lobby._id;
                socketInfo.connected = true;
            });

            socket.on('startGame', async (gameState) => {
                gameState.stage = 3;
                for (let i = 0; i < gameState.players.length; i++) {
                    gameState.players[i].gold += 2;
                    gameState.players[i].experience += 2;
                    const refreshShopReturn = await gameStateUtilities.refreshShop(gameState, gameState.players[i].experience);
                    gameState.players[i].shop = refreshShopReturn.shop;
                    gameState.pool = refreshShopReturn.pool;
                }
                io.emit('gameStateUpdate', gameState); // Emit updated gameState to all players in the lobby
            });

            socket.on('leftLobby', async () => {
                if (socketInfo.connected) {
                    const updatedLobby = await gameStateUtilities.removeUserFromLobby(socketInfo); // here we pass through socket info as the lobby and user stored in state are not accessible when someone leaves
                    console.log('Player Left...');
                    io.emit('gameStateUpdate', updatedLobby.gameState); // Emit updated gameState to all players in the lobby
                    socketInfo.connected = false;
                }
            });

            socket.on('disconnect', async (reason) => {
                if (socketInfo.connected) {
                    const updatedLobby = await gameStateUtilities.removeUserFromLobby(socketInfo);
                    console.log('Socket disconnected: ' + reason);
                    io.emit('gameStateUpdate', updatedLobby.gameState); // Emit updated gameState to all players in the lobby
                    socketInfo.connected = false;
                }
            });
        });
    }
};

export default socket;