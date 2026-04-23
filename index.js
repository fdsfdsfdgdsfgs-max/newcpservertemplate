const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);

// CHANGE THIS: Match what you put in crumbs.json
const CUSTOM_PATH = "/1000"; 

const io = new Server(server, {
    path: CUSTOM_PATH,
    cors: { origin: "*", methods: ["GET", "POST"] },
    allowEIO3: true
});

// --- ENCRYPTION HELPER ---
// NewCP expects a 16-byte IV. This function wraps a message so the client doesn't crash.
function encryptPayload(message) {
    const iv = crypto.randomBytes(16); // The 16-byte IV the error was asking for
    const key = Buffer.alloc(32, 0);   // A dummy 32-byte key
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(message));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // Combine IV + Encrypted Data
    return Buffer.concat([iv, encrypted]).toString('base64');
}

app.get('/', (req, res) => {
    res.send('<h1>Single-File Server is Online</h1>');
});

io.on('connection', (socket) => {
    console.log('Penguin connected!');

    // Send a "Welcome" packet that is properly formatted
    // This should stop the "IV Length" crash and move the loading bar
    const welcomePacket = encryptPayload({ action: 'welcome', text: 'Hello from Render!' });
    socket.emit('message', welcomePacket);

    socket.on('message', (data) => {
        console.log('Received from client:', data);
    });

    socket.on('disconnect', () => {
        console.log('Penguin left.');
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} with path ${CUSTOM_PATH}`);
});
