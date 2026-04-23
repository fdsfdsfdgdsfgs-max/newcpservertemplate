const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// Use Render's port or 10000 as a backup
const port = process.env.PORT || 10000;

// This is the part that was missing!
server.listen(port, '0.0.0.0', () => {
    console.log(`Server is online at port ${port}`);
});

// Basic message so you know it's working
app.get('/', (req, res) => {
    res.send('Club Penguin Server is Running!');
});
