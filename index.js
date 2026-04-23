const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    path: "/1000", // Your custom path
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    allowEIO3: true
});

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>');
});

io.on('connection', (socket) => {
    console.log('Client connected. Waiting for encrypted packets...');

    // DO NOT use socket.emit() here yet. 
    // Sending plain text causes the "IV length" crash.

    socket.on('message', (data) => {
        // This is where you would receive the penguin's encrypted login data
        console.log('Received data from client:', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server online on port ${PORT}`);
});
