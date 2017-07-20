const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const validators = require('./utils/validators');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    socket.on('join', (params, callback) => {
        if (validators.isRealString(params.name) && validators.isRealString(params.room)) {
            console.log(`New user ${params.room} Connected`);
            socket.join(params.room);

            users.addUser(socket.id, params.name, params.room);

            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} Joined the chat`));

            return callback();
        }
        callback('Name and Room Name are required!');
    });

    socket.on('createMessage', function (message, callback) {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('');
    });

    socket.on('createLocationMessage', function (location) {
        io.emit('newLocationMessage', generateLocationMessage('Admin', location));
    });

    socket.on('disconnect', () => {
        console.log(`User Disconnected`);
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the Chat`));
        }
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

module.exports = {app};