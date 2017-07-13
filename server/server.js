const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined the chat'));

    socket.on('createMessage', function (message, callback) {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('');
    });

    socket.on('createLocationMessage', function (location) {
        io.emit('newLocationMessage', generateLocationMessage('Admin', location));
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

module.exports = {app};