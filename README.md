# Split21React (Project under development)

The project is still in development. It is a simple 21-point game using AI. The project is specially made on React with a minimum number of libraries for learning purposes. This is a game with artificial intelligence. Requests are sent to a custom [server](https://github.com/Kront2000/split21nodeServer) that proxies requests to the Groq API. The server is written in Express. All logic is located in React to improve skills in its use. 

## Стек
- react
- pinia
- vite
- react-router

## Launch

1. Install and start the server. Instructions on how to start the server can be found in the repository: [server](https://github.com/Kront2000/split21nodeServer).
2. Clone the repository
```
https://github.com/Kront2000/split21react
```
3. install dependencies
 ```
 npm install
 ```
4. Set environment variables
```
VITE_SERVER_URL=http://localhost:8080
```
VITE_SERVER_URL - The address where you launched the server

4. Run
```
npm run dev
```

# todo
- Add card drawing animations and a game over modal
- Implement user registration and a leaderboard using TanStack
- Add 1v1 multiplayer support using WebSockets

