const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// CHANGE THIS: Set your desired path here (must start with /)
const CUSTOM_PATH = "/1000"; 

const io = new Server(server, {
    path: CUSTOM_PATH, // This tells the server to only listen on this path
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true
});

app.get('/', (req, res) => {
    res.send(`<h1>Server is running</h1><p>Socket path is set to: ${CUSTOM_PATH}</p>`);
});

io.on('connection', (socket) => {
    console.log(`Penguin connected via ${CUSTOM_PATH}`);
    
    socket.emit('message', { status: 'connected' });

    socket.on('disconnect', () => {
        console.log('Penguin disconnected');
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server online. Internal Port: ${PORT} | Socket Path: ${CUSTOM_PATH}`);
});
