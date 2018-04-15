const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const app = express();

var publicPath = path.join(__dirname, 'public/');
var port = process.env.PORT || 80;

// Setting up for socketIO
var server = http.createServer(app);
var io = socketIO(server);

// Setting public directory
app.use(express.static(publicPath));

// Setting IO
io.on('connection', (socket) => {
    socket.emit('welcome', {
        from: 'Admin',
        text: 'Welcome To the Chat Room'
    });

    socket.broadcast.emit('newUserJoins', {
        from: 'Admin',
        text: 'New User Joins Chat Room'
    });

    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('newMessage', {message});
    });
});
// Server listening on port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});