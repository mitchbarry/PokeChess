# PokeChess

Dive into the electrifying world of Pokémon without investing countless hours in a single storyline. Inspired by popular titles like Teamfight Tactics and Hearthstone's Battlegrounds, PokéChess delivers an immersive gaming experience right in your web browser. Whether you're a seasoned Pokémon trainer or new to the scene, prepare for strategic battles like never before.

## Links

Play: [Website](...) (Not Live)

Source: [GitHub](https://github.com/mitchbarry/PokeChess)

## Features

- **MERN Stack**: Developed using MongoDB, Express.js, React.js, and Node.js, ensuring a robust and scalable architecture.
- **CRUD Features**: Experience full CRUD (Create, Read, Update, Delete) functionality to effortlessly manage your account and create or join lobbies.
- **Real-time Communication**: Harnesses sockets for seamless real-time communication, facilitating smooth gameplay interactions and fostering communication between players.
- **In Development**: While the app is not yet live, its continuously evolving with new features and improvements in the pipeline.

## Contact Information

Author: Mitch Barry [LinkedIn](https://www.linkedin.com/in/mitch-barry/) | [GitHub](https://github.com/mitchbarry)  
Email: mitchbarry5564@gmail.com

## All rights to The Pokémon Company.

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please feel free to open an issue or submit a pull request.

To contribute to PokeChess, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Set up [MongoDB Atlas](https://www.mongodb.com/atlas/database) Cluster
5. Create a database named dev.
6. Obtain MongoDB URI, it will look like: `mongodb+srv://admin:<password>@<cluster>.mongodb.net/dev?retryWrites=true&w=majority`.
7. In the server directory of the project, create a new file named .env.
8. Open the .env file in a text editor of your choice.
9. Define the required environment variables in the following format:
```
    PORT=8000
    MONGODB_URI={your mongoDB URI}
    JWT_SECRET={random string}
```
10. Save the .env file.
11. Start the client server by running `npm run dev` in the project's client directory.
12. Start the server server (the backend) by running `npm run dev` in the project's server directory.
13. Access the application through your web browser at `http://localhost:5173`.

## Acknowledgments

Special thanks to Zachary Parker [LinkedIn](https://www.linkedin.com/in/zacharyparkerpyjavasql/) | [GitHub](https://github.com/ZachSParker) and Kyle Talley [LinkedIn](https://www.linkedin.com/in/kyledtalley/) | [GitHub](https://github.com/kyledtalley) for their invaluable contributions during the initial development phase of PokéChess.

## License

This project is licensed under the [MIT License](https://github.com/mitchbarry/PokeChess/blob/dev/LICENSE.md).

---

For any inquiries or support, feel free to contact me at the provided email address.