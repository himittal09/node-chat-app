const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user Connected');

    // socket.emit('newMessage', {
    //     from: 'a very goodman called himanshu',
    //     text: 'whatever shark is a great meme',
    //     createdAt: new Date().getTime()
    // });

    socket.on('createMessage', function (message) {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

module.exports = {app};
