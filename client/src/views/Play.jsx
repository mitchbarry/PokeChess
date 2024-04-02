import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

import lobbyService from "../services/LobbyService";

import styles from '../styles/Play.module.css'

import bulbasaurFront from "../assets/pokemon/bulbasaurFront.png";

const Play = (props) => {

    const canvasRef = useRef(null);

    // const {user} = props;
    const {id} = useParams();

    const [user, setUser] = useState({ // delete this once real connection is established
        username: "Billy",
        _id: "564830969024730892642890dsa4583209"
    });
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [ctx, setCtx] = useState(null);
    const [lobby, setLobby] = useState({
        name: "Lobby Name test",
        desc: "Lobby Desc test",
        password: "",
        gameState: {
            stage: 0,
            players: [{
                    userId: "564830969024730892642890dsa4583209",
                    username: "Billy",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2nk5h7jkj4l23k431j",
                    username: "Milly",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2nk5h7jkj4l2sdadsad3k431j",
                    username: "Larry",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2sdahdntgtjkj5gfh7jkj4l23k431j",
                    username: "Tommy",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2nk5h7jkj4l2sdadsad3k431j",
                    username: "Benny",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2nk5h7jkj4l2sdadsad3k431j",
                    username: "Jerry",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2nk5h7jkj4l2sdadsad3k431j",
                    username: "Tyler",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }, {
                    userId: "54j2nk5h7jkj4l2sdadsad3k431j",
                    username: "Bobby",
                    gold: 0,
                    health: 100,
                    board: [{name: "Bulbasaur"}],
                    bench: [],
                    experience: 0,
                    shop: []
                }
            ],
            pool: {
                1: {
                    0 : 522, // total number of common units in the pool
                    1: 29, // Bulbasaur (#001) - Grass/Poison
                    4: 29, // Charmander (#004) - Fire
                    7: 29, // Squirtle (#007) - Water
                    10: 29, // Caterpie (#010) - Bug
                    13: 29, // Weedle (#013) - Bug/Poison
                    16: 29, // Pidgey (#016) - Normal/Flying
                    19: 29, // Rattata (#019) - Normal
                    21: 29, // Spearow (#021) - Normal/Flying
                    23: 29, // Ekans (#023) - Poison
                    25: 29, // Pikachu (#025) - Electric
                    27: 29, // Sandshrew (#027) - Ground
                    29: 29, // Nidoran♀ (#029) - Poison
                    32: 29, // Nidoran♂ (#032) - Poison
                    35: 29, // Clefairy (#035) - Fairy
                    37: 29, // Vulpix (#037) - Fire
                    39: 29, // Jigglypuff (#039) - Normal/Fairy
                    41: 29, // Zubat (#041) - Poison/Flying
                    43: 29 // Oddish (#043) - Grass/Poison
                },
                2: {
                    0: 459, // total number of uncommon units in the pool
                    46: 27, // Paras (#046) - Bug/Grass
                    48: 27, // Venonat (#048) - Bug/Poison
                    50: 27, // Diglett (#050) - Ground
                    52: 27, // Meowth (#052) - Normal
                    54: 27, // Psyduck (#054) - Water
                    56: 27, // Mankey (#056) - Fighting
                    58: 27, // Growlithe (#058) - Fire
                    60: 27, // Poliwag (#060) - Water
                    63: 27, // Abra (#063) - Psychic
                    66: 27, // Machop (#066) - Fighting
                    69: 27, // Bellsprout (#069) - Grass/Poison
                    72: 27, // Tentacool (#072) - Water/Poison
                    74: 27, // Geodude (#074) - Rock/Ground
                    77: 27, // Ponyta (#077) - Fire
                    79: 27, // Slowpoke (#079) - Water/Psychic
                    81: 27, // Magnemite (#081) - Electric
                    83: 27 // Farfetch'd (#083) - Normal/Flying
                },
                3: {
                    0: 368, // total number of rare units in the pool
                    84: 23, // Doduo (#084) - Normal/Flying
                    86: 23, // Seel (#086) - Water
                    88: 23, // Grimer (#088) - Poison
                    90: 23, // Shellder (#090) - Water
                    92: 23, // Gastly (#092) - Ghost/Poison
                    95: 23, // Onix (#095) - Rock/Ground
                    96: 23, // Drowzee (#096) - Psychic
                    98: 23, // Krabby (#098) - Water
                    100: 23, // Voltorb (#100) - Electric
                    102: 23, // Exeggcute (#102) - Grass/Psychic
                    104: 23, // Cubone (#104) - Ground
                    106: 23, // Hitmonlee (#106) - Fighting
                    107: 23, // Hitmonchan (#107) - Fighting
                    108: 23, // Lickitung (#108) - Normal
                    109: 23, // Koffing (#109) - Poison
                    111: 23 // Rhyhorn (#111) - Ground/Rock
                },
                4: {
                    0: 195, // total number of epic units in the pool
                    114: 13, // Tangela (#114) - Grass
                    115: 13, // Kangaskhan (#115) - Normal
                    116: 13, // Horsea (#116) - Water
                    118: 13, // Goldeen (#118) - Water
                    120: 13, // Staryu (#120) - Water
                    122: 13, // Mr. Mime (#122) - Psychic/Fairy
                    123: 13, // Scyther (#123) - Bug/Flying
                    124: 13, // Jynx (#124) - Ice/Psychic
                    125: 13, // Electabuzz (#125) - Electric
                    126: 13, // Magmar (#126) - Fire
                    127: 13, // Pinsir (#127) - Bug
                    128: 13, // Tauros (#128) - Normal
                    129: 13, // Magikarp (#129) - Water
                    131: 13, // Lapras (#131) - Water/Ice
                    132: 13 // Ditto (#132) - Normal
                },
                5: {
                    0: 144, // total number of legendary units in the pool
                    133: 12, // Eevee (#133) - Normal
                    137: 12, // Porygon (#137) - Normal
                    138: 12, // Omanyte (#138) - Rock/Water
                    140: 12, // Kabuto (#140) - Rock/Water
                    142: 12, // Aerodactyl (#142) - Rock/Flying
                    143: 12, // Snorlax (#143) - Normal
                    144: 12, // Articuno (#144) - Ice/Flying
                    145: 12, // Zapdos (#145) - Electric/Flying
                    146: 12, // Moltres (#146) - Fire/Flying
                    147: 12, // Dratini (#147) - Dragon
                    150: 12, // Mewtwo (#150) - Psychic
                    151: 12 // Mew (#151) - Psychic
                }
            }
        }
    });
    const [socket] = useState(() => io(':8000'));
    const [images, setImages] = useState({});

    useEffect(() => {
        const loadImages = async () => { // Load all images when the component mounts
            const loadImage = async (path) => {
                return new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.onerror = reject;
                    image.src = path;
                });
            };
            try {
                const imagePaths = {
                    1: bulbasaurFront, 
                    4: charmanderFront
                    // Add more image paths here with Pokedex numbers as keys
                };
                const loadedImages = await Promise.all(
                    Object.entries(imagePaths).map(async ([pokedexNumber, path]) => ({
                        [pokedexNumber]: await loadImage(path)
                    }))
                );
                const imagesObject = loadedImages.reduce((accumulator, img) => ({ ...accumulator, ...img }), {}); // Combine all loaded images into a single object
                setImages(imagesObject);
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };
        loadImages();
    }, []); // Empty dependency array to run once on component mount

    useEffect(() => { // we need to set up all of our event listeners
        socket.on('gameStateUpdate', (updatedGameState) => {
            console.log("Lobby updatedGameState received")
            setLobby((prevLobby) => ({...prevLobby, gameState: updatedGameState}));
        });
        return () => { // this ensures that the underlying socket will be closed if App is unmounted
            socket.emit('leftLobby', { lobby, user }); // Emit leftLobby event
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (user && Object.keys(user).length !== 0) {
            console.log("User data fetched...")
            console.log("Preparing to fetch lobby data...")
            let lobbyResponse;
            const fetchData = async () => { // fetch the lobby object (user object is passed down)
                try {
                    lobbyResponse = await lobbyService.getOneLobby(id); // Fetch the lobby object using getOneLobby
                    setLobby(lobbyResponse); // Update the state with the fetched lobby object
                }
                catch (error) {
                    console.error(error);
                }
                finally {
                    console.log("lobby data fetched...")
                    setLobby(lobbyResponse); // Update the state with the fetched lobby object
                    socket.emit('joinLobby', { lobbyResponse, user });
                }
            };
            // fetchData();
        }
    },[user]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setCtx(context);
        const calculateCanvasSize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            setCanvasWidth(screenWidth * 0.8);
            setCanvasHeight(screenHeight * 0.8);
        };
        calculateCanvasSize();
        canvas.addEventListener('click', handleCanvasClick);
        window.addEventListener('resize', calculateCanvasSize);
        return () => {
            canvas.removeEventListener('click', handleCanvasClick);
            window.removeEventListener('resize', calculateCanvasSize);
        };
    }, [canvasRef, ctx, lobby]);

    const handleCanvasClick = (event) => { // function to handle the canvas click event, it will check if the click is within the bounds of some object and if it is, it will do something
        if (ctx) {
            console.log("click!")
            const rect = canvasRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            if (lobby.gameState.stage === 0 /* && lobby.creator._id === user._id */) { // Check if the click is within the play button
                const playButton = drawPlayButton(true); // Get button dimensions
                if (
                    x >= playButton.x &&
                    x <= playButton.x + playButton.width &&
                    y >= playButton.y &&
                    y <= playButton.y + playButton.height
                ) {
                    socket.emit('startGame', lobby.gameState);
                }
            }
            else if (lobby.gameState.stage === 3) {
                const shopDimensions = drawShop(true); // Get button dimensions
                const experienceButton = drawExperienceButton(true);
                const refreshButton = drawRefreshButton(true);
                if (
                    y >= shopDimensions.y &&
                    y <= shopDimensions.y + shopDimensions.height
                ) {
                    if (
                        x >= experienceButton.x &&
                        x <= experienceButton.x + experienceButton.width
                    ) {
                        if (
                            y >= experienceButton.y &&
                            y <= experienceButton.y + experienceButton.height
                        ) {
                            buyExperience;
                        }
                        else if (
                            y >= refreshButton.y &&
                            y <= refreshButton.y + refreshButton.height
                        ) {
                            refreshShop;
                        }
                    }
                    else if (
                        x >= shopDimensions.x &&
                        x <= shopDimensions.x + shopDimensions.width
                    ) {
                        buyUnit(1);
                    }
                    else if (
                        x >= shopDimensions.x + shopDimensions.blockWidth &&
                        x <= shopDimensions.x + shopDimensions.width + shopDimensions.blockWidth
                    ) {
                        buyUnit(2);
                    }
                    else if (
                        x >= shopDimensions.x + (shopDimensions.blockWidth * 2) &&
                        x <= shopDimensions.x + shopDimensions.width + (shopDimensions.blockWidth * 2)
                    ) {
                        buyUnit(3);
                    }
                    else if (
                        x >= shopDimensions.x + (shopDimensions.blockWidth * 3) &&
                        x <= shopDimensions.x + shopDimensions.width + (shopDimensions.blockWidth * 3)
                    ) {
                        buyUnit(4);
                    }
                    else if (
                        x >= shopDimensions.x + (shopDimensions.blockWidth * 4) &&
                        x <= shopDimensions.x + shopDimensions.width + (shopDimensions.blockWidth * 4)
                    ) {
                        buyUnit(5);
                    }
                }
            }
        }
    };

    const drawElements = () => {
        if (ctx /* && lobby */) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas
            ctx.textAlign = 'center'; // Set Base Settings
            ctx.textBaseline = 'middle';
            if (lobby.gameState.stage === 0) {
                drawPlayButton();
                drawWaitingForPlayers();
            }
            if (lobby.gameState.stage <= 3) {
                drawPlayers();
            }
            if (lobby.gameState.stage === 3) {
                drawControlBackground();
                drawShop();
                drawGold();
                drawRefreshButton();
                drawExperienceButton();
                drawBench();
                drawBoard();
            }
        }
    };

    const drawWaitingForPlayers = () => {
        let text;
        if (lobby.gameState.players.length < 2) {
            text = "Waiting for players...";
        }
        else {
            text = `${lobby.gameState.players.length} / 8`;
        }
        const columnWidth = ctx.canvas.width / 3;
        const yPosition = ctx.canvas.height / 10;
        const fontSize = columnWidth * 0.1;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = 'whitesmoke';
        ctx.fillText(text, 2 * columnWidth + columnWidth / 2, 6 * yPosition);
    }

    const drawPlayers = () => {
        ctx.fillStyle = 'whitesmoke';
        const players = lobby.gameState.players;
        let columnWidth;
        let fontSize;
        if (lobby.gameState.stage === 0) {
            columnWidth = ctx.canvas.width / 3;
            fontSize = columnWidth * 0.1; // Set font properties
            ctx.font = `${fontSize}px Arial`;
            for (let i = 0; i < players.length; i++) { // Loop through players and draw their usernames
                const player = players[i];
                const column = i < 4 ? 0 : 1;
                const row = i % 4;
                const x = column * columnWidth + columnWidth / 2;
                const y = (row + 0.5) * (ctx.canvas.height / 4); // Evenly spaced vertically
                ctx.fillText(player.username, x, y);
            }
        }
        else if (lobby.gameState.stage === 3) {
            columnWidth = ctx.canvas.width / 7;
            const rowHeight = ctx.canvas.height / (players.length + 2); // Calculate the height of each row
            fontSize = columnWidth * 0.1; // Set font properties
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = 'right';
            for (let i = 0; i < players.length; i++) { // Loop through players and draw their usernames
                const player = players[i];
                const x = 6 * columnWidth + columnWidth * 0.8;
                const y = i * rowHeight + (rowHeight * 1.5);
                ctx.fillText(player.health + "  " + player.username, x, y);
            }
            ctx.textAlign = 'center';
        }
    }

    const drawPlayButton = (returnBoolean) => {
        const columnWidth = ctx.canvas.width / 3; // Calculate dimensions and positions
        const yPosition = ctx.canvas.height / 10;
        const buttonWidth = columnWidth * 2 / 3;
        const buttonHeight = yPosition;
        const centerX = 2 * columnWidth + columnWidth / 2;
        const centerY = 4 * yPosition + buttonHeight / 2;
        if (!returnBoolean) {
            ctx.fillStyle = lobby.gameState.players.length > 2 /* && lobby.creator._id === user._id */ ? 'green' : 'gray'; // Set fill style based on the number of players
            const fontSize = columnWidth * 0.1;
            ctx.font = `${fontSize}px Arial`; // Set font size and draw rectangle
            ctx.fillRect(centerX - buttonWidth / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight);
            ctx.fillStyle = 'whitesmoke'; // Set text color and draw text
            ctx.fillText("Play", centerX, centerY);
        }
        else {
            return { // Return button dimensions
                x: centerX - buttonWidth / 2,
                y: centerY - buttonHeight / 2,
                width: buttonWidth,
                height: buttonHeight
            };
        }
    };

    const drawControlBackground = () => {
        const blockWidth = ctx.canvas.width * (1 / 9);
        const height = ctx.canvas.height * (1 / 6);
        const x = blockWidth;
        const y = ctx.canvas.height - height; // Along the bottom edge of the screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Set fill style with transparency
        ctx.fillRect(x, y, blockWidth * 6, height); // Draw the semi-transparent rectangle
    };

    const drawShop = (returnBoolean) => {
        const blockWidth = ctx.canvas.width * (1 / 9);
        const blockHeight = ctx.canvas.height * (1 / 18);
        const y = ctx.canvas.height - (3 * blockHeight); // Along the bottom edge of the screen
        if (!returnBoolean) {
            const rarityColors = {
                1: "rgba(163, 163, 177, 1)",
                2: "rgba(0, 177, 0, 1)",
                3: "rgba(0, 153, 255, 1)",
                4: "rgba(153, 0, 204, 1)",
                5: "rgba(255, 204, 0, 1)"
            };
            const typeColors = {
                normal: "rgba(170, 169, 153, 1)",
                fire: "rgba(236, 66, 37, 1)",
                water: "rgba(78, 154, 255, 1)",
                grass: "rgba(119, 204, 85, 1)",
                electric: "rgba(245, 204, 52, 1)",
                ice: "rgba(102, 204, 255, 1)",
                fighting: "rgba(187, 85, 69, 1)",
                poison: "rgba(170, 85, 153, 1)",
                ground: "rgba(221, 187, 85, 1)",
                flying: "rgba(136, 153, 255, 1)",
                psychic: "rgba(238, 84, 153, 1)",
                bug: "rgba(170, 187, 34, 1)",
                rock: "rgba(187, 170, 102, 1)",
                ghost: "rgba(102, 103, 188, 1)",
                dragon: "rgba(120, 103, 238, 1)",
                steel: "rgba(170, 170, 187, 1)",
                fairy: "rgba(214, 133, 173, 1)"
            };
            const playerIndex = lobby.gameState.players.findIndex(player => player.userId === user._id);
            const shop = lobby.gameState.players[playerIndex].shop
            for (let i = 0; i < 5; i++) {
                if (shop[i] !== null) {
                    const rarity = shop[i].rarity;
                    const x = blockWidth * (i + 2); // Centered along the x-axis
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Set fill style with transparency
                    ctx.fillRect(x + 5, y + 5, blockWidth - 10, (blockHeight * 3) - 10);
        
                    if (shop[i].types.length < 2) {
                        ctx.fillStyle = typeColors[shop[i].types[0]];
                        ctx.fillRect(x + 10, y + 10, blockWidth - 20, (blockHeight * 3) - 20); // draw type background
                    }
                    else {
                        const gradient = ctx.createLinearGradient(x + 10, y + 10, x + blockWidth - 20, y + (blockHeight * 3) - 20);
                        gradient.addColorStop(0.3, typeColors[shop[i].types[1]]);
                        gradient.addColorStop(0.7, typeColors[shop[i].types[0]]);
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x + 10, y + 10, blockWidth - 20, (blockHeight * 3) - 20);
                    }
        
                    ctx.fillStyle = rarityColors[rarity]; // Set fill style with transparency
                    ctx.fillRect(x + 10, y + 5, blockWidth - 20, 5); // Top side of border
                    ctx.fillRect(x + 10, y + (blockHeight * 2) + 5, blockWidth - 20, 5); // Interior framing side of border 
                    ctx.fillRect(x + 10, y + (blockHeight * 3) - 10, blockWidth - 20, 5); // Bottom side of border
                    ctx.fillRect(x + 5, y + 5, 5, (blockHeight * 3) - 10); // Right side of border
                    ctx.fillRect(x + blockWidth - 10, y + 5, 5, (blockHeight * 3) - 10); // Left side of border

                    ctx.fillStyle = rarityColors[rarity]; // Set fill style with transparency
                    ctx.globalAlpha = 0.4;
                    ctx.fillRect(x + 10, y + (blockHeight * 2) + 10, blockWidth - 20, blockHeight - 20); // draw name box
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = 'whitesmoke'; // Set text color and draw text
                    ctx.textAlign = 'left';
                    ctx.fillText(shop[i].name, x + 15, y + (blockHeight * 2.5) + 2.5);
                    ctx.textAlign = 'right';
                    ctx.fillStyle = 'gold';
                    ctx.fillText(rarity, x + blockWidth - 15, y + (blockHeight * 2.5) + 2.5);
                }
            }
            ctx.textAlign = 'center'; // Set Base Settings
        }
        else {
            return { // Return button dimensions
                y: y + 5,
                x: blockWidth * 2 + 5,
                width: blockWidth - 10,
                height: (blockHeight * 3) - 10,
                blockWidth: blockWidth 
            };
        }
    }

    const drawGold = () => {
        const playerIndex = lobby.gameState.players.findIndex(player => player.userId === user._id);
        const blockWidth = ctx.canvas.width * (1 / 9);
        const blockHeight = ctx.canvas.height * (1 / 18);
        const y = ctx.canvas.height - (blockHeight * 4) + 10; // Along the bottom edge of the screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Set fill style with transparency
        ctx.fillRect(blockWidth * 4, y, blockWidth, blockHeight - 10); // Draw the semi-transparent rectangle
        const fontSize = blockWidth * 0.2; // Set font properties
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = 'gold';
        ctx.fillText(lobby.gameState.players[playerIndex].gold, blockWidth * 4.5, y + blockHeight / 2);
    }

    const drawRefreshButton = (returnBoolean) => {
        const blockWidth = ctx.canvas.width * (1 / 9);
        const blockHeight = ctx.canvas.height * (1 / 12);
        const y = ctx.canvas.height - (blockHeight * 2) + 5;
        const x = blockWidth + 5;
        if (!returnBoolean) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // Set fill style with transparency
            ctx.fillRect(x, y, blockWidth - 10, blockHeight - 10); // Draw the semi-transparent rectangle
            ctx.fillStyle = '#A97713';
            ctx.fillRect(x + 5, y + 5, blockWidth - 20, blockHeight - 20);
            const fontSize = blockWidth * 0.15; // Set font properties
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'whitesmoke'; // Set text color and draw text
            ctx.textAlign = 'left';
            ctx.fillText("Refresh", x + 10, y + (blockHeight / 2) - 2.5);
        }
        else {
            return { // Return button dimensions
                y,
                x,
                width: blockWidth - 10,
                height: blockHeight - 10,
            }
        }
    }

    const drawExperienceButton = (returnBoolean) => {
        const blockWidth = ctx.canvas.width * (1 / 9);
        const blockHeight = ctx.canvas.height * (1 / 12);
        const y = ctx.canvas.height - blockHeight + 5;
        const x = blockWidth + 5;
        if (!returnBoolean) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Set fill style with transparency
            ctx.fillRect(x, y, blockWidth - 10, blockHeight - 10); // Draw the semi-transparent rectangle
            ctx.fillStyle = '#185B72';
            ctx.fillRect(x + 5, y + 5, blockWidth - 20, blockHeight - 20);
            const fontSize = blockWidth * 0.15; // Set font properties
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'whitesmoke'; // Set text color and draw text
            ctx.textAlign = 'left';
            ctx.fillText("Buy XP", x + 10, y + (blockHeight / 2) - 2.5);
        }
        else {
            return { // Return button dimensions
                y,
                x,
                width: blockWidth - 10,
                height: blockHeight - 10,
            }
        }
    }

    const drawBench = () => {
        const playerIndex = lobby.gameState.players.findIndex(player => player.userId === user._id);
        const player = lobby.gameState.players[playerIndex];
        const blockWidth = ctx.canvas.width * (1 / 81);
        const blockHeight = ctx.canvas.height * (1 / 12);
        const x = blockWidth * 9;
        const y = ctx.canvas.height - (blockHeight * 5);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Set fill style with transparency
        ctx.fillRect(x, y, blockWidth * 63, blockHeight * 2); // Draw the semi-transparent rectangle
        for (let i = 0; i < 9; i++) {
            ctx.fillRect(x + 5 + ((blockWidth * 7) * i), y + 5, blockWidth * 7 - 10, blockHeight * 2 - 10); // Draw the semi-transparent rectangle
        }
        const image = new Image();
        image.onload = function() {
            console.log("Image loaded:", image);
            ctx.drawImage(image, 400, 400);
        };
        image.src = bulbasaurFront;
    }

    const drawBoard = () => {
        const playerIndex = lobby.gameState.players.findIndex(player => player.userId === user._id);
        const player = lobby.gameState.players[playerIndex];
        const blockWidth = ctx.canvas.width * (1 / 81);
        const blockHeight = ctx.canvas.height * (1 / 12);
        const x = blockWidth * 9;
        const y = ctx.canvas.height - (blockHeight * 8);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Set fill style with transparency
        ctx.fillRect(x, y, blockWidth * 63, blockHeight * 2); // Draw the semi-transparent rectangle
    }

    const buyExperience = () => {
        const playerIndex = lobby.gameState.players.findIndex(player => player.userId === user._id);
        const player = lobby.gameState.players[playerIndex];
        if (player.gold > 4) {
            player.gold -= 4;
            player.experience += 4;
        }
    }

    const refreshShop = () => {
        //socket.emit refresh shop....
        const playerIndex = lobby.gameState.players.findIndex(player => player.userId === user._id);
        const player = lobby.gameState.players[playerIndex];
        if(player.gold > 1){ const gameState = lobby.gameState
            const userId = user._id
            socket.emit("refreshShop", {gameState, userId
            })}
    }

    const buyUnit = (index) => {
        
    }

    useEffect(() => { // redraw the canvas elements whenever the gameState.stage changes
        drawElements();
    }, [ctx, lobby, canvasHeight, canvasWidth]);

    return (
        <div className={styles.flexBox}>
            <canvas ref={canvasRef}width={canvasWidth} height={canvasHeight} className={styles.canvas}>
            </canvas>
        </div>
    )
}

export default Play;